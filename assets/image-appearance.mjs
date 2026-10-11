export const IMAGE_APPEARANCES = [
  {id:'plain',name:'原图',aliases:['默认','原图','无装饰']},
  {id:'rounded-shadow',name:'圆角阴影',aliases:['圆角','圆角阴影','圆角加阴影']},
  {id:'mac-window',name:'苹果窗口',aliases:['苹果','苹果窗口','mac','macos']}
];

export function normalizeImageAppearance(value='plain') {
  const key = String(value).trim().toLowerCase();
  const appearance = IMAGE_APPEARANCES.find(item=>[item.id,item.name,...item.aliases].some(alias=>alias.toLowerCase()===key));
  if (!appearance) throw new Error('未知配图样式：' + value + '。可选 plain（原图）、rounded-shadow（圆角阴影）、mac-window（苹果窗口）。');
  return appearance.id;
}

// Shared static/browser markup. Styling lives in the article's inline role styles.
export function buildImageFrame(appearance,title,imageHtml,styles) {
  const escape=value=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const roles={plain:'imageFramePlain','rounded-shadow':'imageFrameRounded','mac-window':'imageFrameMac'};
  if (!Object.hasOwn(roles,appearance)) throw new Error('未知配图样式：'+appearance);
  function tag(name,role,content,attributes='') {
    return '<'+name+' data-studio="'+role+'" style="'+escape(styles[role]||'')+'"'+attributes+'>'+content+'</'+name+'>';
  }
  const header=appearance==='mac-window' ? tag('section','imageWindowHeader',
    tag('section','imageWindowDots',tag('span','imageDotRed','●')+tag('span','imageDotYellow','●')+tag('span','imageDotGreen','●'),' aria-hidden="true"')+
    tag('span','imageWindowTitle',escape(title||'配图'))) : '';
  return tag('section',roles[appearance],header+imageHtml,' data-image-frame="'+appearance+'"');
}
