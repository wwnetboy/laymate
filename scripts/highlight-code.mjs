import hljs from './vendor/highlight/core.cjs';
import javascript from './vendor/highlight/languages/javascript.cjs';
import typescript from './vendor/highlight/languages/typescript.cjs';
import python from './vendor/highlight/languages/python.cjs';
import bash from './vendor/highlight/languages/bash.cjs';
import shell from './vendor/highlight/languages/shell.cjs';
import powershell from './vendor/highlight/languages/powershell.cjs';
import xml from './vendor/highlight/languages/xml.cjs';
import css from './vendor/highlight/languages/css.cjs';
import sql from './vendor/highlight/languages/sql.cjs';
import yaml from './vendor/highlight/languages/yaml.cjs';
import json from './vendor/highlight/languages/json.cjs';
import ini from './vendor/highlight/languages/ini.cjs';
import diff from './vendor/highlight/languages/diff.cjs';
import go from './vendor/highlight/languages/go.cjs';
import java from './vendor/highlight/languages/java.cjs';
import cpp from './vendor/highlight/languages/cpp.cjs';
import csharp from './vendor/highlight/languages/csharp.cjs';
import rust from './vendor/highlight/languages/rust.cjs';
import dockerfile from './vendor/highlight/languages/dockerfile.cjs';
import markdown from './vendor/highlight/languages/markdown.cjs';

for (const [name,grammar] of Object.entries({javascript,typescript,python,bash,shell,powershell,xml,css,sql,yaml,json,ini,diff,go,java,cpp,csharp,rust,dockerfile,markdown})) hljs.registerLanguage(name,grammar);

const escapeHtml = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const scopeRole = {
  keyword:'syntaxKeyword',literal:'syntaxKeyword',built_in:'syntaxFunction',
  string:'syntaxString',regexp:'syntaxString',number:'syntaxNumber',
  comment:'syntaxComment',doctag:'syntaxComment',quote:'syntaxComment',
  title:'syntaxFunction',section:'syntaxFunction',type:'syntaxFunction',
  attr:'syntaxProperty',attribute:'syntaxProperty',property:'syntaxProperty',
  tag:'syntaxTag',name:'syntaxTag',selector:'syntaxTag',
  variable:'syntaxVariable',params:'syntaxPlain',symbol:'syntaxVariable',
  meta:'syntaxMeta',addition:'syntaxAddition',deletion:'syntaxDeletion',
  subst:'syntaxPlain',punctuation:'syntaxPlain',operator:'syntaxKeyword',
  emphasis:'syntaxPlain',strong:'syntaxPlain',bullet:'syntaxProperty',link:'syntaxString',
  code:'syntaxString',template:'syntaxString'
};

export function highlightCode(code, info, styles, warnings=[]) {
  const parts = String(info || '').trim().split(/\s+/);
  const language = (parts[0] || 'text').toLowerCase();
  const file = String(info || '').match(/(?:^|\s)title=(?:"([^"]*)"|'([^']*)'|(\S+))/);
  const names = {js:'JavaScript',javascript:'JavaScript',ts:'TypeScript',typescript:'TypeScript',py:'Python',python:'Python',bash:'Shell',sh:'Shell',shell:'Terminal',powershell:'PowerShell',ps1:'PowerShell',html:'HTML',xml:'XML',css:'CSS',sql:'SQL',json:'JSON',yaml:'YAML',yml:'YAML',text:'Text',plaintext:'Text',txt:'Text',go:'Go',java:'Java',cpp:'C++',c:'C',csharp:'C#',rust:'Rust',dockerfile:'Dockerfile',md:'Markdown',markdown:'Markdown',diff:'Diff',ini:'INI'};
  const label = (file ? (file[1] ?? file[2] ?? file[3]) + ' · ' : '') + (names[language] || language);
  if (['text','plaintext','txt','none'].includes(language)) return {html:escapeHtml(code),label,language,highlighted:false};
  if (!hljs.getLanguage(language)) {
    warnings.push('未收录代码语言「' + language + '」，保留原代码并使用纯文本窗口。');
    return {html:escapeHtml(code),label,language,highlighted:false};
  }
  const result = hljs.highlight(code,{language,ignoreIllegals:true});
  // Highlight.js emits escaped text and spans. Turn every scope into an inline style;
  // the copied article does not need a stylesheet or the highlighting library.
  const html = result.value.replace(/<span class="([^"]+)">/g,(_,classes) => {
    const scope = classes.split(/\s+/).find(name => name.startsWith('hljs-'))?.slice(5) || '';
    const role = scopeRole[scope.split('-')[0]] || 'syntaxPlain';
    return '<span data-studio="' + role + '" style="' + escapeHtml(styles[role]) + '">';
  });
  return {html,label,language,highlighted:true};
}
