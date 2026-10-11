export function buildStyles(theme) {
  const c = theme.colors, t = theme.typography, l = theme.layout;
  // 完成核对跟随模板色板；默认翡翠序章保留既有的绿色状态样式。
  const successColors = theme.id === 'emerald-prologue'
    ? { surface:'#f0f8f4', line:'#cde5da', accent:'#5c9676', strong:'#267051' }
    : c;
  const type = 'font-family:' + t.bodyFont + ';font-size:' + t.size + 'px;line-height:' + t.lineHeight + ';letter-spacing:' + t.spacing + 'px;';
  const normal = type + 'color:' + c.text + ';overflow-wrap:anywhere;';
  const heading = 'font-family:' + t.headingFont + ';font-weight:700;color:' + c.heading + ';';
  const mono = "font-family:Consolas,'SFMono-Regular',Menlo,monospace;letter-spacing:0;";
  const small = 'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;font-size:12px;line-height:1.6;letter-spacing:0.6px;';
  const card = 'box-sizing:border-box;margin:26px 0;padding:19px 21px;border-radius:' + l.radius + 'px;';
  const windowDot = 'display:inline-block;width:12px;height:12px;text-align:center;vertical-align:middle;font-family:Arial,Helvetica,sans-serif;font-size:27px;line-height:12px;font-weight:400;letter-spacing:0;';
  const styles = {
    article: 'margin:0;padding:0;text-align:left;' + normal,
    articleTitle: 'margin:0 0 30px;font-size:26px;line-height:1.55;letter-spacing:0;' + heading,
    paragraph: 'margin:24px 0;text-align:left;' + normal,
    compactParagraph: 'margin:8px 0;text-align:left;' + normal,
    lead: 'margin:0 0 30px;padding:0 0 23px;border-bottom:1px solid ' + c.line + ';',
    leadParagraph: 'margin:8px 0;font-size:' + (t.size + 1) + 'px;line-height:1.95;font-family:' + t.bodyFont + ';color:' + c.heading + ';letter-spacing:' + t.spacing + 'px;overflow-wrap:anywhere;',
    strong: 'font-weight:700;color:' + c.strong + ';',
    em: 'font-style:italic;color:' + c.text + ';',
    underline: 'text-decoration:underline;text-underline-offset:4px;text-decoration-color:' + c.accent + ';',
    highlight: 'background:' + c.surface + ';color:' + c.strong + ';padding:1px 3px;border-bottom:1px solid ' + c.accent + ';',
    section: 'margin:48px 0 24px;',
    sectionNumber: 'margin:0 0 12px;color:' + c.accent + ';font-family:Consolas,monospace;font-size:62px;font-weight:400;line-height:1.08;letter-spacing:-2px;',
    sectionLine: 'border-top:2px solid ' + c.accent + ';padding-top:15px;',
    h2: 'margin:0;color:' + c.accent + ';font-size:18px;font-weight:700;line-height:1.85;letter-spacing:0.3px;font-family:' + t.headingFont + ';',
    subhead: 'margin:34px 0 20px;padding:3px 0 3px 13px;border-left:3px solid ' + c.accent + ';background:' + c.surface + ';',
    h3: 'margin:0;font-size:16px;line-height:1.85;font-weight:700;color:' + c.heading + ';font-family:' + t.headingFont + ';',
    sectionGrid: 'display:table;width:100%;table-layout:fixed;border-collapse:collapse;',
    sectionNumberCell: 'display:table-cell;width:52px;vertical-align:middle;padding:0 14px 0 0;',
    sectionTitleCell: 'display:table-cell;vertical-align:middle;min-width:0;',
    sectionOrnament: 'width:32px;height:0;border:0;border-top:2px solid ' + c.accent + ';margin:16px auto 0;',
    quote: 'margin:24px 0;padding:18px 20px;border-left:3px solid ' + c.accent + ';background:' + c.surface + ';border-radius:0 ' + l.radius + 'px ' + l.radius + 'px 0;',
    quoteCredit: 'margin:12px 0 0;text-align:right;color:' + c.muted + ';' + small,
    pullquote: 'margin:32px 0;padding:20px 24px;text-align:center;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';',
    quoteMark: 'display:block;margin:0;height:30px;font-family:Georgia,serif;font-size:46px;line-height:1;text-align:left;color:' + c.accent + ';',
    quoteMarkEnd: 'display:block;margin:0;height:30px;font-family:Georgia,serif;font-size:46px;line-height:1;text-align:right;color:' + c.accent + ';',
    takeawayParagraph: 'margin:12px 0;font-family:' + t.headingFont + ';font-size:19px;line-height:1.8;font-weight:600;color:' + c.heading + ';overflow-wrap:anywhere;',
    note: card + 'border:1px solid ' + c.line + ';background:' + c.surface + ';',
    tip: card + 'border-left:3px solid ' + c.accent + ';background:' + c.surface + ';',
    warning: card + 'border:1px solid #ead8b7;background:#fff9ed;',
    success: card + 'border:1px solid ' + successColors.line + ';background:' + successColors.surface + ';',
    summary: card + 'border-top:2px solid ' + c.accent + ';background:' + c.surface + ';',
    card: card + 'border:1px solid ' + c.line + ';background:#fff;',
    definition: card + 'border-left:2px solid ' + c.accent + ';background:' + c.surface + ';',
    facts: 'margin:28px 0;padding:18px 0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';',
    factsList: 'margin:0;padding:0;',
    factRow: 'display:table;table-layout:fixed;width:100%;margin:0;padding:12px 0;',
    factValue: 'display:table-cell;width:38%;vertical-align:middle;padding-right:16px;font-size:23px;line-height:1.5;font-family:' + t.headingFont + ';font-weight:700;color:' + c.strong + ';overflow-wrap:anywhere;',
    factLabel: 'display:table-cell;vertical-align:middle;font-size:14px;line-height:1.9;font-family:' + t.bodyFont + ';color:' + c.text + ';overflow-wrap:anywhere;',
    faq: 'margin:28px 0;',
    faqRow: 'margin:0 0 18px;padding:17px 19px;background:' + c.surface + ';border-radius:' + l.radius + 'px;',
    faqQuestion: 'margin:0 0 10px;font-size:16px;line-height:1.8;font-weight:700;color:' + c.heading + ';font-family:' + t.headingFont + ';overflow-wrap:anywhere;',
    faqAnswer: 'margin:6px 0;font-size:15px;line-height:1.95;color:' + c.text + ';font-family:' + t.bodyFont + ';overflow-wrap:anywhere;',
    timeline: 'margin:28px 0;',
    timelineList: 'margin:16px 0;padding:0 0 0 7px;',
    timelineRow: 'display:table;table-layout:fixed;width:100%;margin:0;',
    timelineIndex: 'display:table-cell;width:23px;vertical-align:top;border-left:1px solid ' + c.line + ';',
    timelineDot: 'display:block;width:8px;height:8px;margin:9px 0 0 -6px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:8px;font-weight:400;letter-spacing:0;color:' + c.accent + ';',
    timelineBody: 'display:table-cell;vertical-align:top;padding:0 0 23px;',
    componentLabel: 'margin:0 0 11px;font-size:13px;line-height:1.6;font-weight:700;color:' + c.strong + ';font-family:' + t.headingFont + ';letter-spacing:0.5px;',
    warningLabel: 'margin:0 0 11px;font-size:13px;line-height:1.6;font-weight:700;color:#8b621e;font-family:' + t.headingFont + ';',
    successLabel: 'margin:0 0 11px;font-size:13px;line-height:1.6;font-weight:700;color:' + successColors.strong + ';font-family:' + t.headingFont + ';',
    steps: 'margin:26px 0;',
    stepRow: 'display:table;table-layout:fixed;width:100%;margin:0 0 19px;',
    stepIndex: 'display:table-cell;width:43px;vertical-align:top;padding:3px 12px 0 0;',
    stepBadge: 'display:inline-block;width:29px;height:29px;line-height:29px;text-align:center;background:' + c.surface + ';border:1px solid ' + c.line + ';border-radius:50%;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:' + c.strong + ';',
    stepBody: 'display:table-cell;vertical-align:top;padding:0 0 16px;border-bottom:1px solid ' + c.line + ';',
    stepParagraph: 'margin:0 0 8px;' + normal,
    source: 'margin:35px 0 0;padding:19px 0 0;border-top:1px solid ' + c.line + ';',
    sourceParagraph: 'margin:8px 0;color:' + c.muted + ';font-family:' + t.bodyFont + ';font-size:13px;line-height:1.9;overflow-wrap:anywhere;',
    codeBlock: 'box-sizing:border-box;margin:28px 0;padding:0;border:1px solid #343846;background:#222631;border-radius:11px;overflow:hidden;text-align:left;',
    codeHeader: 'display:table;table-layout:fixed;box-sizing:border-box;width:100%;padding:13px 16px 11px;background:#2b303c;border-bottom:1px solid #3a4050;',
    codeDots: 'display:table-cell;width:68px;vertical-align:middle;font-size:0;line-height:1;',
    codeDotRed: windowDot + 'margin-right:10px;color:#ff5f57;',
    codeDotYellow: windowDot + 'margin-right:10px;color:#febc2e;',
    codeDotGreen: windowDot + 'color:#28c840;',
    codeLabel: 'display:table-cell;vertical-align:middle;text-align:right;color:#adb6ca;overflow-wrap:anywhere;' + small,
    codePre: 'box-sizing:border-box;margin:0;padding:18px 18px 21px;max-width:100%;white-space:pre-wrap;overflow-wrap:anywhere;word-break:normal;tab-size:2;color:#d8deed;font-size:13px;line-height:1.85;text-align:left;' + mono,
    codeText: 'margin:0;padding:0;color:#d8deed;font-size:13px;line-height:1.85;white-space:pre-wrap;overflow-wrap:anywhere;word-break:normal;' + mono,
    syntaxKeyword: 'color:#c6a0ef;',
    syntaxString: 'color:#a6d6a0;',
    syntaxNumber: 'color:#edc087;',
    syntaxComment: 'color:#9aa5bb;font-style:italic;',
    syntaxFunction: 'color:#8ebcf0;',
    syntaxProperty: 'color:#92d6d9;',
    syntaxTag: 'color:#f09aab;',
    syntaxVariable: 'color:#edc087;',
    syntaxMeta: 'color:#c6a0ef;',
    syntaxAddition: 'color:#a6d6a0;',
    syntaxDeletion: 'color:#f09aab;',
    syntaxPlain: 'color:#d8deed;',
    inlineCode: 'font-family:Consolas,monospace;font-size:0.95em;padding:1px 5px;color:' + c.heading + ';background:' + c.surface + ';border-radius:3px;',
    imageBlock: 'margin:30px 0;text-align:center;',
    image: 'display:block;width:100%;max-width:100%;height:auto;margin:0;border:0;vertical-align:middle;',
    imageFramePlain: 'display:block;margin:0;padding:0;background:transparent;',
    imageFrameRounded: 'box-sizing:border-box;display:block;margin:6px 6px 18px;padding:0;border:1px solid #e2e7eb;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 8px 22px rgba(32,48,62,0.12);',
    imageFrameMac: 'box-sizing:border-box;display:block;margin:6px 6px 18px;padding:0;border:1px solid #dfe5eb;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 8px 22px rgba(32,48,62,0.12);',
    imageWindowHeader: 'box-sizing:border-box;display:table;table-layout:fixed;width:100%;padding:11px 14px;background:#f4f6f8;border-bottom:1px solid #e0e5eb;',
    imageWindowDots: 'display:table-cell;width:68px;vertical-align:middle;font-size:0;line-height:1;',
    imageDotRed: windowDot + 'margin-right:10px;color:#ff5f57;',
    imageDotYellow: windowDot + 'margin-right:10px;color:#febc2e;',
    imageDotGreen: windowDot + 'color:#28c840;',
    imageWindowTitle: 'display:table-cell;vertical-align:middle;padding-right:68px;text-align:center;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;font-size:11px;line-height:1.6;letter-spacing:0;color:#6b7885;overflow-wrap:anywhere;',
    caption: 'margin:9px 0 0;text-align:center;font-size:11px;line-height:1.7;letter-spacing:0.5px;color:' + c.muted + ';font-family:Arial,sans-serif;',
    list: 'margin:22px 0;padding-left:22px;',
    listItem: 'margin:10px 0;padding-left:3px;' + normal,
    link: 'color:' + c.strong + ';text-decoration:underline;text-underline-offset:3px;',
    tableWrap: 'box-sizing:border-box;width:100%;max-width:100%;margin:26px 0;overflow-x:auto;-webkit-overflow-scrolling:touch;',
    table: 'border-collapse:collapse;table-layout:fixed;width:100%;font-size:14px;line-height:1.75;letter-spacing:0;font-family:' + t.bodyFont + ';color:' + c.text + ';',
    th: 'border:1px solid ' + c.line + ';padding:10px 12px;background:' + c.surface + ';font-weight:700;color:' + c.heading + ';text-align:left;',
    td: 'border:1px solid ' + c.line + ';padding:10px 12px;text-align:left;overflow-wrap:anywhere;',
    hr: 'height:0;border:0;border-top:1px solid ' + c.line + ';margin:35px 0;',
    del: 'text-decoration:line-through;color:' + c.muted + ';'
  };
  // 翡翠序章保留原样。其余模板先统一阅读尺度，再定义各自的视觉重心。
  if (l.heading && l.heading !== 'monument') {
    styles.articleTitle = 'margin:0 0 28px;font-size:29px;line-height:1.5;letter-spacing:0;' + heading;
    styles.paragraph = 'margin:22px 0;text-align:left;' + normal;
    styles.compactParagraph = 'margin:8px 0;text-align:left;' + normal;
    styles.lead = 'margin:0 0 34px;padding:0;border:0;';
    styles.leadParagraph = 'margin:8px 0;font-size:17px;line-height:2;font-family:' + t.bodyFont + ';color:' + c.heading + ';letter-spacing:' + t.spacing + 'px;overflow-wrap:anywhere;';
    styles.section = 'margin:46px 0 23px;';
    styles.sectionNumberCell = 'display:table-cell;width:72px;vertical-align:middle;padding:0 18px 0 0;';
    styles.sectionTitleCell = 'display:table-cell;vertical-align:middle;min-width:0;';
    styles.subhead = 'margin:32px 0 16px;padding:0;border:0;background:transparent;';
    styles.h3 = 'margin:0;font-size:17px;font-weight:600;line-height:1.8;color:' + c.heading + ';font-family:' + t.headingFont + ';';
    styles.componentLabel = 'margin:0 0 12px;font-family:' + t.headingFont + ';font-size:12px;font-weight:600;line-height:1.7;letter-spacing:0.8px;color:' + c.strong + ';';
    styles.faqQuestion += 'font-weight:600;';
    styles.takeawayParagraph = 'margin:12px 0;font-family:' + t.headingFont + ';font-size:19px;line-height:1.9;font-weight:600;color:' + c.heading + ';overflow-wrap:anywhere;';
    styles.quote = 'margin:28px 0;padding:6px 0 6px 19px;border-left:2px solid ' + c.accent + ';background:transparent;';
    styles.quoteCredit += 'font-size:11px;letter-spacing:0.3px;';
    styles.pullquote = 'margin:34px 0;padding:20px 18px;text-align:center;border:0;';
    styles.quoteMark += 'font-size:40px;height:27px;';
    styles.quoteMarkEnd += 'font-size:40px;height:27px;';
    styles.stepRow = 'display:table;table-layout:fixed;width:100%;margin:0 0 22px;';
    styles.stepIndex = 'display:table-cell;width:41px;vertical-align:top;padding:3px 12px 0 0;';
    styles.stepBody = 'display:table-cell;vertical-align:top;padding:0 0 17px;border-bottom:1px solid ' + c.line + ';';
    styles.caption += 'letter-spacing:0;';
  }
  // 辅助函数留在本函数内，保证独立 HTML 内的模板切换与静态渲染一致。
  const frame = (padding, border, background, radius=0) => 'box-sizing:border-box;margin:28px 0;padding:' + padding + ';border:' + border + ';background:' + background + ';border-radius:' + radius + 'px;';
  const number = (size, extra='') => 'display:block;box-sizing:border-box;margin:0;font-family:Georgia,serif;font-size:' + size + 'px;line-height:1.1;letter-spacing:0;color:' + c.accent + ';white-space:nowrap;' + extra;
  const title = (size, extra='') => 'margin:0;font-family:' + t.headingFont + ';font-size:' + size + 'px;font-weight:700;line-height:1.65;color:' + c.heading + ';overflow-wrap:anywhere;' + extra;
  const label = 'margin:0 0 12px;font-size:12px;font-weight:600;line-height:1.7;letter-spacing:1px;font-family:' + t.headingFont + ';';
  function chapter(css, marker, headline, cell) {
    styles.section = css;
    styles.sectionNumber = marker;
    styles.h2 = headline;
    if (cell) styles.sectionNumberCell = 'display:table-cell;vertical-align:middle;' + cell;
  }
  function panels(css) {
    for (const role of ['note','tip','summary','card','definition','faqRow']) styles[role] = css;
    styles.warning = frame('18px 20px','0','#fff7eb',6) + 'border-left:2px solid #b98a3d;';
    styles.success = frame('18px 20px','0',successColors.surface,6) + 'border-left:2px solid ' + successColors.accent + ';';
  }
  function ruledTables(background=c.surface, ink=c.heading) {
    styles.th = 'padding:11px 12px;border:0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';background:' + background + ';color:' + ink + ';font-size:13px;font-weight:600;line-height:1.8;text-align:left;overflow-wrap:anywhere;';
    styles.td = 'padding:12px;border:0;border-bottom:1px solid ' + c.line + ';text-align:left;overflow-wrap:anywhere;';
  }
  function darkPaper(background) {
    styles.paper = 'background:' + background + ';border-color:' + c.line + ';--studio-paper-inset:6px;';
    styles.article += 'box-sizing:border-box;padding:12px;background:' + background + ';';
    styles.articleTitle += 'padding-left:12px;padding-right:12px;';
    styles.warning = frame('18px','1px solid #66543d','#2c261f',6);
    styles.success = frame('18px','1px solid ' + successColors.accent,successColors.surface,6);
    styles.warningLabel += 'color:#edc68b;';
    styles.successLabel += 'color:' + successColors.strong + ';';
    styles.inlineCode += 'color:' + c.strong + ';background:' + c.surface + ';';
  }
  switch (l.heading) {
    case 'editorial':
      chapter('margin:47px 0 25px;padding:0 0 18px;border-bottom:1px solid ' + c.accent + ';',
        number(50,'font-weight:400;'),title(24), 'width:96px;padding-right:20px;');
      styles.articleTitle += 'font-size:30px;padding:0 0 20px;border-bottom:3px solid ' + c.heading + ';';
      styles.lead = 'margin:0 0 34px;padding:0 0 0 18px;border-left:1px solid ' + c.accent + ';';
      styles.leadParagraph += 'font-size:18px;';
      panels(frame('19px 21px','0',c.surface));
      styles.note = 'margin:28px 0;padding:18px 0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';';
      styles.componentLabel = label + 'display:inline-block;padding:3px 10px;background:' + c.heading + ';color:#e4cf9b;';
      styles.quote = 'margin:29px 0;padding:18px 0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';';
      styles.pullquote += 'background:' + c.surface + ';';
      styles.summary += 'border-top:2px solid ' + c.accent + ';';
      styles.stepBadge += 'border-radius:0;background:transparent;border-color:' + c.accent + ';font-family:Georgia,serif;font-size:16px;';
      styles.factValue += 'font-family:Georgia,serif;font-size:34px;color:' + c.heading + ';';
      ruledTables('transparent');
      styles.th += 'border-top:2px solid ' + c.heading + ';';
      break;
    case 'steps':
      chapter('margin:43px 0 23px;padding:0 0 16px;border-bottom:1px solid ' + c.line + ';',
        number(44,'font-family:Arial,sans-serif;font-weight:300;'),title(22),'width:80px;padding-right:18px;');
      styles.lead = frame('16px 20px','0',c.surface,8) + 'margin-top:0;border-left:3px solid ' + c.accent + ';';
      panels(frame('18px 20px','0',c.surface,8));
      styles.card += 'background:#fff;border:1px solid ' + c.line + ';';
      styles.tip += 'border-left:2px solid ' + c.accent + ';border-radius:0;';
      styles.summary += 'border-top:2px solid ' + c.accent + ';';
      styles.subhead = 'margin:31px 0 16px;padding-left:11px;border-left:2px solid ' + c.accent + ';';
      styles.quote = 'margin:27px 0;padding:4px 0 4px 18px;border-left:2px solid ' + c.line + ';';
      styles.stepBadge += 'background:' + c.accent + ';border:0;border-radius:7px;color:#fff;';
      styles.stepIndex += 'border-left:1px solid ' + c.line + ';padding-left:9px;width:49px;';
      styles.faqRow = 'margin:0 0 20px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';';
      ruledTables(c.surface,c.strong);
      break;
    case 'folio':
      chapter('margin:50px 0 26px;padding:0;text-align:center;',
        number(16,'margin:0 0 13px;font-family:' + t.headingFont + ';letter-spacing:3px;text-align:center;'),title(25,'text-align:center;letter-spacing:1px;font-weight:600;'));
      styles.sectionOrnament = 'width:36px;height:0;border:0;border-top:3px double ' + c.accent + ';margin:15px auto 0;';
      styles.articleTitle += 'font-family:' + t.headingFont + ';font-size:31px;text-align:center;font-weight:600;letter-spacing:1px;';
      styles.lead = 'margin:0 0 36px;padding:19px 20px;background:' + c.surface + ';border-top:1px solid ' + c.line + ';';
      styles.leadParagraph += 'font-size:17px;';
      panels('margin:29px 0;padding:18px 0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';');
      styles.summary = frame('20px','0',c.surface) + 'border-bottom:3px double ' + c.accent + ';';
      styles.card = frame('20px','1px solid ' + c.line,'#fff');
      styles.quote = 'margin:29px 0;padding:7px 0 7px 19px;border-left:2px solid ' + c.accent + ';';
      styles.pullquote += 'background:' + c.surface + ';';
      styles.subhead = 'margin:34px 0 17px;padding:0 0 8px;border-bottom:1px solid ' + c.line + ';';
      styles.stepBadge += 'border-radius:0;background:transparent;border:0;border-bottom:1px solid ' + c.accent + ';font-family:' + t.headingFont + ';font-size:17px;';
      styles.componentLabel = label + 'color:' + c.strong + ';letter-spacing:2px;';
      ruledTables('transparent');
      styles.th += 'border-top:3px double ' + c.accent + ';';
      styles.codeBlock += 'border-radius:2px;';
      break;
    case 'ribbon':
      chapter('margin:48px 0 25px;padding:0 0 0 16px;border-left:1px solid ' + c.line + ';',
        number(38,'margin:0 0 10px;font-style:italic;'),title(25,'font-weight:600;'));
      styles.articleTitle += 'font-size:31px;font-weight:600;';
      styles.lead = 'margin:0 0 36px;padding:20px 22px;background:' + c.surface + ';border-radius:18px 18px 18px 0;';
      styles.leadParagraph += 'font-family:' + t.headingFont + ';font-size:18px;';
      panels('margin:29px 0;padding:18px 0;border-top:1px solid ' + c.line + ';');
      styles.card = frame('21px','1px solid ' + c.line,'#fff',12);
      styles.summary = frame('21px','0',c.surface,12);
      styles.quote = frame('20px 22px','0',c.surface,0) + 'border-left:1px solid ' + c.accent + ';';
      styles.pullquote += 'font-family:' + t.headingFont + ';';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-family:Georgia,serif;font-style:italic;font-size:21px;';
      styles.stepBody += 'border-bottom-style:dashed;';
      styles.factValue += 'font-family:Georgia,serif;font-size:31px;font-weight:400;';
      ruledTables(c.surface);
      styles.codeBlock += 'border-radius:8px;';
      break;
    case 'minimal':
      chapter('margin:52px 0 26px;padding:0;',
        number(12,'margin:0 0 13px;padding-top:10px;width:26px;border-top:1px solid ' + c.accent + ';font-family:Arial,sans-serif;letter-spacing:1px;'),title(25,'font-weight:600;'));
      styles.articleTitle += 'font-size:30px;font-weight:600;';
      styles.lead = 'margin:0 0 37px;padding:0;';
      styles.leadParagraph += 'color:' + c.text + ';';
      panels('margin:30px 0;padding:3px 0 3px 17px;border-left:1px solid ' + c.line + ';');
      styles.summary = 'margin:31px 0;padding:18px 0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';';
      styles.quote = 'margin:29px 0;padding:2px 0 2px 18px;border-left:1px solid ' + c.accent + ';';
      styles.pullquote += 'padding:14px 0;';
      styles.componentLabel = label + 'font-size:11px;color:' + c.muted + ';';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-size:15px;color:' + c.heading + ';';
      styles.faqRow = 'margin:0 0 24px;padding:0;';
      styles.factValue += 'font-size:30px;color:' + c.heading + ';';
      ruledTables('transparent');
      styles.th += 'padding-left:0;padding-right:0;';
      styles.td += 'padding-left:0;padding-right:0;';
      styles.codeBlock += 'border-radius:6px;';
      break;
    case 'swiss':
      chapter('margin:48px 0 24px;padding:19px 0 0;border-top:3px solid ' + c.heading + ';',
        number(64,'font-family:Arial,sans-serif;font-weight:800;letter-spacing:-3px;'),title(24,'font-weight:800;letter-spacing:-0.3px;'),'width:112px;padding-right:18px;');
      styles.articleTitle += 'font-size:31px;font-weight:800;letter-spacing:-0.8px;';
      styles.lead = 'margin:0 0 35px;padding:0 0 19px;border-bottom:1px solid ' + c.heading + ';';
      panels('margin:29px 0;padding:18px 0;border-top:1px solid ' + c.heading + ';');
      styles.tip += 'padding-left:16px;border-left:4px solid ' + c.accent + ';';
      styles.summary = frame('20px','0',c.surface) + 'border-top:3px solid ' + c.heading + ';';
      styles.quote = 'margin:28px 0;padding:4px 0 4px 20px;border-left:4px solid ' + c.accent + ';';
      styles.pullquote = 'margin:35px 0;padding:20px 0;border-top:3px solid ' + c.heading + ';text-align:left;';
      styles.componentLabel = label + 'color:' + c.heading + ';letter-spacing:1.5px;';
      styles.stepBadge += 'background:' + c.accent + ';border:0;border-radius:0;color:#fff;';
      styles.factValue += 'font-family:Arial,sans-serif;font-size:38px;font-weight:800;color:' + c.heading + ';';
      ruledTables(c.heading,'#fff');
      styles.codeBlock += 'border-radius:0;';
      break;
    case 'newspaper':
      chapter('margin:45px 0 25px;padding:17px 0 0;border-top:1px solid ' + c.heading + ';',
        number(11,'margin:0 0 12px;font-family:' + t.bodyFont + ';letter-spacing:3px;color:' + c.muted + ';'),title(26,'font-weight:600;'));
      styles.articleTitle += 'font-size:32px;text-align:center;padding:0 0 19px;border-bottom:5px double ' + c.heading + ';';
      styles.lead = 'margin:0 0 34px;padding:0 0 21px;border-bottom:1px solid ' + c.line + ';';
      styles.leadParagraph += 'font-size:17px;';
      styles.paragraph += 'text-indent:2em;';
      panels('margin:29px 0;padding:17px 0;border-top:1px solid ' + c.line + ';');
      styles.card += 'padding:19px;border:1px solid ' + c.line + ';';
      styles.summary += 'border-top:3px double ' + c.heading + ';border-bottom:1px solid ' + c.line + ';';
      styles.quote = 'margin:29px 0;padding:17px 0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';';
      styles.pullquote += 'text-align:left;border-top:1px solid ' + c.heading + ';';
      styles.componentLabel = label + 'color:' + c.heading + ';font-size:13px;';
      styles.stepBadge += 'border:0;background:transparent;border-radius:0;font-family:Georgia,serif;font-size:18px;';
      ruledTables('transparent');
      styles.th += 'border-top:3px double ' + c.heading + ';';
      styles.codeBlock += 'border-radius:0;';
      break;
    case 'terminal':
      chapter('margin:44px 0 25px;padding:17px 19px;background:#172820;border-left:3px solid ' + c.accent + ';border-radius:0 5px 5px 0;',
        number(12,'margin:0 0 8px;font-family:Consolas,monospace;color:#9bcdb2;letter-spacing:1px;'),title(22,'color:#eef5f0;font-weight:600;'));
      styles.articleTitle += 'font-size:29px;padding-left:16px;border-left:3px solid ' + c.accent + ';';
      styles.lead = 'margin:0 0 34px;padding:15px 19px;border-left:1px solid ' + c.accent + ';background:' + c.surface + ';';
      panels('margin:28px 0;padding:18px 0;border-top:1px dashed ' + c.line + ';');
      styles.summary = frame('20px','1px solid ' + c.line,c.surface,3);
      styles.card += 'padding:19px;border:1px solid ' + c.line + ';';
      styles.componentLabel = label + 'font-family:Consolas,"Microsoft YaHei",monospace;color:' + c.strong + ';letter-spacing:0.5px;';
      styles.quote = 'margin:28px 0;padding:5px 0 5px 18px;border-left:1px solid ' + c.accent + ';';
      styles.pullquote += 'text-align:left;border-bottom:1px dashed ' + c.line + ';';
      styles.stepBadge += 'font-family:Consolas,monospace;background:transparent;border:1px solid ' + c.accent + ';border-radius:3px;';
      styles.inlineCode += 'border-radius:2px;border-bottom:1px solid ' + c.line + ';';
      ruledTables(c.surface,c.strong);
      styles.th += 'font-family:Consolas,"Microsoft YaHei",monospace;';
      styles.codeBlock += 'border-radius:5px;background:#13221b;border-color:#32483b;';
      styles.codeHeader += 'background:#21352a;border-color:#32483b;';
      styles.codePre += 'background:#13221b;';
      break;
    case 'research':
      chapter('margin:47px 0 24px;padding:0 0 18px;border-bottom:2px solid ' + c.accent + ';',
        number(49,'font-weight:400;'),title(23),'width:88px;padding-right:18px;border-right:1px solid ' + c.line + ';');
      styles.sectionTitleCell += 'padding-left:18px;';
      styles.articleTitle += 'font-size:29px;padding:0 0 20px;border-bottom:1px solid ' + c.line + ';';
      styles.lead = 'margin:0 0 35px;padding:0 0 0 17px;border-left:3px solid ' + c.accent + ';';
      panels(frame('19px 21px','0',c.surface));
      styles.note += 'border-right:2px solid ' + c.line + ';';
      styles.card = frame('20px','1px solid ' + c.line,'#fff');
      styles.summary += 'border-top:2px solid ' + c.accent + ';';
      styles.componentLabel = label + 'color:' + c.strong + ';font-size:11px;letter-spacing:1.5px;';
      styles.quote = 'margin:29px 0;padding:5px 0 5px 20px;border-left:2px solid ' + c.line + ';';
      styles.facts = 'margin:31px 0;padding:9px 0;border-top:2px solid ' + c.accent + ';border-bottom:1px solid ' + c.line + ';';
      styles.factValue += 'font-family:Arial,sans-serif;font-size:33px;color:' + c.heading + ';';
      styles.stepBadge += 'border-radius:0;background:transparent;border:1px solid ' + c.line + ';';
      styles.faqRow = 'margin:0 0 22px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';';
      ruledTables('transparent',c.strong);
      styles.th += 'border-bottom:2px solid ' + c.accent + ';';
      break;
    case 'ticket':
      chapter('margin:46px 0 25px;padding:16px 18px;background:' + c.surface + ';border-left:3px solid ' + c.accent + ';',
        number(28,'font-family:Consolas,monospace;text-align:center;'),title(23),'width:65px;padding-left:16px;border-left:1px dashed ' + c.accent + ';');
      styles.sectionTitleCell += 'padding-right:16px;';
      styles.articleTitle += 'font-size:30px;';
      styles.lead = 'margin:0 0 34px;padding:0 0 21px;border-bottom:1px dashed ' + c.line + ';';
      panels('margin:29px 0;padding:19px 0;border-top:1px dashed ' + c.line + ';border-bottom:1px dashed ' + c.line + ';');
      styles.card = frame('20px','1px dashed ' + c.line,'#fff',3);
      styles.summary = frame('20px','0',c.surface) + 'border-bottom:1px dashed ' + c.accent + ';';
      styles.componentLabel = label + 'font-family:Consolas,"Microsoft YaHei",monospace;font-size:11px;color:' + c.strong + ';letter-spacing:1.5px;';
      styles.quote = frame('19px 21px','0',c.surface) + 'border-left:1px solid ' + c.accent + ';';
      styles.stepBadge += 'width:29px;height:24px;line-height:24px;border-radius:0;background:transparent;border:1px dashed ' + c.accent + ';font-family:Consolas,monospace;';
      styles.stepBody += 'border-bottom-style:dashed;';
      styles.factValue += 'font-family:Consolas,monospace;font-size:29px;';
      ruledTables(c.surface,c.strong);
      styles.td += 'border-bottom-style:dashed;';
      styles.codeBlock += 'border-radius:3px;';
      break;
    case 'letter':
      chapter('margin:53px 0 27px;padding:0;text-align:center;',
        number(15,'margin:0 0 13px;text-align:center;font-style:italic;letter-spacing:3px;color:' + c.muted + ';'),title(25,'font-weight:400;text-align:center;letter-spacing:1px;'));
      styles.articleTitle += 'font-size:31px;font-weight:400;text-align:center;letter-spacing:1px;';
      styles.lead = 'margin:0 0 38px;padding:0 0 21px;border-bottom:1px solid ' + c.line + ';';
      styles.leadParagraph += 'font-size:18px;';
      panels('margin:30px 0;padding:17px 0;border-bottom:1px dashed ' + c.line + ';');
      styles.summary = frame('21px','0',c.surface,6) + 'border-top:1px solid ' + c.line + ';';
      styles.quote = 'margin:29px 0;padding:5px 0 5px 18px;border-left:1px solid ' + c.line + ';';
      styles.pullquote += 'font-weight:400;';
      styles.takeawayParagraph += 'font-weight:400;font-size:20px;';
      styles.componentLabel = label + 'font-size:13px;font-weight:400;color:' + c.heading + ';';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-family:Georgia,serif;font-style:italic;font-size:20px;';
      styles.faqRow = 'margin:0 0 26px;padding:0;';
      ruledTables('transparent');
      styles.th += 'font-weight:400;';
      styles.td += 'border-bottom-style:dashed;';
      styles.caption += 'font-family:' + t.bodyFont + ';';
      break;
    case 'seal':
      chapter('margin:48px 0 25px;padding:0;',
        number(22,'width:43px;padding:7px 3px;border:3px double ' + c.accent + ';text-align:center;font-family:KaiTi,STKaiti,serif;'),title(26,'font-weight:600;letter-spacing:1px;'),'width:63px;padding-right:20px;');
      styles.articleTitle += 'font-size:31px;font-weight:600;padding-left:17px;border-left:2px solid ' + c.accent + ';letter-spacing:1px;';
      styles.lead = 'margin:0 0 35px;padding:18px 0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';';
      styles.leadParagraph += 'font-size:18px;';
      panels(frame('19px 21px','0',c.surface));
      styles.note += 'border-right:2px solid ' + c.accent + ';';
      styles.summary += 'border-top:3px double ' + c.accent + ';';
      styles.card = frame('20px','1px solid ' + c.line,'#fff');
      styles.componentLabel = label + 'display:inline-block;padding:1px 7px;border:1px solid ' + c.accent + ';color:' + c.accent + ';font-family:KaiTi,STKaiti,serif;font-size:14px;';
      styles.quote = 'margin:30px 0;padding:4px 0 4px 19px;border-left:2px solid ' + c.accent + ';';
      styles.pullquote += 'background:' + c.surface + ';';
      styles.stepBadge += 'border-radius:1px;background:transparent;border:1px solid ' + c.accent + ';font-family:KaiTi,serif;font-size:16px;';
      styles.factValue += 'font-family:KaiTi,serif;font-size:30px;';
      ruledTables('transparent',c.strong);
      styles.th += 'border-bottom:2px solid ' + c.accent + ';';
      styles.codeBlock += 'border-radius:2px;';
      break;
    case 'blueprint':
      chapter('margin:47px 0 25px;padding:16px 0 0 17px;border-top:1px solid ' + c.accent + ';border-left:1px solid ' + c.accent + ';',
        number(13,'margin:0 0 11px;font-family:Consolas,monospace;letter-spacing:2px;'),title(23));
      styles.articleTitle += 'font-size:29px;padding:0 0 19px;border-bottom:1px solid ' + c.line + ';';
      styles.lead = 'margin:0 0 35px;padding:0 0 0 16px;border-left:2px solid ' + c.line + ';';
      panels(frame('18px 20px','0',c.surface) + 'border-right:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';');
      styles.card = frame('20px','1px solid ' + c.line,'#fff');
      styles.summary += 'border-bottom:2px solid ' + c.accent + ';';
      styles.componentLabel = label + 'color:' + c.accent + ';font-family:Consolas,"Microsoft YaHei",monospace;font-size:11px;letter-spacing:0.8px;';
      styles.quote = 'margin:29px 0;padding:6px 0 6px 19px;border-left:1px solid ' + c.accent + ';';
      styles.stepBadge += 'background:transparent;border-radius:0;border:1px solid ' + c.accent + ';font-family:Consolas,monospace;';
      styles.factValue += 'font-family:Consolas,monospace;font-size:28px;';
      styles.th += 'background:' + c.surface + ';border-color:' + c.line + ';font-weight:600;';
      styles.td += 'padding:12px;';
      styles.subhead = 'margin:33px 0 17px;padding:0 0 8px;border-bottom:1px dashed ' + c.line + ';';
      styles.codeBlock += 'border-radius:0;border-color:#36516d;';
      styles.codeHeader += 'background:#23394f;border-color:#36516d;';
      break;
    case 'pop':
      chapter('margin:46px 3px 26px 0;padding:16px 17px;background:' + c.surface + ';border-bottom:2px solid ' + c.heading + ';',
        number(18,'width:36px;height:36px;line-height:36px;text-align:center;background:' + c.heading + ';color:#fff;border-radius:50%;font-family:Arial,sans-serif;font-weight:800;'),title(23,'font-weight:800;'),'width:54px;padding-right:18px;');
      styles.articleTitle += 'font-size:31px;font-weight:800;letter-spacing:-0.4px;';
      styles.lead = frame('20px 22px','0',c.surface,12) + 'margin-top:0;';
      panels('margin:29px 0;padding:17px 0 17px 18px;border-left:5px solid ' + c.accent + ';');
      styles.card = frame('20px','1px solid ' + c.heading,'#fff',8);
      styles.summary = frame('20px','1px solid ' + c.heading,c.surface,8);
      styles.componentLabel = label + 'display:inline-block;padding:2px 7px;background:' + c.surface + ';color:' + c.heading + ';';
      styles.quote = 'margin:29px 0;padding:17px 0;border-bottom:2px solid ' + c.heading + ';';
      styles.pullquote += 'background:' + c.surface + ';border-radius:8px;';
      styles.stepBadge += 'background:' + c.heading + ';color:#fff;border:0;';
      styles.factValue += 'font-family:Arial,sans-serif;font-size:35px;font-weight:800;color:' + c.heading + ';';
      ruledTables(c.surface,c.heading);
      styles.th += 'border-bottom:2px solid ' + c.heading + ';';
      styles.codeBlock += 'border-radius:8px;';
      break;
    case 'outdoor':
      chapter('margin:50px 0 27px;padding:0;text-align:center;',
        number(12,'display:inline-block;margin:13px 0 0;padding:3px 13px;border:1px solid ' + c.line + ';border-radius:20px;line-height:1.6;letter-spacing:2px;color:' + c.muted + ';'),title(26,'text-align:center;font-weight:600;letter-spacing:0.5px;'));
      styles.articleTitle += 'font-size:30px;font-weight:600;';
      styles.lead = 'margin:0 0 36px;padding:0 0 0 19px;border-left:1px solid ' + c.accent + ';';
      styles.leadParagraph += 'font-size:18px;';
      panels(frame('20px 22px','0',c.surface,10));
      styles.note = 'margin:29px 0;padding:19px 0;border-top:1px solid ' + c.line + ';';
      styles.card = frame('20px','1px solid ' + c.line,'#fff',10);
      styles.summary += 'border-bottom:2px solid ' + c.accent + ';';
      styles.componentLabel = label + 'color:' + c.strong + ';font-size:13px;';
      styles.quote = frame('19px 21px','0',c.surface,0) + 'border-left:2px solid ' + c.accent + ';';
      styles.pullquote += 'padding:18px 8px;';
      styles.takeawayParagraph += 'font-weight:400;font-size:21px;';
      styles.stepBadge += 'background:transparent;border:1px solid ' + c.accent + ';';
      styles.faqRow = 'margin:0 0 24px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';';
      ruledTables(c.surface);
      break;
    case 'gallery':
      chapter('margin:51px 0 28px;padding:0 0 19px;border-bottom:1px solid ' + c.line + ';',
        number(47,'text-align:right;font-family:Arial,sans-serif;font-weight:300;color:' + c.muted + ';'),title(26,'font-weight:400;'),'width:82px;padding-left:18px;');
      styles.sectionTitleCell += 'padding-right:14px;';
      styles.articleTitle += 'font-size:33px;font-weight:400;line-height:1.65;';
      styles.lead = 'margin:0 0 38px;padding:0;';
      styles.leadParagraph += 'color:' + c.text + ';';
      panels('margin:31px 0;padding:19px 0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';');
      styles.card = frame('23px','1px solid ' + c.heading,'#fff');
      styles.summary += 'border-top-color:' + c.heading + ';';
      styles.componentLabel = label + 'font-family:Arial,"Microsoft YaHei",sans-serif;font-size:10px;letter-spacing:1.8px;color:' + c.muted + ';';
      styles.quote = 'margin:32px 0;padding:0 0 0 19px;border-left:1px solid ' + c.heading + ';';
      styles.pullquote = 'margin:37px 0;padding:18px 0;text-align:left;border:0;';
      styles.takeawayParagraph += 'font-size:22px;font-weight:400;';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-family:Georgia,serif;font-size:21px;font-weight:400;';
      styles.factValue += 'font-family:Georgia,serif;font-size:35px;font-weight:400;color:' + c.heading + ';';
      ruledTables('transparent');
      styles.th += 'font-weight:400;';
      styles.codeBlock += 'border-radius:0;';
      break;
    case 'ledger':
      chapter('margin:44px 0 24px;padding:14px 17px;background:' + c.surface + ';border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';',
        number(30,'text-align:right;font-family:Consolas,monospace;'),title(22),'width:68px;padding-left:17px;');
      styles.sectionTitleCell += 'padding-right:13px;';
      styles.articleTitle += 'font-size:29px;padding-bottom:20px;border-bottom:2px solid ' + c.accent + ';';
      styles.lead = 'margin:0 0 34px;padding:0 0 0 16px;border-left:2px solid ' + c.line + ';';
      panels(frame('18px 20px','0',c.surface,3));
      styles.note += 'border-left:2px solid ' + c.line + ';';
      styles.summary += 'border-top:2px solid ' + c.accent + ';';
      styles.card = frame('19px','1px solid ' + c.line,'#fff',3);
      styles.componentLabel = label + 'font-size:11px;font-family:Consolas,"Microsoft YaHei",monospace;color:' + c.strong + ';letter-spacing:0.8px;';
      styles.quote = 'margin:28px 0;padding:4px 0 4px 18px;border-left:2px solid ' + c.line + ';';
      styles.facts = 'margin:30px 0;padding:0;border-top:2px solid ' + c.accent + ';';
      styles.factRow += 'padding:15px 0;border-bottom:1px solid ' + c.line + ';';
      styles.factValue += 'font-family:Consolas,monospace;font-size:31px;';
      styles.stepBadge += 'border-radius:3px;background:' + c.accent + ';color:#fff;border:0;';
      ruledTables(c.accent,'#fff');
      styles.codeBlock += 'border-radius:3px;';
      break;
    case 'riso':
      chapter('margin:48px 0 25px;padding:18px 0 0;border-top:3px solid ' + c.heading + ';',
        number(54,'margin:0 0 12px;font-family:Arial,sans-serif;font-weight:700;letter-spacing:-2px;'),title(25,'letter-spacing:0.5px;'));
      styles.articleTitle += 'font-size:31px;font-weight:600;';
      styles.lead = frame('18px 21px','1px solid ' + c.heading,c.surface) + 'margin:0 3px 35px 0;box-shadow:3px 3px 0 ' + c.accent + ';';
      panels('margin:29px 0;padding:18px 0;border-bottom:1px solid ' + c.line + ';');
      styles.card = frame('20px','1px solid ' + c.line,'#fff');
      styles.summary = frame('20px','1px solid ' + c.heading,c.surface);
      styles.componentLabel = label + 'display:inline-block;padding:1px 8px;border:1px solid ' + c.heading + ';color:' + c.heading + ';font-size:11px;';
      styles.quote = 'margin:29px 0;padding:5px 0 5px 19px;border-left:3px solid ' + c.accent + ';';
      styles.pullquote += 'background:' + c.surface + ';text-align:left;';
      styles.stepBadge += 'border-radius:0;background:transparent;border:1px solid ' + c.heading + ';color:' + c.heading + ';font-family:Arial,sans-serif;';
      ruledTables(c.heading,'#fff9ef');
      styles.codeBlock += 'border-radius:0;';
      break;
    case 'midnight':
      chapter('margin:46px 0 25px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';',
        number(43,'min-width:42px;min-height:48px;font-family:Arial,sans-serif;font-weight:300;'),title(23,'font-weight:600;'),'width:68px;padding-right:17px;');
      styles.articleTitle += 'font-size:29px;font-weight:600;';
      styles.lead = 'margin:0 0 36px;padding:0 0 0 16px;border-left:1px solid ' + c.line + ';';
      panels(frame('18px 20px','0',c.surface,8));
      darkPaper('#172422');
      styles.note = 'margin:29px 0;padding:18px 0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';';
      styles.summary += 'border:1px solid ' + c.line + ';';
      styles.card += 'border:1px solid ' + c.line + ';';
      styles.quote = 'margin:30px 0;padding:5px 0 5px 17px;border-left:1px solid ' + c.accent + ';';
      styles.componentLabel = label + 'color:' + c.accent + ';font-size:12px;';
      styles.stepBadge += 'background:transparent;border:1px solid ' + c.line + ';color:' + c.accent + ';border-radius:8px;';
      styles.faqRow = 'margin:0 0 23px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';';
      ruledTables(c.surface,c.heading);
      styles.codeBlock += 'border-radius:8px;border-color:#3e514b;background:#101a18;';
      styles.codeHeader += 'background:#263731;border-color:#3e514b;';
      styles.codePre += 'background:#101a18;';
      break;
    case 'dashboard':
      chapter('margin:46px 0 24px;padding:0 0 17px;border-bottom:1px solid ' + c.line + ';',
        number(43,'font-family:Arial,sans-serif;font-weight:300;'),title(23),'width:68px;padding-right:18px;');
      styles.sectionOrnament = 'margin:12px 0 0 68px;width:40px;height:0;border:0;border-top:3px solid ' + c.accent + ';';
      styles.articleTitle += 'font-size:30px;font-weight:700;';
      styles.lead = 'margin:0 0 34px;padding:17px 19px;border-left:2px solid ' + c.accent + ';background:' + c.surface + ';';
      panels(frame('18px 20px','1px solid ' + c.line,'#fff',8));
      styles.componentLabel = label + 'display:block;padding:0 0 10px;border-bottom:1px solid ' + c.line + ';color:' + c.strong + ';font-size:11px;';
      styles.summary += 'background:' + c.surface + ';border:0;';
      styles.tip += 'border-left:2px solid ' + c.accent + ';';
      styles.quote = 'margin:29px 0;padding:5px 0 5px 18px;border-left:2px solid ' + c.line + ';';
      styles.facts = 'margin:30px 0;padding:0;border-bottom:1px solid ' + c.line + ';';
      styles.factRow += 'padding:15px 0;';
      styles.factValue += 'font-family:Arial,sans-serif;font-size:35px;font-weight:600;';
      styles.stepBadge += 'background:' + c.surface + ';border:0;border-radius:7px;color:' + c.strong + ';';
      styles.faqRow = 'margin:0 0 22px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';';
      ruledTables(c.surface,c.strong);
      styles.codeBlock += 'border-radius:9px;';
      break;
    case 'orbital':
      chapter('margin:46px 0 25px;padding:18px 0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';',
        number(21,'width:52px;height:52px;line-height:50px;text-align:center;border:1px solid ' + c.accent + ';border-radius:50%;font-family:Consolas,monospace;'),title(23,'font-weight:600;'),'width:70px;padding-right:18px;');
      styles.articleTitle += 'font-size:29px;font-weight:600;';
      styles.lead = frame('17px 19px','0',c.surface,6) + 'margin-top:0;border-left:2px solid ' + c.accent + ';';
      panels(frame('18px 20px','0',c.surface,6));
      darkPaper('#122136');
      styles.note = 'margin:29px 0;padding:19px 0;border-top:1px solid ' + c.line + ';';
      styles.summary += 'border-top:1px solid ' + c.accent + ';';
      styles.card += 'border:1px solid ' + c.line + ';';
      styles.componentLabel = label + 'display:inline-block;padding:2px 9px;border:1px solid ' + c.line + ';border-radius:20px;color:' + c.accent + ';font-size:11px;letter-spacing:0.5px;';
      styles.quote = 'margin:29px 0;padding:6px 0 6px 18px;border-left:1px solid ' + c.accent + ';';
      styles.pullquote += 'border-top:1px solid ' + c.line + ';';
      styles.factValue += 'font-family:Consolas,monospace;font-size:30px;';
      styles.stepBadge += 'background:transparent;border:1px solid ' + c.accent + ';color:' + c.accent + ';';
      styles.stepBody += 'border-bottom-style:dashed;';
      styles.faqRow = 'margin:0 0 23px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';';
      ruledTables(c.surface,c.heading);
      styles.codeBlock += 'border-radius:6px;background:#0c1828;border-color:#3c5068;';
      styles.codeHeader += 'background:#26364b;border-color:#3c5068;';
      styles.codePre += 'background:#0c1828;';
      break;
    case 'neon':
      chapter('margin:48px 0 25px;padding:0 0 18px;border-bottom:1px solid ' + c.accent + ';',
        number(12,'display:inline-block;margin:0 0 14px;padding:3px 10px;border:1px solid #b99acb;font-family:Consolas,monospace;line-height:1.7;letter-spacing:2px;color:#d8b8ed;'),title(24,'font-weight:700;'));
      styles.articleTitle += 'font-size:30px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';';
      styles.lead = frame('18px 20px','0',c.surface,0) + 'margin-top:0;border-top:2px solid ' + c.accent + ';';
      panels(frame('18px 20px','0',c.surface,0) + 'border-left:2px solid #af8fc6;');
      darkPaper('#1b1726');
      styles.summary = frame('20px','1px solid ' + c.accent,c.surface,0);
      styles.componentLabel = label + 'color:#d6b7e9;font-family:Consolas,"Microsoft YaHei",monospace;font-size:11px;letter-spacing:1px;';
      styles.quote = 'margin:29px 0;padding:17px 0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';';
      styles.pullquote += 'text-align:left;border-left:1px solid ' + c.accent + ';';
      styles.factValue += 'font-family:Consolas,monospace;font-size:31px;';
      styles.stepBadge += 'background:transparent;border:1px solid ' + c.accent + ';border-radius:2px;color:' + c.accent + ';font-family:Consolas,monospace;';
      styles.faqRow = 'margin:0 0 23px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';';
      ruledTables(c.surface,c.heading);
      styles.th += 'border-bottom:1px solid #af8fc6;';
      styles.codeBlock += 'border-radius:2px;background:#14101e;border-color:#614f71;';
      styles.codeHeader += 'background:#30263d;border-color:#614f71;';
      styles.codePre += 'background:#14101e;';
      break;
    case 'signal':
      chapter('margin:46px 0 24px;padding:0 0 17px;border-bottom:1px solid ' + c.accent + ';',
        number(12,'padding:9px 0;text-align:center;font-family:Consolas,monospace;background:' + c.surface + ';line-height:1.6;letter-spacing:0.5px;'),title(22,'font-weight:600;'),'width:79px;padding-left:13px;');
      styles.sectionTitleCell += 'padding-right:13px;';
      styles.articleTitle += 'font-size:29px;padding-left:17px;border-left:1px solid ' + c.accent + ';';
      styles.lead = 'margin:0 0 35px;padding:0 0 0 16px;border-left:1px solid ' + c.line + ';';
      panels('margin:29px 0;padding:18px 0;border-bottom:1px dashed ' + c.line + ';');
      styles.tip += 'padding-left:17px;border-left:1px solid ' + c.accent + ';';
      styles.summary = frame('20px','1px solid ' + c.accent,'#fff');
      styles.card = frame('20px','1px solid ' + c.line,'#fff');
      styles.componentLabel = label + 'font-family:Consolas,"Microsoft YaHei",monospace;font-size:11px;letter-spacing:0.6px;color:' + c.accent + ';';
      styles.quote = 'margin:29px 0;padding:5px 0 5px 18px;border-left:1px solid ' + c.accent + ';';
      styles.facts = 'margin:30px 0;padding:0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';';
      styles.factRow += 'padding:0;border-bottom:1px solid ' + c.line + ';';
      styles.factValue += 'padding:15px 12px;background:' + c.surface + ';font-family:Consolas,monospace;font-size:25px;';
      styles.factLabel += 'padding:15px 12px;border-left:1px solid ' + c.line + ';';
      styles.stepBadge += 'background:transparent;border:0;border-bottom:1px solid ' + c.accent + ';border-radius:0;font-family:Consolas,monospace;';
      styles.stepBody += 'border-bottom-style:dashed;';
      ruledTables(c.surface,c.strong);
      styles.th += 'font-family:Consolas,"Microsoft YaHei",monospace;font-size:12px;';
      styles.codeBlock += 'border-radius:0;border-left:2px solid ' + c.accent + ';';
      styles.codeHeader += 'background:#273b3c;';
      break;
    case 'lab':
      chapter('margin:47px 0 25px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';',
        number(38,'font-family:Consolas,monospace;font-weight:400;'),title(23,'font-weight:600;'),'width:67px;padding-right:18px;border-right:1px solid ' + c.line + ';');
      styles.sectionTitleCell += 'padding-left:18px;';
      styles.sectionOrnament = 'margin:12px 0 0 85px;width:26px;height:0;border:0;border-top:1px solid ' + c.accent + ';';
      styles.articleTitle += 'font-size:29px;padding:0 0 19px;border-bottom:3px double ' + c.accent + ';font-weight:600;';
      styles.lead = frame('18px 21px','0',c.surface,0) + 'margin-top:0;border-top:2px solid ' + c.accent + ';';
      panels(frame('18px 20px','0',c.surface) + 'border-top:1px solid ' + c.line + ';');
      styles.note = 'margin:29px 0;padding:19px 0;border-top:1px solid ' + c.line + ';border-bottom:1px dashed ' + c.line + ';';
      styles.card = frame('20px','1px solid ' + c.line,'#fff',4);
      styles.summary = 'margin:30px 0;padding:20px 0;border-top:1px solid ' + c.accent + ';border-bottom:1px solid ' + c.accent + ';';
      styles.componentLabel = label + 'display:inline-block;padding-bottom:4px;border-bottom:1px solid ' + c.accent + ';font-family:Consolas,"Microsoft YaHei",monospace;font-size:11px;color:' + c.strong + ';letter-spacing:0.7px;';
      styles.quote = 'margin:29px 0;padding:5px 0 5px 18px;border-left:2px solid ' + c.line + ';';
      styles.facts += 'padding:5px 0;';
      styles.factRow += 'padding:15px 0;border-bottom:1px dashed ' + c.line + ';';
      styles.factValue += 'font-family:Consolas,monospace;font-size:28px;';
      styles.stepBadge += 'background:transparent;border:1px solid ' + c.accent + ';font-family:Consolas,monospace;';
      styles.stepBody += 'border-bottom-style:dashed;';
      ruledTables('transparent',c.strong);
      styles.th += 'border-top:2px solid ' + c.accent + ';';
      styles.codeBlock += 'border-radius:4px;';
      styles.codeHeader += 'background:#2d3a38;';
      break;
    case 'titanium':
      chapter('margin:49px 0 26px;padding:19px 0 0;border-top:1px solid ' + c.heading + ';',
        number(11,'display:inline-block;margin:13px 0 0;padding:3px 8px;background:' + c.surface + ';font-family:Consolas,monospace;line-height:1.7;letter-spacing:1px;color:' + c.muted + ';'),title(25,'font-weight:600;letter-spacing:-0.3px;'));
      styles.articleTitle += 'font-size:30px;font-weight:600;letter-spacing:-0.4px;';
      styles.lead = 'margin:0 0 35px;padding:0 0 0 17px;border-left:3px solid ' + c.line + ';';
      panels('margin:29px 0;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';');
      styles.componentLabel = label + 'display:inline-block;padding:4px 8px;background:' + c.surface + ';font-family:Consolas,"Microsoft YaHei",monospace;color:' + c.strong + ';font-size:11px;letter-spacing:0.6px;';
      styles.summary = frame('20px','1px solid ' + c.line,'#fff',0);
      styles.card = frame('20px','1px solid ' + c.line,c.surface,0);
      styles.faqRow = 'margin:0 0 23px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';';
      styles.quote = 'margin:29px 0;padding:5px 0 5px 18px;border-left:2px solid ' + c.line + ';';
      styles.pullquote += 'text-align:left;background:' + c.surface + ';';
      styles.facts = 'margin:30px 0;padding:0;border-top:1px solid ' + c.heading + ';';
      styles.factRow += 'padding:15px 0;border-bottom:1px solid ' + c.line + ';';
      styles.factValue += 'font-family:Consolas,monospace;font-size:31px;color:' + c.heading + ';';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-family:Consolas,monospace;color:' + c.heading + ';';
      ruledTables(c.surface,c.heading);
      styles.th += 'border-top-color:' + c.heading + ';';
      styles.codeBlock += 'border-radius:0;border-color:#525c69;';
      styles.codeHeader += 'background:#343c47;border-color:#525c69;';
      break;

    case 'archive':
      chapter('margin:46px 0 24px;padding:0 0 17px;border-bottom:1px solid ' + c.line + ';',
        number(12,'display:inline-block;margin:0 0 13px;padding:4px 17px 4px 10px;border:1px solid ' + c.line + ';border-bottom:0;border-radius:5px 14px 0 0;background:' + c.surface + ';font-family:Consolas,monospace;line-height:1.7;'),title(23,'font-weight:600;'));
      styles.articleTitle += 'font-size:28px;padding-bottom:18px;border-bottom:1px solid ' + c.heading + ';';
      styles.lead = 'margin:0 0 35px;padding:0 0 0 16px;border-left:3px double ' + c.line + ';';
      panels('margin:28px 0;padding:16px 0;border-top:1px solid ' + c.line + ';');
      styles.note += 'padding-left:17px;border-left:1px solid ' + c.line + ';border-top:0;';
      styles.card = frame('18px 20px','1px solid ' + c.line,c.surface,2);
      styles.summary += 'border-top:2px solid ' + c.accent + ';';
      styles.componentLabel = label + 'font-family:Consolas,"Microsoft YaHei",monospace;font-size:11px;color:' + c.strong + ';';
      styles.quote = 'margin:29px 0;padding:14px 0 14px 18px;border-left:3px double ' + c.line + ';';
      styles.stepBadge += 'border-radius:2px;background:transparent;border-color:' + c.line + ';font-family:Consolas,monospace;';
      styles.faqRow = 'margin:0 0 20px;padding:0 0 18px;border-bottom:1px dotted ' + c.line + ';';
      ruledTables('transparent');
      styles.th += 'border-top-style:double;border-top-width:3px;';
      break;
    case 'lecture':
      chapter('margin:45px 0 25px;padding:0;',
        number(56,'font-family:Arial,sans-serif;font-weight:300;color:#8d8f88;'),title(23,'padding:0 0 11px;border-bottom:3px solid ' + c.heading + ';'),'width:89px;padding-right:17px;');
      styles.articleTitle += 'font-size:30px;letter-spacing:-0.4px;';
      styles.lead = 'margin:0 0 35px;padding:0 0 20px;border-bottom:1px solid ' + c.line + ';';
      panels('margin:29px 0;padding:17px 0 17px 17px;border-left:1px solid ' + c.line + ';');
      styles.summary = frame('21px','0',c.surface) + 'border-top:2px solid ' + c.heading + ';';
      styles.card = frame('20px','1px solid ' + c.line,'#fff');
      styles.componentLabel = label + 'color:' + c.heading + ';font-size:11px;letter-spacing:1.2px;';
      styles.quote = 'margin:30px 0;padding:5px 0 5px 21px;border-left:3px solid ' + c.heading + ';';
      styles.pullquote += 'padding:23px 0;text-align:left;border-bottom:1px solid ' + c.line + ';';
      styles.stepBadge += 'border-radius:0;background:transparent;border:1px solid ' + c.heading + ';font-family:Consolas,monospace;';
      styles.stepBody += 'border-bottom-style:dotted;';
      ruledTables('transparent');
      styles.th += 'border-top:2px solid ' + c.heading + ';';
      break;
    case 'amber':
      chapter('margin:49px 0 25px;padding:0;',
        number(30,'text-align:right;font-weight:400;'),title(24,'font-weight:600;'),'width:73px;padding-left:15px;border-left:2px solid ' + c.accent + ';');
      styles.sectionTitleCell += 'padding-right:17px;';
      styles.articleTitle += 'font-size:31px;font-weight:600;';
      styles.lead = 'margin:0 0 36px;padding:19px 0;border-top:1px solid ' + c.line + ';border-bottom:3px double ' + c.line + ';';
      panels('margin:30px 0;padding:18px 0;border-bottom:1px solid ' + c.line + ';');
      styles.note = frame('18px 21px','0',c.surface) + 'border-left:1px solid ' + c.accent + ';';
      styles.summary = frame('20px','0',c.surface) + 'border-top:1px solid ' + c.accent + ';';
      styles.card = frame('20px','1px solid ' + c.line,'#fff',2);
      styles.quote = 'margin:31px 0;padding:19px 0;border-top:1px solid ' + c.accent + ';border-bottom:1px solid ' + c.line + ';';
      styles.componentLabel = label + 'display:inline-block;padding:0 0 5px;border-bottom:2px solid ' + c.accent + ';color:' + c.strong + ';';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-family:Georgia,serif;font-size:23px;font-weight:400;';
      styles.factValue += 'font-family:Georgia,serif;font-size:33px;';
      ruledTables('transparent');
      break;
    case 'letterpress':
      chapter('margin:53px 0 29px;padding:0;text-align:center;',
        number(13,'margin:0 0 12px;text-align:center;letter-spacing:2px;'),title(25,'text-align:center;font-weight:400;letter-spacing:1.5px;'));
      styles.sectionOrnament = 'width:15px;margin:17px auto 0;height:0;border:0;border-top:1px solid ' + c.accent + ';';
      styles.articleTitle += 'font-size:31px;font-weight:400;line-height:1.65;';
      styles.paragraph += 'text-indent:2em;';
      styles.lead = 'margin:0 0 38px;padding:0 0 21px;border-bottom:1px solid ' + c.line + ';';
      styles.leadParagraph += 'font-size:17px;line-height:2.16;';
      panels('margin:31px 0;padding:16px 0 16px 18px;border-left:1px solid ' + c.line + ';');
      styles.summary = 'margin:32px 0;padding:20px 0;border-top:3px double ' + c.line + ';border-bottom:1px solid ' + c.line + ';';
      styles.card = frame('20px','1px solid ' + c.line,'#fff');
      styles.quote = 'margin:31px 0;padding:5px 14px 5px 22px;border-left:1px solid ' + c.accent + ';';
      styles.pullquote = 'margin:39px 0;padding:21px 10px;text-align:center;border:0;';
      styles.componentLabel = label + 'font-weight:400;font-size:11px;letter-spacing:2px;color:' + c.muted + ';';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-family:Georgia,serif;font-size:22px;font-weight:400;';
      ruledTables('transparent');
      styles.th += 'font-weight:400;';
      break;
    case 'poetry':
      chapter('margin:57px 0 30px;padding:0;',
        number(12,'margin:13px 0 0;font-family:' + t.headingFont + ';color:' + c.muted + ';letter-spacing:2px;'),title(27,'font-weight:400;letter-spacing:1px;'));
      styles.articleTitle += 'font-size:32px;font-weight:400;line-height:1.75;';
      styles.lead = 'margin:0 0 43px;padding:0;';
      styles.leadParagraph += 'font-size:17px;line-height:2.2;color:' + c.text + ';';
      panels('margin:32px 0;padding:12px 0 12px 15px;border-left:1px solid ' + c.line + ';');
      styles.summary = 'margin:36px 0;padding:20px 0;border-top:1px solid ' + c.line + ';';
      styles.card = frame('20px 22px','0',c.surface,2);
      styles.componentLabel = label + 'font-weight:400;letter-spacing:2px;color:' + c.muted + ';';
      styles.quote = 'margin:35px 0;padding:9px 16px;border:0;background:transparent;';
      styles.quoteCredit += 'text-align:left;padding-left:14px;';
      styles.pullquote = 'margin:43px 0;padding:12px 0;text-align:left;border:0;';
      styles.quoteMark += 'font-size:32px;color:' + c.line + ';';
      styles.quoteMarkEnd += 'font-size:32px;color:' + c.line + ';';
      styles.takeawayParagraph += 'font-size:22px;font-weight:400;line-height:2.1;';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-size:14px;font-weight:400;color:' + c.muted + ';';
      ruledTables('transparent');
      styles.th += 'font-weight:400;border-top:0;';
      break;
    case 'bookmark':
      chapter('margin:47px 0 24px;padding:0;',
        number(21,'padding:12px 0 19px;background:' + c.accent + ';color:#fff;text-align:center;border-radius:0 0 18px 0;font-family:Arial,sans-serif;'),title(23,'font-weight:600;'),'width:61px;padding-right:16px;');
      styles.articleTitle += 'font-size:29px;';
      styles.lead = 'margin:0 0 36px;padding:0 0 0 17px;border-left:1px solid ' + c.line + ';';
      panels(frame('18px 20px','0',c.surface,0) + 'border-left:3px solid ' + c.line + ';');
      styles.card = frame('20px','1px solid ' + c.line,'#fff',0);
      styles.summary += 'border-left-color:' + c.accent + ';';
      styles.componentLabel = label + 'color:' + c.strong + ';font-size:12px;';
      styles.quote = 'margin:30px 0;padding:7px 0 7px 18px;border-left:3px double ' + c.accent + ';';
      styles.pullquote += 'padding:24px 18px;background:' + c.surface + ';border-radius:0 18px 0 18px;';
      styles.stepBadge += 'border-radius:0 0 9px 0;background:' + c.surface + ';border:0;';
      styles.stepBody += 'border-bottom-style:dotted;';
      ruledTables('transparent');
      styles.th += 'border-top:2px solid ' + c.line + ';';
      break;
    case 'salt':
      chapter('margin:48px 0 25px;padding:14px 0;border-top:1px solid ' + c.line + ';border-bottom:2px solid ' + c.line + ';',
        number(17,'font-family:Arial,sans-serif;text-align:right;color:' + c.muted + ';'),title(23,'font-weight:500;'),'width:54px;padding-left:16px;');
      styles.articleTitle += 'font-size:29px;font-weight:500;';
      styles.lead = 'margin:0 0 37px;padding:0 0 21px;border-bottom:1px solid ' + c.line + ';';
      panels(frame('19px 21px','0',c.surface,0) + 'border-radius:0 0 13px 13px;');
      styles.card = frame('20px','1px solid ' + c.line,'#fff',12);
      styles.summary += 'border-top:1px solid ' + c.accent + ';';
      styles.componentLabel = label + 'font-weight:500;color:' + c.strong + ';letter-spacing:1.1px;';
      styles.quote = 'margin:31px 0;padding:8px 0 8px 20px;border-left:1px solid ' + c.accent + ';border-radius:18px 0 0 18px;';
      styles.pullquote += 'padding:23px 20px;background:' + c.surface + ';border-radius:18px;text-align:left;';
      styles.stepBadge += 'background:#fff;border:1px solid ' + c.line + ';color:' + c.strong + ';font-weight:400;';
      styles.faqRow = 'margin:0 0 23px;padding:0 0 17px;border-bottom:1px solid ' + c.line + ';';
      ruledTables('transparent');
      styles.th += 'border-top:0;';
      break;
    case 'salon':
      chapter('margin:52px 0 28px;padding:0;text-align:center;',
        number(12,'display:inline-block;margin:0 0 14px;padding:3px 19px;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';letter-spacing:2px;line-height:1.8;'),title(25,'text-align:center;font-weight:400;letter-spacing:1px;'));
      styles.articleTitle += 'font-size:31px;text-align:center;font-weight:400;';
      styles.lead = frame('20px 22px','0',c.surface,16) + 'margin-top:0;border-radius:32px 32px 5px 5px;';
      panels('margin:30px 0;padding:17px 0;border-bottom:1px solid ' + c.line + ';');
      styles.summary = frame('20px 22px','1px solid ' + c.line,c.surface,16);
      styles.card = frame('21px','1px solid ' + c.line,'#fff',14);
      styles.componentLabel = label + 'display:inline-block;padding:2px 11px;border:1px solid ' + c.line + ';border-radius:12px;color:' + c.strong + ';font-weight:400;font-size:11px;';
      styles.quote = 'margin:31px 0;padding:8px 0 8px 20px;border-left:1px solid ' + c.accent + ';border-radius:25px 0 0 25px;';
      styles.pullquote += 'padding:24px 16px;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';border-radius:24px;';
      styles.takeawayParagraph += 'font-weight:400;font-size:20px;';
      styles.stepBadge += 'background:transparent;border:1px solid ' + c.line + ';font-family:Georgia,serif;font-weight:400;';
      ruledTables(c.surface);
      styles.th += 'font-weight:400;';
      break;
    case 'terracotta':
      chapter('margin:49px 0 25px;padding:0;',
        number(17,'padding:11px 0;background:' + c.accent + ';color:#fff;text-align:center;font-family:Arial,sans-serif;border-radius:14px 14px 3px 3px;'),title(24,'font-weight:600;'),'width:61px;padding-right:17px;');
      styles.articleTitle += 'font-size:30px;font-weight:600;';
      styles.lead = 'margin:0 0 38px;padding:0 0 23px;border-bottom:3px double ' + c.line + ';';
      panels('margin:30px 0;padding:17px 0;border-bottom:1px solid ' + c.line + ';');
      styles.note = frame('20px 22px','0',c.surface,0) + 'border-radius:3px 20px 20px 3px;';
      styles.summary = frame('21px 22px','0',c.surface,0) + 'border-radius:20px 20px 4px 4px;border-bottom:2px solid ' + c.line + ';';
      styles.card = frame('21px','1px solid ' + c.line,'#fff',10);
      styles.quote = 'margin:32px 0;padding:20px 22px;border:0;background:' + c.surface + ';border-radius:22px 4px 22px 4px;';
      styles.componentLabel = label + 'font-weight:600;color:' + c.strong + ';letter-spacing:0.4px;';
      styles.stepBadge += 'border:0;border-radius:10px 10px 2px 2px;background:' + c.surface + ';font-family:Georgia,serif;font-weight:400;';
      styles.factValue += 'font-family:Georgia,serif;font-size:31px;';
      ruledTables('transparent');
      styles.th += 'border-top:0;border-bottom:2px solid ' + c.line + ';';
      break;
    case 'film':
      chapter('margin:46px 0 24px;padding:16px 0;border-top:3px solid ' + c.heading + ';border-bottom:1px solid ' + c.line + ';',
        number(18,'padding:11px 0;text-align:center;background:' + c.heading + ';color:#fff;font-family:Consolas,monospace;letter-spacing:1px;'),title(22,'font-weight:600;'),'width:70px;padding-right:17px;');
      styles.articleTitle += 'font-size:30px;letter-spacing:-0.4px;';
      styles.lead = 'margin:0 0 35px;padding:0 0 19px;border-bottom:1px solid ' + c.line + ';';
      panels('margin:28px 0;padding:18px 0;border-bottom:1px solid ' + c.line + ';');
      styles.summary = frame('20px','0',c.surface) + 'border-top:3px solid ' + c.heading + ';';
      styles.card = frame('20px','1px solid ' + c.line,'#fff',0);
      styles.quote = 'margin:30px 0;padding:17px 19px;border:1px solid ' + c.line + ';border-top:0;border-bottom:0;';
      styles.pullquote += 'border-top:2px solid ' + c.heading + ';border-bottom:2px solid ' + c.heading + ';text-align:left;';
      styles.componentLabel = label + 'font-family:Consolas,"Microsoft YaHei",monospace;font-size:10px;letter-spacing:1.7px;color:' + c.muted + ';';
      styles.caption += 'text-align:left;font-family:Consolas,"Microsoft YaHei",monospace;letter-spacing:0.5px;';
      styles.stepBadge += 'border-radius:0;background:' + c.heading + ';color:#fff;border:0;font-family:Consolas,monospace;';
      ruledTables('transparent');
      styles.codeBlock += 'border-radius:0;';
      break;
    case 'radio':
      chapter('margin:48px 0 25px;padding:0 0 18px;border-bottom:3px double ' + c.line + ';',
        number(14,'width:39px;height:39px;line-height:37px;text-align:center;border:1px solid ' + c.accent + ';border-radius:50%;font-family:Arial,sans-serif;'),title(23,'font-weight:600;'),'width:56px;padding-left:17px;');
      styles.articleTitle += 'font-size:30px;';
      styles.lead = 'margin:0 0 36px;padding:0 0 0 18px;border-left:2px solid ' + c.line + ';';
      panels('margin:30px 0;padding:18px 0;border-bottom:1px dashed ' + c.line + ';');
      styles.note = frame('19px 21px','0',c.surface,8);
      styles.summary = frame('20px 21px','0',c.surface,8) + 'border-top:3px double ' + c.accent + ';';
      styles.card = frame('20px','1px solid ' + c.line,'#fff',8);
      styles.componentLabel = label + 'display:inline-block;padding:3px 10px;background:' + c.strong + ';color:#fff7eb;border-radius:3px;font-size:11px;';
      styles.quote = 'margin:31px 0;padding:7px 0 7px 20px;border-left:1px solid ' + c.accent + ';';
      styles.pullquote += 'text-align:left;padding-left:0;padding-right:0;';
      styles.stepBadge += 'background:transparent;border:1px solid ' + c.accent + ';font-weight:400;';
      styles.faqRow = 'margin:0 0 23px;padding:0 0 18px;border-bottom:1px dashed ' + c.line + ';';
      ruledTables(c.surface);
      break;
    case 'stage':
      chapter('margin:54px 0 29px;padding:17px 0;text-align:center;border-top:1px solid ' + c.line + ';',
        number(14,'margin:0 0 13px;text-align:center;letter-spacing:3px;'),title(26,'text-align:center;font-weight:400;letter-spacing:1px;'));
      styles.sectionOrnament = 'width:28px;height:0;border:0;border-top:1px solid ' + c.accent + ';margin:18px auto 0;';
      styles.articleTitle += 'font-size:32px;text-align:center;font-weight:400;line-height:1.65;';
      styles.lead = 'margin:0 0 39px;padding:18px 0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';';
      panels('margin:31px 0;padding:18px 0;border-bottom:1px solid ' + c.line + ';');
      darkPaper('#231b1e');
      styles.card = frame('20px','1px solid ' + c.line,c.surface,0);
      styles.summary = frame('21px','0',c.surface,0) + 'border-top:1px solid ' + c.accent + ';';
      styles.componentLabel = label + 'color:' + c.accent + ';font-weight:400;letter-spacing:2px;';
      styles.quote = 'margin:33px 0;padding:8px 0 8px 21px;border-left:1px solid ' + c.accent + ';';
      styles.pullquote = 'margin:40px 0;padding:24px 16px;text-align:center;border:1px solid ' + c.line + ';';
      styles.takeawayParagraph += 'font-weight:400;font-size:21px;';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;color:' + c.accent + ';font-family:Georgia,serif;font-size:21px;font-weight:400;';
      ruledTables('transparent');
      styles.th += 'font-weight:400;';
      break;
    case 'race':
      chapter('margin:43px 0 23px;padding:0 0 13px;border-bottom:4px solid ' + c.heading + ';',
        number(32,'font-family:Arial,sans-serif;font-weight:700;letter-spacing:-1px;'),title(23,'letter-spacing:-0.3px;'),'width:66px;padding-right:15px;');
      styles.articleTitle += 'font-size:30px;font-weight:700;letter-spacing:-0.5px;';
      styles.lead = 'margin:0 0 34px;padding:0 0 0 15px;border-left:3px solid ' + c.accent + ';';
      panels('margin:27px 0;padding:16px 0;border-bottom:1px solid ' + c.line + ';');
      styles.summary = frame('19px 20px','0',c.surface) + 'border-top:3px solid ' + c.accent + ';';
      styles.card = frame('19px','1px solid ' + c.line,'#fff',2);
      styles.componentLabel = label + 'display:inline-block;padding:2px 8px;background:' + c.accent + ';color:#fff;font-size:11px;letter-spacing:0.2px;';
      styles.quote = 'margin:28px 0;padding:5px 0 5px 18px;border-left:3px solid ' + c.line + ';';
      styles.factRow += 'padding:14px 0;border-bottom:1px solid ' + c.line + ';';
      styles.factValue += 'font-family:Arial,sans-serif;font-size:33px;font-weight:700;';
      styles.stepBadge += 'border-radius:3px;background:' + c.heading + ';color:#fff;border:0;font-family:Arial,sans-serif;';
      styles.stepBody += 'border-bottom:2px solid ' + c.line + ';';
      ruledTables('transparent');
      styles.th += 'border-top:3px solid ' + c.heading + ';';
      break;
    case 'invitation':
      chapter('margin:55px 0 29px;padding:0;text-align:center;',
        number(12,'display:inline-block;margin:0 0 16px;padding:7px 26px;border-top:1px solid ' + c.accent + ';border-bottom:1px solid ' + c.accent + ';line-height:1.5;letter-spacing:2px;'),title(25,'text-align:center;font-weight:400;letter-spacing:1.5px;'));
      styles.articleTitle += 'font-size:31px;text-align:center;font-weight:400;line-height:1.7;letter-spacing:1px;';
      styles.lead = 'margin:0 0 40px;padding:0 0 22px;border-bottom:1px solid ' + c.line + ';';
      panels('margin:31px 0;padding:18px 0;border-top:1px solid ' + c.line + ';');
      darkPaper('#1c1e1b');
      styles.summary = frame('22px','1px solid ' + c.line,c.surface,0);
      styles.card = 'margin:32px 0;padding:18px 0;border-top:1px solid ' + c.accent + ';border-bottom:1px solid ' + c.line + ';';
      styles.componentLabel = label + 'color:' + c.accent + ';font-weight:400;font-size:11px;letter-spacing:2px;';
      styles.quote = 'margin:33px 0;padding:7px 0 7px 21px;border-left:1px solid ' + c.line + ';';
      styles.pullquote += 'padding:25px 12px;border-top:1px solid ' + c.accent + ';border-bottom:1px solid ' + c.accent + ';';
      styles.takeawayParagraph += 'font-weight:400;font-size:20px;';
      styles.stepBadge += 'background:transparent;border:1px solid ' + c.line + ';color:' + c.accent + ';border-radius:0;font-family:Georgia,serif;font-weight:400;';
      ruledTables('transparent');
      styles.th += 'border-top-color:' + c.accent + ';font-weight:400;';
      break;
    case 'dialogue':
      chapter('margin:47px 0 24px;padding:0 0 16px;border-bottom:1px solid ' + c.line + ';',
        number(28,'font-family:Arial,sans-serif;font-weight:400;'),title(24,'font-weight:600;'),'width:63px;padding-right:17px;border-right:1px solid ' + c.line + ';');
      styles.sectionTitleCell += 'padding-left:17px;';
      styles.articleTitle += 'font-size:30px;font-weight:600;';
      styles.lead = 'margin:0 0 35px;padding:0 0 20px;border-bottom:2px solid ' + c.strong + ';';
      panels('margin:29px 0;padding:18px 0;border-bottom:1px solid ' + c.line + ';');
      styles.note = frame('18px 20px','0',c.surface) + 'border-left:2px solid ' + c.accent + ';';
      styles.summary = frame('20px','0',c.surface) + 'border-right:2px solid ' + c.strong + ';';
      styles.card = frame('20px','1px solid ' + c.line,'#fff',3);
      styles.quote = 'margin:30px 0;padding:5px 0 5px 18px;border-left:2px solid ' + c.accent + ';';
      styles.pullquote += 'text-align:left;border-right:2px solid ' + c.strong + ';';
      styles.componentLabel = label + 'color:' + c.strong + ';font-size:11px;';
      styles.faqRow = 'margin:0 0 24px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';';
      styles.faqQuestion += 'padding-left:11px;border-left:2px solid ' + c.accent + ';';
      styles.faqAnswer += 'padding-left:11px;border-left:1px solid ' + c.line + ';';
      styles.stepBadge += 'border-radius:0;background:transparent;border:0;border-left:2px solid ' + c.strong + ';';
      ruledTables('transparent',c.strong);
      break;
    case 'clauses':
      chapter('margin:46px 0 25px;padding:18px 0 0;border-top:1px solid ' + c.heading + ';',
        number(12,'margin:0 0 10px;font-family:Consolas,"Microsoft YaHei",monospace;line-height:1.8;letter-spacing:1px;color:' + c.muted + ';'),title(23,'font-weight:600;'));
      styles.articleTitle += 'font-size:28px;padding-bottom:20px;border-bottom:2px solid ' + c.heading + ';';
      styles.lead = 'margin:0 0 36px;padding:0;';
      styles.leadParagraph += 'font-size:16px;';
      panels('margin:29px 0;padding:17px 18px;border-left:1px solid ' + c.line + ';border-right:1px solid ' + c.line + ';');
      styles.summary = frame('20px','0',c.surface) + 'border-top:1px solid ' + c.heading + ';';
      styles.card = frame('20px','1px solid ' + c.line,'#fff');
      styles.componentLabel = label + 'font-size:11px;letter-spacing:1px;color:' + c.strong + ';';
      styles.quote = 'margin:29px 0;padding:6px 0 6px 18px;border-left:3px double ' + c.line + ';';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-family:Consolas,monospace;font-size:16px;font-weight:400;';
      styles.stepIndex += 'border-right:1px solid ' + c.line + ';';
      styles.stepBody += 'padding-left:16px;';
      styles.faqRow = 'margin:0 0 23px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';';
      ruledTables('transparent');
      styles.th += 'border-top:2px solid ' + c.heading + ';font-size:12px;';
      break;
    case 'chalk':
      chapter('margin:49px 0 26px;padding:0 0 15px;border-bottom:3px double ' + c.line + ';',
        number(25,'font-family:' + t.headingFont + ';text-align:center;'),title(26,'font-weight:400;'),'width:54px;padding-right:15px;');
      styles.articleTitle += 'font-size:32px;font-family:' + t.headingFont + ';font-weight:400;';
      styles.lead = 'margin:0 0 37px;padding:0 0 0 18px;border-left:1px dashed ' + c.line + ';';
      panels('margin:30px 0;padding:17px 0;border-bottom:1px dashed ' + c.line + ';');
      darkPaper('#1e352b');
      styles.note = frame('19px 21px','0',c.surface) + 'border-left:1px solid ' + c.accent + ';';
      styles.summary = 'margin:32px 0;padding:20px 0;border-top:3px double ' + c.accent + ';border-bottom:1px solid ' + c.line + ';';
      styles.card = frame('21px','1px solid ' + c.line,c.surface,2);
      styles.componentLabel = label + 'display:inline-block;padding:1px 8px;border-bottom:1px solid ' + c.accent + ';color:' + c.accent + ';font-family:' + t.headingFont + ';font-size:14px;font-weight:400;';
      styles.quote = 'margin:31px 0;padding:7px 0 7px 20px;border-left:2px solid ' + c.line + ';';
      styles.pullquote += 'text-align:left;padding:21px 0;';
      styles.takeawayParagraph += 'font-family:' + t.headingFont + ';font-size:22px;font-weight:400;';
      styles.stepBadge += 'background:transparent;border:1px solid ' + c.accent + ';color:' + c.accent + ';border-radius:2px;font-family:' + t.headingFont + ';font-size:16px;font-weight:400;';
      ruledTables('transparent');
      styles.th += 'border-top:3px double ' + c.line + ';';
      break;
    case 'menu':
      chapter('margin:52px 0 27px;padding:17px 0;text-align:center;border-top:3px double ' + c.line + ';border-bottom:3px double ' + c.line + ';',
        number(12,'margin:0 0 9px;text-align:center;letter-spacing:2px;'),title(24,'text-align:center;font-weight:400;letter-spacing:1.5px;'));
      styles.articleTitle += 'font-size:30px;text-align:center;font-weight:400;';
      styles.lead = 'margin:0 0 38px;padding:0 0 23px;border-bottom:1px solid ' + c.line + ';';
      panels('margin:31px 0;padding:17px 0;border-bottom:1px dotted ' + c.line + ';');
      styles.note = frame('19px 22px','0',c.surface,0);
      styles.summary = frame('21px 22px','0',c.surface) + 'border-top:3px double ' + c.accent + ';';
      styles.card = frame('21px','1px solid ' + c.line,'#fff');
      styles.componentLabel = label + 'font-weight:400;font-size:11px;letter-spacing:1.5px;color:' + c.strong + ';';
      styles.quote = 'margin:31px 0;padding:7px 0 7px 20px;border-left:1px solid ' + c.line + ';';
      styles.facts = 'margin:31px 0;padding:0;border-top:1px solid ' + c.line + ';';
      styles.factRow += 'padding:14px 0;border-bottom:1px dotted ' + c.line + ';';
      styles.factValue += 'font-family:Georgia,serif;font-size:30px;font-weight:400;';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-family:Georgia,serif;font-size:22px;font-weight:400;';
      styles.stepBody += 'border-bottom-style:dotted;';
      ruledTables('transparent');
      styles.th += 'border-top:3px double ' + c.line + ';font-weight:400;';
      break;
    case 'curatorial':
      chapter('margin:47px 0 25px;padding:0 0 17px;border-bottom:1px solid ' + c.line + ';',
        number(26,'font-family:Arial,sans-serif;font-weight:300;text-align:right;color:' + c.muted + ';'),title(23,'font-weight:500;'),'width:61px;padding-left:17px;border-left:1px solid ' + c.line + ';');
      styles.sectionTitleCell += 'padding-right:17px;';
      styles.sectionOrnament = 'width:31px;height:0;border:0;border-top:2px solid ' + c.accent + ';margin:13px 0 0;';
      styles.articleTitle += 'font-size:29px;font-weight:500;line-height:1.7;';
      styles.lead = 'margin:0 0 37px;padding:0;';
      panels('margin:30px 0;padding:16px 0;border-bottom:1px solid ' + c.line + ';');
      styles.card = 'margin:31px 0;padding:5px 0 5px 20px;border-left:1px solid ' + c.accent + ';';
      styles.summary = frame('20px 22px','0',c.surface,5);
      styles.componentLabel = label + 'font-size:10px;font-weight:400;letter-spacing:1.6px;color:' + c.muted + ';';
      styles.quote = 'margin:31px 0;padding:6px 0 6px 20px;border-left:1px solid ' + c.line + ';';
      styles.pullquote += 'text-align:left;padding-left:0;padding-right:0;';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-family:Arial,sans-serif;font-size:18px;font-weight:300;';
      ruledTables('transparent');
      styles.th += 'font-weight:400;border-top:0;';
      break;
    case 'brief':
      chapter('margin:42px 0 23px;padding:0 0 14px;border-bottom:2px solid ' + c.heading + ';',
        number(20,'font-family:Arial,sans-serif;font-weight:700;text-align:left;'),title(22,'font-weight:700;'),'width:48px;padding-right:13px;');
      styles.articleTitle += 'font-size:29px;padding-bottom:18px;border-bottom:4px solid ' + c.accent + ';';
      styles.lead = frame('17px 19px','0',c.surface) + 'margin-top:0;border-bottom:1px solid ' + c.line + ';';
      panels('margin:27px 0;padding:15px 0;border-bottom:1px solid ' + c.line + ';');
      styles.summary = frame('18px 20px','0',c.surface) + 'border-left:2px solid ' + c.accent + ';';
      styles.card = frame('19px','1px solid ' + c.line,'#fff',2);
      styles.componentLabel = label + 'font-size:10px;letter-spacing:0.9px;color:' + c.strong + ';';
      styles.quote = 'margin:27px 0;padding:5px 0 5px 16px;border-left:2px solid ' + c.line + ';';
      styles.facts = 'margin:28px 0;padding:0;border-top:2px solid ' + c.heading + ';';
      styles.factRow += 'padding:13px 0;border-bottom:1px solid ' + c.line + ';';
      styles.factValue += 'font-family:Arial,sans-serif;font-size:28px;';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-family:Arial,sans-serif;font-size:15px;color:' + c.accent + ';';
      styles.faqRow = 'margin:0 0 19px;padding:0 0 16px;border-bottom:1px solid ' + c.line + ';';
      ruledTables('transparent');
      styles.th += 'border-top:2px solid ' + c.heading + ';font-size:12px;';
      break;
    case 'annotation':
      chapter('margin:51px 0 27px;padding:16px 0;border-top:3px double ' + c.line + ';',
        number(13,'font-family:' + t.headingFont + ';line-height:1.8;text-align:center;letter-spacing:1px;'),title(26,'font-weight:400;'),'width:72px;padding-left:16px;border-left:1px solid ' + c.line + ';');
      styles.sectionTitleCell += 'padding-right:17px;';
      styles.articleTitle += 'font-size:32px;font-weight:400;text-align:center;';
      styles.lead = 'margin:0 0 39px;padding:0 0 21px;border-bottom:1px solid ' + c.line + ';';
      styles.paragraph += 'text-indent:2em;';
      panels('margin:31px 0;padding:16px 0;border-bottom:1px solid ' + c.line + ';');
      styles.note = frame('18px 21px','0',c.surface) + 'border-left:1px solid ' + c.accent + ';';
      styles.summary = 'margin:33px 0;padding:20px 0;border-top:3px double ' + c.accent + ';';
      styles.card = frame('21px','1px solid ' + c.line,c.surface);
      styles.quote = 'margin:33px 0;padding:8px 18px;border:0;';
      styles.componentLabel = label + 'font-family:' + t.headingFont + ';font-size:14px;font-weight:400;letter-spacing:1.5px;color:' + c.strong + ';';
      styles.pullquote += 'padding:23px 0;border-top:1px solid ' + c.line + ';text-align:left;';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-family:' + t.headingFont + ';font-size:18px;font-weight:400;';
      ruledTables('transparent');
      styles.th += 'font-weight:400;border-top:3px double ' + c.line + ';';
      break;
    case 'brackets':
      chapter('margin:53px 0 28px;padding:0;',
        number(12,'margin:0 0 14px;font-family:Consolas,monospace;letter-spacing:1px;line-height:1.8;color:' + c.muted + ';'),title(25,'font-weight:400;letter-spacing:0.1px;'));
      styles.articleTitle += 'font-size:30px;font-weight:400;line-height:1.7;';
      styles.lead = 'margin:0 0 40px;padding:0;';
      styles.leadParagraph += 'font-size:17px;font-weight:400;color:' + c.text + ';';
      panels('margin:31px 0;padding:17px 0;border-bottom:1px solid ' + c.line + ';');
      styles.summary = 'margin:35px 0;padding:20px 0;border-top:1px solid ' + c.accent + ';';
      styles.card = frame('21px','1px solid ' + c.line,'#fff');
      styles.note += 'padding-left:17px;border-left:1px solid ' + c.line + ';border-bottom:0;';
      styles.componentLabel = label + 'font-weight:400;font-size:11px;letter-spacing:0.7px;color:' + c.muted + ';';
      styles.quote = 'margin:32px 0;padding:7px 0 7px 19px;border-left:1px solid ' + c.line + ';';
      styles.pullquote = 'margin:40px 0;padding:20px 0;text-align:left;border-bottom:1px solid ' + c.line + ';';
      styles.takeawayParagraph += 'font-size:21px;font-weight:400;';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-family:Consolas,monospace;font-size:14px;font-weight:400;';
      ruledTables('transparent');
      styles.th += 'border-top:0;font-weight:400;';
      break;
    case 'collage':
      chapter('margin:47px 0 25px;padding:0 0 16px;border-bottom:1px solid ' + c.line + ';',
        number(23,'padding:14px 0;text-align:center;background:' + c.surface + ';border-left:4px solid ' + c.accent + ';border-bottom:4px solid ' + c.heading + ';border-radius:18px 0 0 0;font-family:Arial,sans-serif;font-weight:600;'),title(24,'font-weight:600;'),'width:72px;padding-right:18px;');
      styles.articleTitle += 'font-size:30px;font-weight:600;';
      styles.lead = frame('18px 20px','0',c.surface) + 'margin-top:0;border-radius:0 18px 0 0;border-left:2px solid ' + c.accent + ';';
      panels('margin:29px 0;padding:18px 0;border-bottom:1px solid ' + c.line + ';');
      styles.summary = frame('21px','0',c.surface) + 'border-radius:0 20px 0 0;border-bottom:2px solid ' + c.heading + ';';
      styles.card = frame('21px','1px solid ' + c.line,'#fff') + 'border-radius:0 18px 0 0;';
      styles.note += 'border-left:2px solid ' + c.accent + ';padding-left:18px;border-bottom:0;';
      styles.componentLabel = label + 'display:inline-block;padding:2px 9px;background:' + c.surface + ';border-left:2px solid ' + c.accent + ';font-size:11px;color:' + c.strong + ';';
      styles.quote = 'margin:30px 0;padding:7px 0 7px 20px;border-left:2px solid ' + c.accent + ';';
      styles.pullquote += 'text-align:left;border-top:2px solid ' + c.line + ';';
      styles.stepBadge += 'border:0;border-radius:8px 0 0 0;background:' + c.surface + ';border-bottom:2px solid ' + c.heading + ';';
      ruledTables('transparent');
      styles.th += 'border-top:2px solid ' + c.accent + ';';
      break;
    case 'nautical':
      chapter('margin:49px 0 26px;padding:16px 0;border-top:1px solid ' + c.line + ';border-bottom:3px double ' + c.accent + ';',
        number(16,'width:43px;height:43px;line-height:39px;text-align:center;border:3px double ' + c.accent + ';border-radius:50%;font-family:Arial,sans-serif;'),title(23,'font-weight:600;'),'width:62px;padding-right:19px;');
      styles.articleTitle += 'font-size:29px;font-family:' + t.headingFont + ';font-weight:600;';
      styles.lead = 'margin:0 0 37px;padding:0 0 0 18px;border-left:1px solid ' + c.line + ';';
      panels('margin:30px 0;padding:18px 0;border-bottom:1px dashed ' + c.line + ';');
      styles.note = frame('19px 21px','0',c.surface) + 'border-left:3px double ' + c.line + ';';
      styles.summary = frame('21px','0',c.surface) + 'border-top:3px double ' + c.accent + ';';
      styles.card = frame('21px','1px solid ' + c.line,'#fff',2);
      styles.componentLabel = label + 'font-family:Consolas,"Microsoft YaHei",monospace;font-size:11px;color:' + c.strong + ';letter-spacing:1.1px;';
      styles.quote = 'margin:31px 0;padding:7px 0 7px 21px;border-left:3px double ' + c.accent + ';';
      styles.pullquote += 'padding:24px 0;text-align:left;border-bottom:1px dashed ' + c.line + ';';
      styles.stepBadge += 'border:1px solid ' + c.accent + ';background:transparent;border-radius:50%;font-family:Arial,sans-serif;font-weight:400;';
      styles.stepBody += 'border-bottom-style:dashed;';
      ruledTables('transparent');
      styles.th += 'border-top:3px double ' + c.accent + ';';
      break;
    case 'apricot': {
      // 标题自身保留底色；细砂不用 Base64 图片，外层容器被清理后白字仍有橙底。
      const ribbonSurface = 'background-color:' + c.accent + ';background-image:' + [
        'linear-gradient(125deg,rgba(116,65,34,0.04) 1px,transparent 1px)',
        'linear-gradient(45deg,rgba(255,255,255,0.18) 0.8px,transparent 0.8px)',
        'linear-gradient(20deg,rgba(116,65,34,0.03) 1px,transparent 1px)',
        'linear-gradient(145deg,rgba(255,255,255,0.12) 0.8px,transparent 0.8px)'
      ].join(',') + ';background-size:2px 3px,3px 4px,5px 7px,7px 5px;background-position:0 0,1px 2px,2px 1px,4px 3px;background-repeat:repeat;border-radius:28px 23px 19px 14px / 25px 17px 23px 24px;';
      chapter('margin:43px 0 27px;text-align:center;',
        number(11,'margin:0 0 10px;font-family:Arial,sans-serif;letter-spacing:2px;color:' + c.muted + ';'),
        title(21,'padding:14px 22px;color:#fff;text-align:center;' + ribbonSurface));
      styles.sectionRibbon = 'display:inline-block;box-sizing:border-box;max-width:100%;min-width:56%;' + ribbonSurface;
      styles.paper = 'background:#fffbf4;--studio-paper-inset:8px;';
      styles.article += 'box-sizing:border-box;padding:10px;background:#fffbf4;';
      styles.articleTitle += 'font-size:28px;';
      styles.lead = 'margin:0 0 33px;padding:0;';
      panels(frame('20px 22px','0',c.surface,16));
      styles.card = frame('23px','4px solid ' + c.line,'#fff',20);
      styles.summary = frame('21px','3px solid ' + c.line,'#fff',18);
      styles.note = 'margin:28px 0;padding:14px 0 14px 17px;border-left:3px solid ' + c.accent + ';';
      styles.componentLabel = label + 'font-size:14px;color:' + c.strong + ';';
      styles.quote = 'margin:30px 0;padding:18px 20px;background:#fff;border-left:3px solid ' + c.line + ';border-radius:0 14px 14px 0;';
      styles.stepBadge += 'background:' + c.accent + ';border:0;color:#fff;border-radius:9px;';
      ruledTables('#fff4dc');
      break;
    }
    case 'service':
      chapter('margin:54px 0 28px;text-align:center;',
        number(24,'width:34px;height:34px;line-height:34px;background:#fff;border-radius:50%;font-family:Arial,sans-serif;font-weight:700;text-align:center;'),
        title(22,'margin-top:21px;text-align:center;color:' + c.accent + ';'));
      styles.sectionPill = 'display:inline-block;padding:4px 5px 4px 14px;border:2px solid #72c919;border-radius:30px;background:' + c.accent + ';vertical-align:middle;';
      styles.sectionPrefix = 'display:inline-block;margin-right:10px;font-family:Arial,sans-serif;font-size:19px;line-height:34px;font-weight:700;color:#fff;vertical-align:middle;';
      styles.sectionNumber += 'display:inline-block;vertical-align:middle;';
      styles.articleTitle += 'font-size:28px;color:' + c.accent + ';';
      styles.leadParagraph += 'color:' + c.text + ';';
      styles.paragraph += 'margin:28px 0;';
      panels(frame('18px 19px','0',c.surface,9));
      styles.note = 'margin:29px 0;padding:0 0 0 16px;border-left:3px solid #72c919;';
      styles.card = frame('20px','0','#e4f2fd',12) + 'background-image:linear-gradient(130deg,#e0f5ff,#b7dbf9);';
      styles.summary += 'border-top:3px solid #72c919;';
      styles.quote = 'margin:29px 0;padding:7px 0 7px 17px;border-left:3px solid ' + c.accent + ';';
      styles.stepBadge += 'background:' + c.accent + ';border:2px solid #72c919;color:#fff;line-height:25px;';
      styles.stepBody += 'border-bottom-style:dashed;';
      styles.componentLabel = label + 'font-size:13px;color:' + c.accent + ';';
      ruledTables('#e8f4ff');
      break;
    case 'sakura': {
      // 用错位的小尺寸渐变绘制细砂，复制后无需编辑器导入 Base64 背景图片。
      const grain = 'background-color:#f5f4f3;background-image:' + [
        'linear-gradient(125deg,rgba(78,60,87,0.04) 1px,transparent 1px)',
        'linear-gradient(45deg,rgba(255,255,255,0.1875) 0.8px,transparent 0.8px)',
        'linear-gradient(20deg,rgba(115,100,124,0.03) 1px,transparent 1px)',
        'linear-gradient(145deg,rgba(91,75,97,0.045) 0.8px,transparent 0.8px)',
        'linear-gradient(70deg,rgba(255,255,255,0.15) 1px,transparent 1px)',
        'linear-gradient(115deg,rgba(91,75,97,0.025) 1.2px,transparent 1.2px)'
      ].join(',') + ';background-size:2px 3px,3px 4px,5px 7px,7px 5px,4px 9px,11px 13px;background-position:0 0,1px 2px,2px 1px,4px 3px,1px 5px,6px 8px;background-repeat:repeat;';
      chapter('margin:44px 0 29px;text-align:center;',
        number(12,'margin:0 0 12px;font-family:Arial,sans-serif;color:' + c.strong + ';letter-spacing:3px;'),
        title(21,'padding:11px 21px;text-align:center;color:#29242c;'));
      styles.sectionRibbon = 'display:inline-block;box-sizing:border-box;max-width:100%;min-width:60%;border:1px solid #f5eaf5;border-radius:19px;background-color:#edddee;background-image:linear-gradient(#e2c8e6,#edddee);box-shadow:0 6px 0 #c689c8;';
      styles.paper = grain + '--studio-paper-inset:8px;';
      styles.article += 'box-sizing:border-box;padding:10px;' + grain;
      styles.articleTitle += 'font-size:28px;color:#29242c;';
      styles.lead = 'margin:0 0 32px;padding:0;';
      styles.leadParagraph += 'color:' + c.text + ';';
      panels(frame('20px 22px','0','rgba(255,255,255,0.8)',13));
      styles.note = 'margin:29px 0;padding:10px 0 10px 16px;border-left:2px solid ' + c.accent + ';';
      styles.summary = frame('21px','1px solid ' + c.line,'#f5e9f2',15);
      styles.card = frame('22px','1px solid #e4d9e6','#fff',14) + 'box-shadow:0 4px 0 #e5d5e6;';
      styles.componentLabel = label + 'font-size:13px;letter-spacing:0.5px;color:' + c.strong + ';';
      styles.quote = 'margin:31px 0;padding:9px 17px;border-left:2px solid #c689c8;background:rgba(255,255,255,0.65);';
      styles.stepBadge += 'background:#ecd7ed;color:#775179;border-color:#dbc0dc;';
      styles.highlight = 'padding:1px 3px;background:#f5dce8;color:#954368;';
      ruledTables('#f0e4f1');
      break;
    }
    case 'handdrawn':
      chapter('margin:43px 0 20px;text-align:center;',
        number(43,'margin:0 0 8px;font-family:Arial,sans-serif;font-style:italic;font-weight:700;text-align:center;color:#fff;-webkit-text-stroke:1.1px ' + c.accent + ';text-shadow:1px 1px 0 ' + c.accent + ';'),
        title(21,'text-align:center;color:' + c.accent + ';'));
      styles.sectionSketch = 'display:table;table-layout:fixed;width:100%;';
      styles.sectionSketchTitle = 'display:table-cell;vertical-align:middle;padding:0 7px;';
      styles.sectionSketchLeft = 'display:table-cell;width:35px;vertical-align:middle;text-align:center;transform:rotate(-8deg);';
      styles.sectionSketchRight = 'display:table-cell;width:35px;vertical-align:middle;text-align:center;transform:rotate(7deg);';
      styles.sketchBook = 'display:inline-block;width:32px;font-size:0;line-height:1;white-space:nowrap;';
      styles.sketchBookLeft = 'display:inline-block;box-sizing:border-box;width:16px;height:29px;padding-top:2px;border:1.3px solid ' + c.accent + ';border-radius:5px 2px 0 2px;background:#dbeefa;color:' + c.accent + ';font-family:Arial,sans-serif;font-size:18px;line-height:22px;';
      styles.sketchBookRight = styles.sketchBookLeft + 'border-radius:2px 5px 2px 0;';
      styles.sketchLaptop = 'display:inline-block;width:32px;';
      styles.sketchScreen = 'display:block;box-sizing:border-box;width:28px;height:23px;margin:0 auto;border:1.3px solid ' + c.accent + ';border-radius:2px;background:#cae8fc;color:#fff;text-align:left;font-family:Arial,sans-serif;font-size:17px;line-height:19px;';
      styles.sketchKeyboard = 'display:block;box-sizing:border-box;width:32px;height:7px;border:1.3px solid ' + c.accent + ';background:#e2f1fb;color:' + c.accent + ';font-family:Arial,sans-serif;font-size:8px;line-height:4px;transform:skew(-16deg);';
      styles.articleTitle += 'font-size:28px;color:' + c.accent + ';text-align:center;';
      styles.lead = 'margin:0 0 32px;padding:0;';
      panels(frame('22px','4px double ' + c.accent,'#fff'));
      styles.card += 'box-shadow:inset 0 0 0 3px #ecf4f9;';
      styles.note = 'margin:28px 0;padding:12px 0 12px 16px;border-left:2px solid ' + c.line + ';';
      styles.quote = 'margin:30px 0;padding:15px 18px;border:1px dashed ' + c.accent + ';background:#f4f9fc;';
      styles.componentLabel = label + 'font-size:14px;color:' + c.accent + ';';
      styles.stepBadge += 'border:2px solid ' + c.accent + ';background:#fff;border-radius:8px 10px 7px 11px;line-height:25px;';
      styles.stepBody += 'border-bottom-style:dashed;';
      ruledTables('#edf6fc');
      break;
    case 'skygrid': {
      const grid = 'background-color:#fff;background-image:linear-gradient(#f9f9f9 1px,transparent 1px),linear-gradient(90deg,#f9f9f9 1px,transparent 1px);background-size:clamp(22px,5.5vw,30px) clamp(22px,5.5vw,30px);';
      const skyText = normal + 'font-size:clamp(16px,3.5vw,20px);line-height:1.9;letter-spacing:1.6px;font-weight:400;';
      chapter('margin:42px 0 30px;',
        number(0,'margin:0;height:0;line-height:0;overflow:hidden;font-family:Consolas,monospace;'),
        title(30,'position:relative;font-size:clamp(22px,5.3vw,30px);font-weight:400;line-height:1.1;letter-spacing:1.6px;color:' + c.accent + ';'));
      styles.sectionSkyHeading = 'position:relative;display:flex;align-items:center;width:100%;padding-bottom:2px;border-bottom:clamp(3px,0.9vw,5px) solid ' + c.accent + ';';
      styles.sectionSkyHighlight = 'position:absolute;left:38%;right:0;bottom:0;height:clamp(12px,2.8vw,16px);border-radius:16px 0 0 0;background:rgba(83,188,247,0.55);';
      styles.sectionPrefix = 'position:relative;display:block;flex:0 0 clamp(28px,6.6vw,38px);font-size:0;line-height:0;color:' + c.accent + ';';
      styles.sectionSkyTitle = 'position:relative;display:block;flex:1;min-width:0;';
      styles.skyTitleLatin = 'font-family:inherit;font-weight:700;letter-spacing:1.8px;';
      styles.skyBrowserIcon = 'display:inline-block;box-sizing:border-box;width:1.8em;height:1.6em;border:1.4px solid ' + c.accent + ';border-radius:2px;font-family:Consolas,monospace;font-size:clamp(11px,2.4vw,14px);line-height:1;color:' + c.accent + ';vertical-align:middle;';
      styles.skyBrowserDots = 'display:block;height:0.7em;padding-left:2px;border-bottom:1px solid ' + c.accent + ';font-family:Arial,sans-serif;font-size:0.6em;font-weight:700;line-height:0.6;letter-spacing:0.5px;text-align:left;';
      styles.skyBrowserCode = 'display:block;padding-top:1px;font-family:Consolas,monospace;font-size:0.8em;font-weight:700;line-height:1.1;letter-spacing:0;text-align:center;';
      styles.paper = 'background:#fff;--studio-paper-inset:8px;';
      styles.article = 'box-sizing:border-box;margin:0;padding:0 clamp(10px,2.8vw,16px);text-align:left;' + skyText + grid;
      styles.articleTitle = 'margin:0 0 34px;font-family:' + t.headingFont + ';font-size:30px;font-weight:400;line-height:1.5;letter-spacing:1.6px;color:' + c.accent + ';';
      styles.paragraph = 'margin:34px 0;text-align:left;' + skyText;
      styles.compactParagraph = 'margin:9px 0;text-align:left;' + skyText + 'color:inherit;';
      styles.lead = 'margin:0 0 34px;padding:0;';
      styles.leadParagraph = 'margin:8px 0;' + skyText;
      styles.stepParagraph = 'margin:0 0 10px;' + skyText;
      styles.listItem = 'margin:12px 0;padding-left:3px;' + skyText;
      styles.h3 = 'margin:0;font-family:' + t.headingFont + ';font-size:19px;font-weight:400;line-height:1.8;letter-spacing:1.2px;color:' + c.accent + ';';
      panels('margin:30px 0;padding:14px 0;border-bottom:1px solid ' + c.line + ';');
      styles.card = frame('19px','1px solid ' + c.line,'rgba(255,255,255,0.85)',4);
      styles.summary = 'margin:30px 0;padding:18px 0;border-top:1px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';';
      styles.note = 'margin:30px 0;padding:10px 0;border:0;background:transparent;';
      styles.quote = 'margin:32px 0;padding:0;border:0;color:' + c.accent + ';';
      styles.takeawayParagraph = 'margin:14px 0;font-family:' + t.bodyFont + ';font-size:clamp(17px,3.7vw,21px);font-weight:400;line-height:1.9;letter-spacing:1.8px;color:' + c.strong + ';overflow-wrap:anywhere;';
      styles.componentLabel = label + 'font-size:13px;font-weight:400;letter-spacing:1.2px;color:' + c.accent + ';';
      styles.inlineCode = mono + 'padding:1px 3px;font-size:1em;letter-spacing:4px;color:' + c.strong + ';background:#eaf6fd;border-radius:2px;';
      styles.highlight = 'padding:1px 3px;color:' + c.strong + ';background:#eaf6fd;';
      styles.link = 'color:' + c.strong + ';font-weight:700;letter-spacing:1.4px;text-decoration:none;overflow-wrap:anywhere;';
      styles.imageBlock = 'margin:34px 0;text-align:center;';
      styles.stepBadge += 'background:transparent;border-radius:3px;border-color:' + c.line + ';font-weight:400;';
      ruledTables('rgba(234,246,253,0.7)');
      break;
    }
    case 'bluebar':
      chapter('margin:42px 0 24px;padding:0 0 0 14px;border-left:5px solid ' + c.accent + ';',
        number(10,'margin:0 0 4px;font-family:Arial,sans-serif;letter-spacing:1px;color:' + c.muted + ';'),
        title(23,'font-weight:800;'));
      styles.articleTitle += 'font-size:29px;font-weight:800;';
      styles.lead = 'margin:0 0 35px;padding:0;';
      styles.leadParagraph += 'color:' + c.text + ';';
      styles.paragraph += 'margin:27px 0;';
      styles.underline = 'text-decoration:underline;text-decoration-style:dotted;text-decoration-color:' + c.accent + ';text-underline-offset:5px;text-decoration-thickness:2px;';
      panels('margin:28px 0;padding:15px 0;border-bottom:1px solid ' + c.line + ';');
      styles.note = 'margin:28px 0;padding:10px 0 10px 16px;border-left:2px solid ' + c.accent + ';';
      styles.summary = frame('19px 21px','0',c.surface,4) + 'border-left:4px solid ' + c.accent + ';';
      styles.success = frame('19px 21px','0',c.surface,4) + 'border-left:4px solid ' + c.accent + ';';
      styles.successLabel = label + 'font-size:13px;letter-spacing:0;color:' + c.accent + ';';
      styles.card = 'margin:30px 0;padding:18px 0;border-top:2px solid ' + c.line + ';border-bottom:1px solid ' + c.line + ';';
      styles.quote = 'margin:29px 0;padding:6px 0 6px 18px;border-left:3px solid ' + c.accent + ';';
      styles.componentLabel = label + 'font-size:13px;letter-spacing:0;color:' + c.heading + ';';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;font-size:17px;color:' + c.accent + ';';
      styles.facts += 'border-top:3px solid ' + c.accent + ';';
      ruledTables('transparent');
      break;
    case 'lilacdiamond':
      chapter('margin:57px 0 33px;text-align:center;',
        number(96,'margin:0 0 clamp(-46px,-8vw,-31px);font-size:clamp(58px,16.67vw,96px);font-family:Arial,sans-serif;font-weight:700;color:#bdb9f4;text-align:center;background-image:linear-gradient(180deg,#bdb9f4 20%,#d7d4fa 55%,rgba(215,212,250,0) 88%);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;'),
        title(20,'line-height:1.6;letter-spacing:0.8px;text-align:center;white-space:normal;'));
      // 标题行用行内块保持居中；细线按菱形字符的可见中心校准，保留编号原来的渐变。
      styles.sectionDiamondGrid = 'display:block;width:100%;text-align:center;font-size:0;line-height:0;white-space:nowrap;';
      styles.sectionDiamondTitle = 'display:inline-block;box-sizing:border-box;max-width:80%;padding:0 8px;vertical-align:middle;white-space:normal;';
      styles.sectionDiamondSide = 'display:inline-block;width:10%;vertical-align:middle;';
      styles.sectionDiamondSideGrid = 'display:table;table-layout:fixed;width:100%;border-collapse:collapse;';
      styles.sectionDiamond = 'display:table-cell;width:13px;vertical-align:middle;text-align:center;font-family:Arial,sans-serif;font-size:16px;font-weight:700;line-height:1;letter-spacing:0;color:' + c.accent + ';';
      styles.sectionDiamondLineCell = 'display:table-cell;vertical-align:middle;';
      styles.sectionDiamondLineLeft = 'display:block;height:1px;margin-top:-1px;background-color:#c8c3f5;';
      styles.sectionDiamondLineRight = styles.sectionDiamondLineLeft;
      styles.articleTitle += 'font-size:28px;';
      styles.lead = 'margin:0 0 38px;padding:0;';
      styles.leadParagraph += 'color:' + c.text + ';';
      styles.paragraph += 'margin:29px 0;';
      styles.underline = 'text-decoration:underline;text-decoration-color:' + c.text + ';text-underline-offset:5px;text-decoration-thickness:1px;';
      panels('margin:32px 0;padding:17px 0;border-bottom:1px solid ' + c.line + ';');
      styles.note = 'margin:30px 0;padding:12px 0 12px 19px;border-left:2px solid #c8c1f3;';
      styles.summary = frame('21px','0',c.surface,2) + 'border-top:1px solid #c8c1f3;';
      styles.quote = 'margin:33px 0;padding:9px 0 9px 20px;border-left:1px solid ' + c.accent + ';';
      styles.componentLabel = label + 'font-size:12px;font-weight:700;color:' + c.heading + ';';
      styles.stepBadge += 'background:transparent;border:0;border-radius:0;color:' + c.heading + ';font-size:16px;';
      styles.stepBody += 'border-bottom-style:dotted;';
      ruledTables('transparent');
      break;
    case 'greenflight':
      chapter('margin:46px 0 26px;text-align:center;',
        number(12,'margin:0 0 10px;font-family:Arial,sans-serif;letter-spacing:2px;color:' + c.muted + ';'),
        title(23,'text-align:center;color:' + c.accent + ';text-decoration:underline;text-decoration-style:wavy;text-decoration-color:#bdddb5;text-underline-offset:8px;text-decoration-thickness:2px;'));
      styles.sectionFlightLine = 'margin:23px 0 0;display:table;table-layout:fixed;width:100%;';
      styles.sectionFlightBadgeCell = 'display:table-cell;width:47px;vertical-align:middle;';
      styles.sectionFlightBadge = 'display:block;width:41px;height:41px;border:2px solid #fff;border-radius:50%;background:#fce8de;font-family:Arial,sans-serif;font-size:28px;line-height:37px;color:' + c.accent + ';transform:rotate(-15deg);';
      styles.sectionFlightTrail = 'display:table-cell;vertical-align:middle;';
      styles.sectionFlightRule = 'display:block;height:0;border-top:2px solid #deedce;';
      styles.articleTitle += 'font-size:28px;color:' + c.strong + ';';
      styles.lead = 'margin:0 0 35px;padding:0;';
      styles.leadParagraph += 'color:' + c.text + ';';
      panels(frame('20px 22px','0',c.surface,12));
      styles.card = frame('23px','0','#beddb7',14);
      styles.summary = frame('21px','0','#e6f2df',14) + 'border-top:3px solid #a8cf8a;';
      styles.note = 'margin:29px 0;padding:10px 0 10px 17px;border-left:3px solid #c9dfa9;';
      styles.componentLabel = label + 'font-size:14px;color:#34482c;';
      styles.quote = 'margin:31px 0;padding:10px 18px;border-left:2px solid #a8cf8a;background:#f3f8ee;';
      styles.underline = 'text-decoration:underline;text-decoration-style:wavy;text-decoration-color:#a8cf8a;text-underline-offset:5px;';
      styles.stepBadge += 'background:#e7f3da;color:' + c.strong + ';border-color:#b6d69c;';
      styles.stepBody += 'border-bottom-style:dashed;';
      ruledTables('#e8f2df');
      break;
    case 'cloud':
      chapter('margin:48px 0 25px;padding:0 0 17px;border-bottom:1px solid ' + c.line + ';',
        number(12,'padding:6px 0;border-radius:14px;background:' + c.surface + ';text-align:center;font-family:Arial,sans-serif;line-height:1.6;'),title(23,'font-weight:500;'),'width:64px;padding-left:14px;');
      styles.sectionTitleCell += 'padding-right:14px;';
      styles.articleTitle += 'font-size:29px;font-weight:500;line-height:1.7;';
      styles.lead = 'margin:0 0 37px;padding:0;';
      styles.leadParagraph += 'color:' + c.text + ';';
      panels(frame('19px 21px','0',c.surface) + 'border-radius:4px 16px 16px 16px;');
      styles.note += 'border-left:1px solid ' + c.line + ';';
      styles.summary += 'border-top:1px solid ' + c.accent + ';';
      styles.card = frame('21px','1px solid ' + c.line,'#fff',14);
      styles.componentLabel = label + 'font-size:11px;font-weight:500;letter-spacing:0.4px;color:' + c.strong + ';';
      styles.quote = 'margin:31px 0;padding:7px 0 7px 19px;border-left:1px solid ' + c.accent + ';border-radius:12px 0 0 12px;';
      styles.pullquote += 'padding:22px 0;text-align:left;border-bottom:1px solid ' + c.line + ';';
      styles.stepBadge += 'border:0;border-radius:9px;background:' + c.surface + ';font-weight:400;';
      styles.faqRow = 'margin:0 0 24px;padding:0 0 18px;border-bottom:1px solid ' + c.line + ';';
      ruledTables('transparent');
      styles.th += 'border-top:0;font-weight:500;';
      break;
  }
  if (l.heading && l.heading !== 'monument') {
    const sizes = Array.from(styles.articleTitle.matchAll(/font-size:([\d.]+)px;/g));
    const maximum = sizes.length ? sizes[sizes.length-1][1] : 29;
    styles.articleTitle += 'font-size:clamp(24px,7.6vw,' + maximum + 'px);text-wrap:balance;';
  }
  Object.assign(styles, theme.styles || {});
  // 表格保留各模板的配色与边线，统一阅读尺度；列宽由正文内容决定。
  for (const role of ['th','td']) {
    styles[role] += 'box-sizing:border-box;padding:12px 8px;vertical-align:top;line-height:1.75;letter-spacing:0;word-break:normal;overflow-wrap:break-word;';
  }
  return styles;
}

// Shared by the static renderer and the editor. No DOM, stylesheet or external dependency.
export function buildSectionHeading(theme, number, titleHtml, styles) {
  const escape = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  function tag(name, role, inner, attributes='') {
    return '<' + name + ' data-studio="' + role + '" style="' + escape(styles[role] || '') + '"' + attributes + '>' + inner + '</' + name + '>';
  }
  // 英文标题片段是自动生成的样式，切换时先还原，避免嵌套或带入其他模板。
  titleHtml = titleHtml.replace(/<span\b[^>]*data-studio="skyTitleLatin"[^>]*>([^<]*)<\/span>/g,'$1');
  let label = String(number).padStart(2,'0');
  if (theme.layout.number === 'plain') {
    label = String(number);
  } else if (theme.layout.number === 'roman') {
    let remaining = number; label = '';
    for (const [value,letter] of [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]) {
      while (remaining >= value) { label += letter; remaining -= value; }
    }
  } else if (theme.layout.number === 'chinese') {
    const digits = ['零','一','二','三','四','五','六','七','八','九'];
    label = '卷 ' + (number < 10 ? digits[number] : number < 100 ? (number >= 20 ? digits[Math.floor(number/10)] : '') + '十' + (number%10 ? digits[number%10] : '') : number);
  } else if (theme.layout.number === 'han') {
    const digits = ['零','一','二','三','四','五','六','七','八','九'];
    label = number < 10 ? digits[number] : number < 100 ? (number >= 20 ? digits[Math.floor(number/10)] : '') + '十' + (number%10 ? digits[number%10] : '') : String(number);
  } else if (theme.layout.number === 'bracket') {
    label = '[ ' + label + ' ]';
  } else if (theme.layout.number === 'chapter') {
    label = '第 ' + label + ' 节';
  }
  // 长序号在固定侧栏内缩小，保留完整编号，避免拆行或压到标题。
  if (theme.layout.heading && theme.layout.heading !== 'monument') {
    const inline = ['editorial','steps','swiss','research','ticket','seal','gallery','ledger','midnight','dashboard','orbital','signal','lab','lecture','amber','bookmark','salt','terracotta','film','radio','race','dialogue','chalk','curatorial','brief','annotation','collage','nautical','cloud','service'].includes(theme.layout.heading);
    const characters = label.replace(/\s/g,'').length;
    const capacity = theme.layout.number === 'han' ? 1 : theme.layout.number === 'bracket' ? 4 : 2;
    if (inline && characters > capacity) {
      styles = Object.assign({},styles,{sectionNumber:styles.sectionNumber.replace(/font-size:([\d.]+)px;/,(match,size)=>'font-size:' + Math.max(9,Math.round(Number(size)*capacity/characters*10)/10) + 'px;')});
    }
  }
  if (theme.layout.heading === 'skygrid') {
    titleHtml = titleHtml.replace(/(<[^>]*\bdata-studio="[^"]*"[^>]*\bstyle=")([^"]*)"/g,'$1$2color:inherit;"');
  } else if (['editorial','terminal','apricot','service','sakura','handdrawn','bluebar','lilacdiamond','greenflight'].includes(theme.layout.heading)) {
    titleHtml = titleHtml.replace(/(<(?:strong|em|a|span) data-studio="(?:strong|em|link|underline)" style=")([^"]*)"/g,'$1$2color:inherit;"');
  }
  const h2 = tag('h2','h2',titleHtml);
  const isStacked = !theme.layout.heading || theme.layout.heading === 'monument';
  const stacked = ['folio','ribbon','minimal','newspaper','terminal','letter','blueprint','riso','outdoor','neon','titanium','archive','letterpress','poetry','salon','stage','invitation','clauses','menu','brackets','apricot','sakura','handdrawn','skygrid','bluebar','lilacdiamond','greenflight'].includes(theme.layout.heading);
  const marker = tag(isStacked || stacked ? 'p' : 'span','sectionNumber',escape(label),' data-section-number="' + number + '"');
  let inner;
  if (['apricot','sakura'].includes(theme.layout.heading)) inner = marker + tag('section','sectionRibbon',h2);
  else if (theme.layout.heading === 'service') inner = tag('section','sectionPill',tag('span','sectionPrefix','STEP') + marker) + h2;
  else if (theme.layout.heading === 'handdrawn') {
    const book = tag('span','sketchBook',tag('span','sketchBookLeft','≋') + tag('span','sketchBookRight','≋'));
    const laptop = tag('span','sketchLaptop',tag('span','sketchScreen','▏') + tag('span','sketchKeyboard','····'));
    inner = marker + tag('section','sectionSketch',tag('span','sectionSketchLeft',book,' aria-hidden="true"') + tag('section','sectionSketchTitle',h2) + tag('span','sectionSketchRight',laptop,' aria-hidden="true"'));
  }
  else if (theme.layout.heading === 'skygrid') {
    const skyTitle = titleHtml.split(/(<[^>]*>|&(?:#\d+|#x[\da-f]+|[a-z][\da-z]+);)/gi).map(part => {
      if (part.startsWith('<') || part.startsWith('&')) return part;
      return part.replace(/[A-Za-z0-9]+(?:[ \t][A-Za-z0-9]+)*/g,word=>tag('span','skyTitleLatin',word));
    }).join('');
    const icon = tag('span','skyBrowserIcon',tag('span','skyBrowserDots','•••') + tag('span','skyBrowserCode','&lt;/&gt;'));
    inner = marker + tag('section','sectionSkyHeading',tag('span','sectionSkyHighlight','',' aria-hidden="true"') + tag('span','sectionPrefix',icon,' aria-hidden="true"') + tag('section','sectionSkyTitle',tag('h2','h2',skyTitle)));
  }
  else if (theme.layout.heading === 'lilacdiamond') {
    const diamond = tag('span','sectionDiamond','◇',' aria-hidden="true"');
    const line = role => tag('section','sectionDiamondLineCell',tag('section',role,'',' aria-hidden="true"'));
    const side = inner => tag('section','sectionDiamondSide',tag('section','sectionDiamondSideGrid',inner));
    const left = side(line('sectionDiamondLineLeft') + diamond);
    const right = side(diamond + line('sectionDiamondLineRight'));
    inner = marker + tag('section','sectionDiamondGrid',left + tag('section','sectionDiamondTitle',h2) + right);
  }
  else if (theme.layout.heading === 'greenflight') inner = marker + h2 + tag('section','sectionFlightLine',tag('section','sectionFlightBadgeCell',tag('span','sectionFlightBadge','✈',' aria-hidden="true"')) + tag('section','sectionFlightTrail',tag('span','sectionFlightRule','')));
  else if (isStacked) inner = marker + tag('section','sectionLine',h2);
  else if (['folio','letterpress','stage'].includes(theme.layout.heading)) inner = marker + h2 + tag('section','sectionOrnament','');
  else if (['titanium','poetry'].includes(theme.layout.heading)) inner = h2 + marker;
  else if (['dashboard','lab'].includes(theme.layout.heading)) inner = tag('section','sectionGrid',tag('section','sectionNumberCell',marker) + tag('section','sectionTitleCell',h2)) + tag('section','sectionOrnament','');
  else if (theme.layout.heading === 'outdoor') inner = h2 + marker;
  else if (stacked) inner = marker + h2;
  else if (theme.layout.heading === 'curatorial') inner = tag('section','sectionGrid',tag('section','sectionTitleCell',h2) + tag('section','sectionNumberCell',marker)) + tag('section','sectionOrnament','');
  else if (['ticket','gallery','ledger','signal','amber','salt','radio','annotation','cloud'].includes(theme.layout.heading)) inner = tag('section','sectionGrid',tag('section','sectionTitleCell',h2) + tag('section','sectionNumberCell',marker));
  else inner = tag('section','sectionGrid',tag('section','sectionNumberCell',marker) + tag('section','sectionTitleCell',h2));
  return tag('section','section',inner,' data-section-index="' + number + '"');
}

