#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { Marked } from './vendor/marked.mjs';
import { buildStyles, buildSectionHeading } from '../assets/theme-engine.mjs';
import { highlightCode } from './highlight-code.mjs';
import { CONTAINERS, createComponentExtensions, createStarEmStrongTokenizer } from './article-components.mjs';
import { IMAGE_APPEARANCES, normalizeImageAppearance, buildImageFrame } from '../assets/image-appearance.mjs';
import { createOutputDirectory } from './create-output-dir.mjs';

const SKILL_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const escapeHtml = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const scriptJson = value => JSON.stringify(value).replace(/</g, '\\u003c');
const MIME = { '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.gif':'image/gif', '.webp':'image/webp' };

export function loadThemes() {
  const directory = path.join(SKILL_ROOT, 'assets', 'templates');
  const themes = fs.readdirSync(directory).filter(file => file.endsWith('.json')).map(file => JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8'))).sort((a,b) => a.order - b.order);
  const ids = new Set();
  for (const theme of themes) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(theme.id) || ids.has(theme.id)) throw new Error('模板 ID 不合法或重复：' + theme.id);
    if (!theme.name || !theme.colors || !theme.typography || !theme.layout) throw new Error('模板字段不完整：' + theme.id);
    ids.add(theme.id);
  }
  return themes;
}

function selectTheme(themes, choice) {
  const key = String(choice || 'emerald-prologue').trim().toLowerCase();
  const theme = themes.find(item => [item.id,item.name,...(item.aliases || [])].some(value => value.toLowerCase() === key));
  if (!theme) throw new Error('未知模板：' + choice + '。使用 --list-templates 查看可选名称。');
  return theme;
}

function safeLink(value) {
  const clean = String(value).replace(/&#x([0-9a-f]+);?/gi, (_,hex) => String.fromCodePoint(parseInt(hex,16))).replace(/&#(\d+);?/g, (_,decimal) => String.fromCodePoint(Number(decimal))).replace(/&colon;/gi, ':').replace(/[\u0000-\u0020\u007f-\u009f]/g, '');
  return /^(https?:|mailto:)/i.test(clean) || clean.startsWith('#') ? clean : null;
}

function getImageSource(href, baseDirectory, warnings) {
  if (/^https?:\/\//i.test(href)) {
    warnings.push('远程图片保留原地址，离线显示和公众号导入需另行确认：' + href);
    return { src: href, fileName: '配图', embedded: false, buffer: null };
  }
  if (/^data:image\/(png|jpe?g|gif|webp);base64,[a-z0-9+/=\s]+$/i.test(href)) {
    const mime = href.slice(5,href.indexOf(';'));
    return { src: href, fileName: '配图.' + (mime === 'image/jpeg' ? 'jpg' : mime.split('/')[1]), embedded: true, buffer: Buffer.from(href.slice(href.indexOf(',')+1),'base64') };
  }
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) && !/^file:/i.test(href) && !/^[a-z]:[\\/]/i.test(href)) throw new Error('图片地址格式不支持：' + href);
  const imagePath = /^file:/i.test(href) ? fileURLToPath(href) : path.resolve(baseDirectory, decodeURIComponent(href));
  const mime = MIME[path.extname(imagePath).toLowerCase()];
  if (!mime) throw new Error('图片请使用 PNG、JPG、GIF 或 WebP：' + imagePath);
  const buffer = fs.readFileSync(imagePath);
  return { src:'data:' + mime + ';base64,' + buffer.toString('base64'), fileName:path.basename(imagePath), embedded:true, buffer };
}

function imageDimensions(buffer) {
  if (!buffer) return null;
  if (buffer.length >= 24 && buffer.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return { width:buffer.readUInt32BE(16), height:buffer.readUInt32BE(20) };
  if (buffer.length >= 10 && buffer.subarray(0,3).toString() === 'GIF') return { width:buffer.readUInt16LE(6), height:buffer.readUInt16LE(8) };
  if (buffer.length > 4 && buffer[0] === 255 && buffer[1] === 216) {
    let position = 2;
    const frameMarkers = [192,193,194,195,197,198,199,201,202,203,205,206,207];
    while (position + 8 < buffer.length) {
      if (buffer[position] !== 255) { position++; continue; }
      const marker = buffer[position+1]; position += 2;
      if (marker === 255 || marker === 216 || marker === 217) continue;
      const length = buffer.readUInt16BE(position);
      if (frameMarkers.includes(marker)) return { height:buffer.readUInt16BE(position+3), width:buffer.readUInt16BE(position+5) };
      if (length < 2) break;
      position += length;
    }
  }
  return null;
}

export function renderArticle({ input, output, outputRoot, date, template='emerald-prologue', title: suppliedTitle, cover, imageStyle='plain', overwrite=false, images: imageModeOption='embed' }) {
  const imageMode = imageModeOption === 'external' ? 'external' : imageModeOption === 'embed' ? 'embed' : null;
  if (!imageMode) throw new Error('images 选项只支持 embed（默认，图片内嵌）或 external（图片按文件引用）。');
  const inputPath = path.resolve(input);
  let outputPath = output ? path.resolve(output) : null;
  if (inputPath === outputPath) throw new Error('输入和输出路径不能相同。');
  if (outputPath && fs.existsSync(outputPath) && !overwrite) throw new Error('输出文件已存在；选择新文件名，或在明确需要替换时加 --overwrite。');
  const source = fs.readFileSync(inputPath, 'utf8').replace(/^\uFEFF/, '');
  const themes = loadThemes(), theme = selectTheme(themes, template), styles = buildStyles(theme);
  const defaultImageStyle = normalizeImageAppearance(imageStyle);
  const warnings = [], images = [];
  // 外置模式下同一张配图只保留一份文件与一份注册表记录；复制正文时运行时把
  // 注册表中的 data URI 写回 src，公众号粘贴仍然自包含。
  const mediaRegistry = new Map();
  function externalImageSource(href, baseDirectory) {
    if (/^https?:\/\//i.test(href) || /^data:image\//i.test(href)) return getImageSource(href, baseDirectory, warnings);
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) && !/^file:/i.test(href) && !/^[a-z]:[\\/]/i.test(href)) throw new Error('图片地址格式不支持：' + href);
    const imagePath = /^file:/i.test(href) ? fileURLToPath(href) : path.resolve(baseDirectory, decodeURIComponent(href));
    const mime = MIME[path.extname(imagePath).toLowerCase()];
    if (!mime) throw new Error('图片请使用 PNG、JPG、GIF 或 WebP：' + imagePath);
    const buffer = fs.readFileSync(imagePath);
    let entry = mediaRegistry.get(imagePath);
    if (!entry) {
      const ext = path.extname(imagePath), stem = path.basename(imagePath, ext);
      let name = path.basename(imagePath), suffix = 1;
      while (Array.from(mediaRegistry.values()).some(item => item.name === name)) name = stem + '-' + (++suffix) + ext;
      entry = { name, mime, buffer };
      mediaRegistry.set(imagePath, entry);
    }
    return { src: entry.name, fileName: entry.name, embedded: false, external: true, buffer: entry.buffer };
  }
  let sectionCount = 0, codeBlocks = 0;
  const contexts = [], components = {};
  function withContext(context,render) {
    contexts.push(context);
    try { return render(); } finally { contexts.pop(); }
  }
  function tag(name, role, inner, attributes={}) {
    if (theme.layout.heading === 'skygrid' && (/^h[1-6]$/.test(name) || ['componentLabel','faqQuestion'].includes(role))) {
      inner = inner.replace(/(<[^>]*\bdata-studio="[^"]*"[^>]*\bstyle=")([^"]*)"/g,'$1$2color:inherit;"');
    }
    const pairs = Object.entries(attributes).filter(([key]) => key !== 'style').map(([key,value]) => ' ' + key + '="' + escapeHtml(value) + '"').join('');
    return '<' + name + ' data-studio="' + role + '" style="' + escapeHtml((styles[role] || '') + (attributes.style || '')) + '"' + pairs + '>' + inner + '</' + name + '>';
  }
  function imageMarkup(token,appearance='inline') {
    const image = imageMode === 'external'
      ? externalImageSource(token.href, path.dirname(inputPath))
      : getImageSource(token.href, path.dirname(inputPath), warnings);
    image.id = 'article-image-' + (images.length+1); image.appearance = appearance; images.push(image);
    return '<img id="' + image.id + '" data-studio="image" style="' + escapeHtml(styles.image) + '" src="' + escapeHtml(image.src) + '" alt="' + escapeHtml(token.text) + '" width="676">';
  }
  function renderBlockImage(token,appearance='default',windowTitle='') {
    const resolved = appearance === 'default' ? defaultImageStyle : appearance;
    const title = windowTitle || token.text || '配图';
    const frame = buildImageFrame(resolved,title,imageMarkup(token,resolved),styles);
    const caption = token.title ? tag('p','caption',escapeHtml(token.title)) : '';
    return tag('section','imageBlock',frame+caption,{'data-image-appearance':appearance,'data-image-title':title}) + '\n';
  }
  function renderContainer(token,parser) {
    const definition = CONTAINERS[token.kind];
    components[token.kind] = (components[token.kind] || 0) + 1;
    if (token.kind === 'image') {
      const blocks = token.tokens.filter(item=>item.type!=='space');
      const inline = blocks.length===1 && blocks[0].type==='paragraph' ? blocks[0].tokens.filter(item=>!(item.type==='text'&&!item.text.trim())) : [];
      if (inline.length!==1 || inline[0].type!=='image') throw new Error(':::image 内应只放一张独立的 Markdown 图片，图注写在图片 title 中。');
      const [choice,...name] = token.title.trim().split(/\s+/);
      const appearance = choice ? normalizeImageAppearance(choice) : 'default';
      return renderBlockImage(inline[0],appearance,name.join(' '));
    }
    const content = withContext(token.kind,() => parser.parse(token.tokens));
    const explicitTitle = token.title ? parser.parseInline(token.titleTokens) : '';
    if (token.kind === 'quote' || token.kind === 'pullquote') {
      return tag('section',definition.role,
        (token.kind === 'pullquote' ? tag('span','quoteMark','“',{'aria-hidden':'true'}) : '') + content +
        (token.kind === 'pullquote' ? tag('span','quoteMarkEnd','”',{'aria-hidden':'true'}) : '') +
        (explicitTitle ? tag('p','quoteCredit','— ' + explicitTitle) : '')) + '\n';
    }
    const title = explicitTitle || definition.label;
    return tag('section',definition.role,
      (title ? tag('p',definition.labelRole || 'componentLabel',title) : '') + content) + '\n';
  }
  const markdown = new Marked({ gfm:true, breaks:false, renderer:{
    heading(token) {
      const text = this.parser.parseInline(token.tokens);
      if (token.depth <= 2) {
        const number = ++sectionCount;
        return buildSectionHeading(theme,number,text,styles) + '\n';
      }
      return tag('section','subhead',tag('h' + token.depth,'h3',text)) + '\n';
    },
    paragraph(token) {
      const meaningful = token.tokens.filter(item => !(item.type === 'text' && !item.text.trim()));
      if (meaningful.length === 1 && meaningful[0].type === 'image') {
        return renderBlockImage(meaningful[0]);
      }
      const rendered = this.parser.parseInline(token.tokens);
      const context = contexts.at(-1);
      const role = context === 'lead' ? 'leadParagraph' : context === 'source' ? 'sourceParagraph'
        : ['pullquote','takeaway'].includes(context) ? 'takeawayParagraph' : ['step','timelineItem'].includes(context) ? 'stepParagraph'
        : context === 'faqAnswer' ? 'faqAnswer'
        : context ? 'compactParagraph' : 'paragraph';
      return tag('p',role,rendered) + '\n';
    },
    strong(token) { return tag('strong','strong',this.parser.parseInline(token.tokens)); },
    em(token) { return tag('em','em',this.parser.parseInline(token.tokens)); },
    del(token) { return tag('del','del',this.parser.parseInline(token.tokens)); },
    codespan(token) { return tag('span','inlineCode',escapeHtml(token.text)); },
    blockquote(token) {
      const alert = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:[ \t]*\r?\n|[ \t]+|$)/i.exec(token.text);
      if (alert) {
        const kinds = {NOTE:'note',TIP:'tip',IMPORTANT:'summary',WARNING:'warning',CAUTION:'warning'};
        return renderContainer({kind:kinds[alert[1].toUpperCase()],tokens:markdown.lexer(token.text.slice(alert[0].length),markdown.defaults),title:'',titleTokens:[]},this.parser);
      }
      components.quote = (components.quote || 0) + 1;
      return tag('section','quote',withContext('quote',() => this.parser.parse(token.tokens))) + '\n';
    },
    code(token) {
      codeBlocks++;
      const highlighted = highlightCode(token.text,token.lang,styles,warnings);
      const dots = tag('section','codeDots',tag('span','codeDotRed','●') + tag('span','codeDotYellow','●') + tag('span','codeDotGreen','●'),{'aria-hidden':'true'});
      const header = tag('section','codeHeader',dots + tag('span','codeLabel',escapeHtml(highlighted.label)));
      return tag('section','codeBlock',header + tag('pre','codePre',tag('code','codeText',highlighted.html)),{'data-code-language':highlighted.language}) + '\n';
    },
    link(token) {
      const text = this.parser.parseInline(token.tokens), href = safeLink(token.href);
      return href ? tag('a','link',text,{href,title:token.title || ''}) : text;
    },
    image(token) { return imageMarkup(token); },
    list(token) {
      const context = contexts.at(-1);
      if (context === 'facts') {
        return tag('section','factsList',token.items.map(item=>{
          const blocks = item.tokens.filter(block=>block.type!=='space');
          const inline = blocks.length===1 ? blocks[0].tokens : [];
          if (!inline?.length || inline[0].type!=='strong') throw new Error('关键数据请写成 - **数值或结论**：说明。每项只写一段。');
          const label = inline.slice(1).map(part=>({...part}));
          if (label[0]?.type==='text') label[0].text = label[0].text.replace(/^[ \t]*[：:][ \t]*/, '');
          return tag('section','factRow',tag('section','factValue',this.parser.parseInline(inline[0].tokens))+
            tag('section','factLabel',this.parser.parseInline(label)));
        }).join('')) + '\n';
      }
      if (context === 'faq') {
        return token.items.map(item=>{
          const blocks = item.tokens.filter(block=>block.type!=='space');
          if (!blocks.length || !['text','paragraph'].includes(blocks[0].type)) throw new Error('问答列表每项先写一行问题，再缩进写回答。');
          const question = this.parser.parseInline(blocks[0].tokens);
          const answer = withContext('faqAnswer',()=>this.parser.parse(blocks.slice(1),true));
          return tag('section','faqRow',tag('p','faqQuestion',question)+answer);
        }).join('\n') + '\n';
      }
      if (context === 'timeline') {
        return tag('section','timelineList',token.items.map(item=>tag('section','timelineRow',
          tag('section','timelineIndex',tag('span','timelineDot','●',{'aria-hidden':'true'}))+
          tag('section','timelineBody',withContext('timelineItem',()=>this.parser.parse(item.tokens,true))))).join(''))+'\n';
      }
      if (contexts.at(-1) === 'steps' && token.ordered) {
        return token.items.map((item,index) => tag('section','stepRow',
          tag('section','stepIndex',tag('span','stepBadge',String((token.start || 1)+index))) +
          tag('section','stepBody',withContext('step',() => this.parser.parse(item.tokens,true))))) .join('\n') + '\n';
      }
      return tag(token.ordered ? 'ol' : 'ul','list',token.items.map(item => this.listitem(item)).join(''),token.ordered && token.start !== 1 ? {start:token.start} : {}) + '\n';
    },
    listitem(token) {
      return tag('li','listItem',(token.task ? (token.checked ? '☑ ' : '☐ ') : '') + this.parser.parse(token.tokens,!!token.loose)) + '\n';
    },
    table(token) {
      const plainText = tokens => tokens.map(item => item.type === 'br' ? '\n' : item.tokens ? plainText(item.tokens) : item.text || '').join('');
      // 用可见文本估算阅读宽度，不让链接地址、Markdown 标记或长篇说明撑大列宽。
      const textWidth = text => Math.max(0,...text.split('\n').map(line => Array.from(line).reduce((width,character) =>
        width + (/\s/.test(character) ? 0.35 : /[MW@#%&]/.test(character) ? 0.85 : /[\x00-\xff]/.test(character) ? 0.6 : 1),0)));
      const columns = token.header.map((item,index) => {
        const values = [plainText(item.tokens),...token.rows.map(row => plainText(row[index].tokens))];
        const longest = Math.max(...values.map(textWidth));
        const compact = longest <= 7.5 && values.every(value => !value.includes('\n'));
        return {compact,width:Math.ceil(Math.max(2,Math.min(longest,7.5))*14 + 20)};
      });
      const minimumWidth = columns.reduce((width,column) => width + column.width,0);
      const cell = (item,index,header) => {
        const column = columns[index];
        const attributes = {};
        let extraStyle = '';
        if (header) {
          attributes.scope = 'col';
          attributes['data-table-width'] = (column.width/minimumWidth*100).toFixed(4) + '%';
          extraStyle += 'width:' + attributes['data-table-width'] + ';';
        }
        if (column.compact) {
          attributes['data-table-compact'] = 'true';
          extraStyle += 'white-space:nowrap;font-variant-numeric:tabular-nums;';
        }
        if (token.align[index]) {
          attributes['data-align'] = token.align[index];
          extraStyle += 'text-align:' + token.align[index] + ';';
        }
        attributes.style = extraStyle;
        let content = this.parser.parseInline(item.tokens);
        if (!column.compact) {
          // 在路径与名称的分隔符后提供换行点；不改动文本、链接地址或实体。
          content = content.split(/(<[^>]*>|&(?:#\d+|#x[\da-f]+|[a-z][\da-z]+);)/gi).map(part =>
            part.startsWith('<') || part.startsWith('&') ? part : part.replace(/([a-z\d])([/_.-])(?=[a-z\d])/gi,
              (match,previous,separator,offset,text) => separator === '.' && /\d/.test(previous) && /\d/.test(text[offset+2]) ? match : match + '<wbr>')).join('');
        }
        return tag(header ? 'th' : 'td',header ? 'th' : 'td',content,attributes);
      };
      const head = '<thead><tr>' + token.header.map((item,index) => cell(item,index,true)).join('') + '</tr></thead>';
      const rows = '<tbody>' + token.rows.map(row => '<tr>' + row.map((item,index) => cell(item,index,false)).join('') + '</tr>').join('') + '</tbody>';
      return tag('section','tableWrap',tag('table','table',head+rows,{'data-table-min-width':minimumWidth,style:'min-width:' + minimumWidth + 'px;'})) + '\n';
    },
    hr() { return '<hr data-studio="hr" style="' + escapeHtml(styles.hr) + '">'; },
    html(token) { return escapeHtml(token.text); },
    checkbox(token) { return token.checked ? '☑ ' : '☐ '; }
  }});
  markdown.use({extensions:createComponentExtensions(renderContainer,(role,content) => tag('span',role,content))});
  markdown.use({tokenizer:{emStrong:createStarEmStrongTokenizer()}});
  const tokens = markdown.lexer(source,markdown.defaults);
  const first = tokens.findIndex(token => token.type !== 'space');
  let detectedTitle;
  if (first >= 0 && tokens[first].type === 'heading' && tokens[first].depth === 1) {
    detectedTitle = tokens[first].text.replace(/[*_~]/g,'').replaceAll(String.fromCharCode(96),'');
    tokens.splice(first,1);
  }
  const title = suppliedTitle || detectedTitle || path.basename(inputPath,path.extname(inputPath));
  const body = markdown.parser(tokens,markdown.defaults);
  let coverImage;
  if (cover) {
    coverImage = getImageSource(path.resolve(cover),path.dirname(inputPath),warnings);
    const dimensions = imageDimensions(coverImage.buffer);
    if (dimensions && Math.abs(dimensions.width/dimensions.height-2.35) > .005) throw new Error('封面需为 2.35:1，当前尺寸为 ' + dimensions.width + ' × ' + dimensions.height + '。');
    if (!dimensions) warnings.push('未识别封面尺寸，请另行确认 2.35:1。');
  }
  const links = images.map((image,index) => image.embedded || image.external
    ? '<a href="#" data-save-image="' + image.id + '" download="' + escapeHtml(image.fileName) + '">保存正文配图 ' + (index+1) + '</a>'
    : '<a href="' + escapeHtml(image.src) + '" target="_blank" rel="noopener">打开正文配图 ' + (index+1) + '</a>');
  if (coverImage) links.unshift('<a href="' + escapeHtml(coverImage.src) + '" download="' + escapeHtml(coverImage.fileName) + '">保存封面 · 2.35:1</a>');
  const assets = links.length ? '<details class="assets"><summary>配图素材</summary><p>公众号若未自动带入配图，可保存后在对应位置上传。封面请单独设置。</p><div class="asset-links">' + links.join('') + '</div></details>' : '';
  const shell = fs.readFileSync(path.join(SKILL_ROOT,'assets','editor-shell.html'),'utf8');
  const runtime = fs.readFileSync(path.join(SKILL_ROOT,'assets','editor-runtime.js'),'utf8');
  const mediaEntries = Array.from(mediaRegistry.values());
  const replacements = {
    TITLE:escapeHtml(title), ARTICLE:body, INITIAL_THEME:escapeHtml(theme.id), INITIAL_IMAGE_STYLE:defaultImageStyle,
    MEDIA_SCRIPT: mediaEntries.length ? '<script id="studio-media">window.__STUDIO_MEDIA__=' + scriptJson(Object.fromEntries(mediaEntries.map(entry => [entry.name,'data:' + entry.mime + ';base64,' + entry.buffer.toString('base64')]))) + ';</script>' : '',
    IMAGE_OPTIONS:IMAGE_APPEARANCES.map(item=>'<option value="'+item.id+'"'+(item.id===defaultImageStyle?' selected':'')+'>'+escapeHtml(item.name)+'</option>').join(''),
    TEMPLATE_OPTIONS:themes.map(item => '<option value="' + item.id + '"' + (item.id === theme.id ? ' selected' : '') + '>' + escapeHtml(item.name) + '</option>').join(''),
    THEME_CARDS:themes.map(item => '<button class="template-card" type="button" data-template-choice="' + item.id + '" aria-pressed="' + (item.id === theme.id) + '"><span class="swatch" style="background:' + escapeHtml(item.colors.accent) + ';"></span><strong>' + escapeHtml(item.name) + '</strong><small>' + escapeHtml(item.category) + '</small></button>').join(''),
    THEMES_JSON:scriptJson(themes), ASSETS:assets,
    PAPER_STYLE:escapeHtml(styles.paper || ''),
    THEME_ENGINE:'const createStudioStyles = ' + buildStyles.toString() + ';\nconst createStudioHeading = ' + buildSectionHeading.toString() + ';\nconst createStudioImageFrame = ' + buildImageFrame.toString() + ';', RUNTIME:runtime
  };
  const html = shell.replace(/\{\{([A-Z_]+)\}\}/g,(_,key) => {
    if (!(key in replacements)) throw new Error('未知模板占位符：' + key);
    return replacements[key];
  });
  if (!outputPath) {
    const directory = createOutputDirectory({ root:outputRoot, date });
    outputPath = path.join(directory,path.basename(inputPath,path.extname(inputPath)) + '-公众号.html');
  }
  fs.mkdirSync(path.dirname(outputPath),{recursive:true});
  for (const entry of mediaEntries) fs.writeFileSync(path.join(path.dirname(outputPath),entry.name),entry.buffer);
  fs.writeFileSync(outputPath,html,{encoding:'utf8',flag:overwrite ? 'w' : 'wx'});
  return { input:inputPath, output:outputPath, outputDirectory:path.dirname(outputPath), title, template:theme.id, templateName:theme.name, availableTemplates:themes.length, sections:sectionCount, components, codeBlocks, imageStyle:defaultImageStyle, imageStyles:images.reduce((counts,image)=>{counts[image.appearance]=(counts[image.appearance]||0)+1;return counts;},{}), images:images.length, embeddedImages:images.filter(image => image.embedded).length, externalImages:images.filter(image => image.external).length, mediaFiles:mediaEntries.map(entry => entry.name), bytes:Buffer.byteLength(html), warnings };
}

function main() {
  const {values} = parseArgs({options:{
    input:{type:'string',short:'i'},output:{type:'string',short:'o'},template:{type:'string',short:'t'},
    title:{type:'string'},cover:{type:'string'},overwrite:{type:'boolean',default:false},
    'output-root':{type:'string'},date:{type:'string'},
    'image-style':{type:'string'},'list-image-styles':{type:'boolean'},
    images:{type:'string',default:'embed'},
    'list-templates':{type:'boolean'},help:{type:'boolean',short:'h'}
  }});
  if (values['list-templates']) {
    console.log(JSON.stringify(loadThemes().map(({id,name,category,description}) => ({id,name,category,description})),null,2)); return;
  }
  if (values['list-image-styles']) { console.log(JSON.stringify(IMAGE_APPEARANCES,null,2));return; }
  if (values.help) {
    console.log('node render-article.mjs --input article.md [--output article.html | --output-root output --date YYYY-MM-DD] [--template 翡翠序章] [--image-style rounded-shadow|mac-window|plain] [--images embed|external] [--cover cover.jpg] [--overwrite]\n未指定 --output 时，在当前工作目录的 output 下新建当天日期文件夹；同日多次生成自动追加 -02、-03。--date 可使用会话中的用户当地日期。--images external 时本地配图按同目录文件引用，页面只内嵌一份注册表，复制正文时自动换回内嵌图片；默认 embed 全部内嵌。\nnode render-article.mjs --list-templates\nnode render-article.mjs --list-image-styles'); return;
  }
  if (!values.input) throw new Error('请提供 --input Markdown 文件。');
  console.log(JSON.stringify(renderArticle({input:values.input,output:values.output,outputRoot:values['output-root'],date:values.date,template:values.template,title:values.title,cover:values.cover,imageStyle:values['image-style'],overwrite:values.overwrite,images:values.images}),null,2));
}
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url))) {
  try { main(); } catch (error) { console.error('生成失败：' + error.message); process.exitCode = 1; }
}

