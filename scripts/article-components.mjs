export const CONTAINERS = {
  lead:{role:'lead',label:''},
  quote:{role:'quote',label:''},
  pullquote:{role:'pullquote',label:''},
  note:{role:'note',label:'补充说明'},
  tip:{role:'tip',label:'实用提示'},
  warning:{role:'warning',label:'注意事项',labelRole:'warningLabel'},
  success:{role:'success',label:'完成核对',labelRole:'successLabel'},
  summary:{role:'summary',label:'要点回顾'},
  steps:{role:'steps',label:''},
  card:{role:'card',label:''},
  takeaway:{role:'pullquote',label:''},
  source:{role:'source',label:'来源与延伸阅读'},
  definition:{role:'definition',label:'术语解释'},
  facts:{role:'facts',label:'关键数据'},
  faq:{role:'faq',label:'常见问题'},
  timeline:{role:'timeline',label:''},
  image:{role:'imageBlock',label:''}
};

// CommonMark 按空格和标点判定强调边界，中文书写没有空格，「字**“引文”**：」这类
// 紧贴标点的星号会被判成字面星号。这里放宽星号强调的边界：相邻的 CJK 文字视同
// 空格侧。只放宽星号（含单星斜体）；下划线与三星组合仍交回 marked 原判定，
// 避免影响 snake_case 等技术文本。返回 false 时 marked 继续走原分词器。
export function createStarEmStrongTokenizer() {
  const punctuation = /[\p{P}\p{S}]/u;
  const cjk = /\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}|\p{Script=Hangul}/u;
  const canOpen = (before,after) => {
    if (after === undefined || /\s/.test(after)) return false;
    if (!punctuation.test(after)) return true;
    return !before || /\s/.test(before) || punctuation.test(before) || cjk.test(before);
  };
  const canClose = (before,after) => {
    if (!before || /\s/.test(before)) return false;
    if (!punctuation.test(before)) return true;
    return !after || /\s/.test(after) || punctuation.test(after) || cjk.test(after);
  };
  return function(src,masked = src,prevChar = '') {
    if (src[0] !== '*' || src.startsWith('***')) return false;
    const openLength = src[1] === '*' ? 2 : 1;
    if (!canOpen(prevChar,src[openLength])) return false;
    const scan = masked.length === src.length ? masked : masked.slice(-src.length);
    for (let i = openLength;i < scan.length;i++) {
      if (scan[i] !== '*') continue;
      let end = i;
      while (end < scan.length && scan[end] === '*') end++;
      if (end - i >= openLength && /\S/.test(src.slice(openLength,i)) && canClose(src[i - 1],src[end])) {
        const text = src.slice(openLength,i);
        return {
          type: openLength === 2 ? 'strong' : 'em',
          raw: src.slice(0,i + openLength),
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
      i = end - 1;
    }
    return false;
  };
}

export function createComponentExtensions(renderContainer,renderInline) {
  return [{
    name:'studioContainer',level:'block',childTokens:['tokens','titleTokens'],
    start(src) { return src.match(/^:::/m)?.index; },
    tokenizer(src) {
      const opening = /^:::([a-z][a-z0-9-]*)(?:[ \t]+([^\r\n]*?))?[ \t]*(?:\r?\n|$)/.exec(src);
      if (!opening) return;
      const kind = opening[1];
      if (!Object.hasOwn(CONTAINERS,kind)) throw new Error('未知文章组件：' + kind + '。请查阅 references/components.md。');
      const rest = src.slice(opening[0].length);
      let depth = 1, offset = 0, fence;
      for (const line of rest.match(/[^\n]*(?:\n|$)/g) || []) {
        if (!line) continue;
        const trimmed = line.trimEnd();
        const fenceMatch = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(trimmed);
        if (fence) {
          if (fenceMatch && fenceMatch[1][0] === fence.char && fenceMatch[1].length >= fence.length && !fenceMatch[2].trim()) fence = null;
        } else if (fenceMatch) {
          fence = {char:fenceMatch[1][0],length:fenceMatch[1].length};
        } else if (/^:::[a-z][a-z0-9-]*(?:[ \t].*)?$/.test(trimmed)) {
          depth++;
        } else if (/^:::[ \t]*$/.test(trimmed)) {
          if (--depth === 0) {
            const raw = opening[0] + rest.slice(0,offset+line.length);
            return {type:'studioContainer',raw,kind,title:opening[2] || '',titleTokens:this.lexer.inlineTokens(opening[2] || ''),tokens:this.lexer.blockTokens(rest.slice(0,offset))};
          }
        }
        offset += line.length;
      }
      throw new Error('组件「' + kind + '」缺少结束标记 :::。');
    },
    renderer(token) { return renderContainer(token,this.parser); }
  }, ...[
    {name:'studioHighlight',delimiter:'==',pattern:/^==(?=\S)([^=\n]*?\S)==/,role:'highlight'},
    {name:'studioUnderline',delimiter:'++',pattern:/^\+\+(?=\S)([^+\n]*?\S)\+\+/,role:'underline'}
  ].map(({name,delimiter,pattern,role}) => ({
    name,level:'inline',childTokens:['tokens'],
    start(src) { return src.indexOf(delimiter); },
    tokenizer(src) {
      const match = pattern.exec(src);
      if (match) return {type:name,raw:match[0],tokens:this.lexer.inlineTokens(match[1]),role};
    },
    renderer(token) { return renderInline(token.role,this.parser.parseInline(token.tokens)); }
  }))];
}
