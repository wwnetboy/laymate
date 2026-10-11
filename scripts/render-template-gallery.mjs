#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { loadThemes, renderArticle } from './render-article.mjs';
import { buildStyles } from '../assets/theme-engine.mjs';

const { values } = parseArgs({ options:{ output:{type:'string'}, article:{type:'string'}, templates:{type:'string'} } });
if (!values.output) throw new Error('请用 --output 指定模板全览 HTML 的保存路径。');
const output = path.resolve(values.output), availableThemes = loadThemes();
const requested = values.templates ? values.templates.split(',').map(id=>id.trim()).filter(Boolean) : null;
if (requested && (!requested.length || requested.some(id=>!availableThemes.some(theme=>theme.id===id)))) throw new Error('--templates 应为逗号分隔的有效模板 ID。');
const themes = requested ? availableThemes.filter(theme=>requested.includes(theme.id)) : availableThemes;
const samples = JSON.parse(fs.readFileSync(new URL('../assets/gallery-samples.json',import.meta.url),'utf8'));
const filters = JSON.parse(fs.readFileSync(new URL('../assets/gallery-filters.json',import.meta.url),'utf8'));
const dimensions = ['tone','color','style'];
const filterLabels = Object.fromEntries(dimensions.map(key=>[key,Object.fromEntries(filters[key].options.map(option=>[option.value,option.label]))]));
for (const theme of themes) {
  for (const key of ['color','style']) {
    const tags = filters.templates[theme.id]?.[key];
    if (!Array.isArray(tags) || !tags.length || tags.some(tag=>!Object.hasOwn(filterLabels[key],tag))) throw new Error('请为模板 '+theme.id+' 在 gallery-filters.json 中添加有效的 '+key+' 筛选分类。');
  }
}
const tempRoot = fs.realpathSync(os.tmpdir()), temporary = fs.mkdtempSync(path.join(tempRoot,'wechat-template-gallery-'));
const escape = value=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
try {
  const componentFile = values.article ? path.resolve(values.article) : path.join(temporary,'components.html');
  let componentReport = null;
  if (!values.article) componentReport = renderArticle({input:fileURLToPath(new URL('../assets/demo-article.md',import.meta.url)),output:componentFile,images:'external'});
  const componentHtml = fs.readFileSync(componentFile,'utf8');
  if (!componentHtml.includes('id="article-content"') || !componentHtml.includes('data-initial-theme="')) throw new Error('--article 必须是公众号排版助手生成的完整组件 HTML。');
  const componentSource = componentHtml
    .replace('在右侧操作面板切换样式，即可比较同一内容在五十九款风格中的效果，配图外观可独立切换。','当前展示所选模板的完整组件，向下滚动可继续查看。')
    .replace('</head>',`<style>
    body{padding:20px;background:#F3F2EF}
    .control-panel,.panel-toggle,.panel-backdrop,.selector-menu,.assets{display:none!important}
    .paper{max-width:780px;padding:32px 40px;border:0}
    a{pointer-events:none}
    @media(max-width:640px){body{padding:0}.paper{padding:24px var(--studio-paper-inset,18px) 32px}}
  </style></head>`);
  const cards = themes.map((theme,index)=>{
    const sample = samples[theme.id];
    if (!sample || !sample.title || !sample.lead || !sample.heading || !sample.body || !sample.extra || !sample.continuation) throw new Error('请为模板 '+theme.id+' 在 gallery-samples.json 中添加完整的主题文章。');
    const input = path.join(temporary,theme.id+'.md');
    fs.writeFileSync(input,['# '+sample.title,':::lead\n'+sample.lead+'\n:::','## '+sample.heading,sample.body,sample.extra,sample.continuation].join('\n\n')+'\n','utf8');
    const file = path.join(temporary,theme.id+'.html');
    const report = renderArticle({input,output:file,template:theme.id});
    const html = fs.readFileSync(file,'utf8'), styles = buildStyles(theme);
    const background = styles.paper?.match(/(?:^|;)background(?:-color)?:\s*(#[\da-f]{6}|#[\da-f]{3})(?=;|$)/i)?.[1] || '#ffffff';
    const hex = background.length===4 ? background.slice(1).split('').map(digit=>digit+digit).join('') : background.slice(1);
    const rgb = [0,2,4].map(offset=>parseInt(hex.slice(offset,offset+2),16));
    const tone = rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722<128 ? 'dark' : 'light';
    const tags = {...filters.templates[theme.id],tone:[tone]};
    const filterWords = dimensions.flatMap(key=>tags[key].map(value=>filterLabels[key][value])).join(' ')+(tone==='dark'?' 暗色':'');
    const start = html.indexOf('<section id="article-content"');
    const body = html.slice(html.indexOf('>',start)+1,html.indexOf('</main>',start)).replace(/<\/section>\s*$/,'');
    const preview = '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}html,body{scrollbar-width:none}html::-webkit-scrollbar,body::-webkit-scrollbar{display:none}body{margin:0;padding:24px;overflow-wrap:anywhere}h1{text-wrap:balance;margin-bottom:20px!important}[data-studio="lead"]{margin-bottom:20px!important;padding-block:12px!important}[data-studio="leadParagraph"]{margin:0!important}[data-section-index]{margin-top:26px!important;margin-bottom:18px!important}[data-studio="paragraph"]{margin:16px 0!important}a{pointer-events:none}</style></head><body style="'+escape(styles.paper || 'background:#fff;')+'"><h1 style="'+escape(styles.articleTitle)+'">'+escape(report.title)+'</h1><section style="'+escape(styles.article)+'">'+body+'</section></body></html>';
    const number = 'T'+String(index+1).padStart(3,'0');
    const previewIcon = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/></svg>';
    const copyIcon = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="13" height="13" rx="2.5"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
    const actions = '<button class="open-article" type="button" data-template="'+escape(theme.id)+'" data-name="'+escape(theme.name)+'" aria-haspopup="dialog" aria-controls="component-dialog">预览模板 '+previewIcon+'</button><button class="copy-prompt" type="button" data-name="'+escape(theme.name)+'">复制提示词 '+copyIcon+'</button>';
    const attributes = dimensions.map(key=>' data-'+key+'="'+escape(tags[key].join(' '))+'"').join('');
    return '<article class="theme-card" data-search="'+escape(number+' '+theme.name+' '+theme.category+' '+theme.description+' '+theme.aliases.join(' ')+' '+filterWords)+'" data-theme="'+theme.id+'"'+attributes+'><div class="card-info"><div class="card-title"><span class="color-dot" style="background:'+escape(theme.colors.accent)+'"></span><h2>'+escape(theme.name)+'</h2><span class="theme-no" title="模板编号 '+number+'">'+number+'</span>'+actions+'</div><p title="'+escape(theme.description)+'"><span class="category">'+escape(theme.category)+'</span>'+escape(theme.description)+'</p></div><iframe class="card-preview" title="'+escape(theme.name)+'排版预览" sandbox="allow-scripts allow-same-origin" srcdoc="'+escape(preview)+'"></iframe></article>';
  }).join('');
  const shell = fs.readFileSync(new URL('../assets/template-gallery.html',import.meta.url),'utf8');
  const runtime = fs.readFileSync(new URL('../assets/template-gallery-runtime.js',import.meta.url),'utf8');
  // 原生 select 的展开列表无法跨浏览器定制样式，这里输出按钮 + listbox 的自定义下拉结构。
  const controls = dimensions.map(key=>'<div class="filter-control" data-filter="'+key+'"><button type="button" class="filter-toggle" id="filter-'+key+'" aria-haspopup="listbox" aria-expanded="false"><span class="sr-only">按'+escape(filters[key].label)+'筛选模板：</span><span class="filter-toggle-value">'+escape(filters[key].all)+'</span><svg class="filter-toggle-chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg></button><ul class="filter-menu" role="listbox" aria-label="按'+escape(filters[key].label)+'筛选模板" tabindex="-1" hidden><li class="filter-option" role="option" data-value="" aria-selected="true">'+escape(filters[key].all)+'</li>'+filters[key].options.map(option=>'<li class="filter-option" role="option" data-value="'+escape(option.value)+'" aria-selected="false">'+escape(option.label)+'</li>').join('')+'</ul></div>').join('');
  // 演示文章与卡片预览按同目录共享文件引用配图，页面只保留一份注册表；
  // 复制正文时运行时把注册表中的 data URI 写回 src，粘贴公众号仍自包含。
  const media = new Map();
  const slimCards = cards.replace(/data:image\/(?:png|jpe?g|gif|webp);base64,[A-Za-z0-9+/=]+/g,uri=>{
    if (uri.length < 65536) return uri;
    if (!media.has(uri)) {
      const mime = uri.slice(5,uri.indexOf(';'));
      media.set(uri,'gallery-media-'+media.size+'.'+(mime === 'image/jpeg' ? 'jpg' : mime.split('/')[1]));
    }
    return media.get(uri);
  });
  const replacements = {COUNT:String(themes.length),CARDS:slimCards,FILTERS:controls,COMPONENT_SOURCE:JSON.stringify(componentSource).replace(/</g,'\\u003c'),RUNTIME:runtime};
  const gallery = shell.replace(/\{\{(COUNT|CARDS|FILTERS|COMPONENT_SOURCE|RUNTIME)\}\}/g,(_,key)=>replacements[key]);
  fs.mkdirSync(path.dirname(output),{recursive:true});
  for (const [uri,name] of media) fs.writeFileSync(path.join(path.dirname(output),name),Buffer.from(uri.slice(uri.indexOf(',')+1),'base64'));
  if (componentReport) for (const name of componentReport.mediaFiles) fs.copyFileSync(path.join(path.dirname(componentFile),name),path.join(path.dirname(output),name));
  fs.writeFileSync(output,gallery,'utf8');
  console.log(JSON.stringify({output,templates:themes.length,media:media.size,preview:'1680px 居中布局，每屏一行主题文章，完整组件通过弹窗预览'},null,2));
} finally {
  const resolved = fs.realpathSync(temporary);
  if (path.dirname(resolved)!==tempRoot || !path.basename(resolved).startsWith('wechat-template-gallery-')) throw new Error('临时目录路径异常。');
  fs.rmSync(resolved,{recursive:true,force:true});
}
