(function () {
  'use strict';
  var article = document.getElementById('article-content');
  var bodyButton = document.getElementById('copy-article');
  var titleButton = document.getElementById('copy-title');
  var status = document.getElementById('copy-status');
  var resetTimer;
  var themes = JSON.parse(document.getElementById('studio-themes').textContent);
  var requestedTheme = new URLSearchParams(window.location.search).get('template');
  var activeId = themes.some(function(theme) { return theme.id === requestedTheme; }) ? requestedTheme : document.body.dataset.initialTheme;
  var themeSelect = document.getElementById('template-select');
  var imageSelect = document.getElementById('image-style-select');
  var activeImageStyle = document.body.dataset.initialImageStyle || 'plain';
  var panel = document.getElementById('control-panel');
  var panelToggle = document.getElementById('panel-toggle');
  var panelClose = document.getElementById('panel-close');
  var panelBackdrop = document.getElementById('panel-backdrop');
  var previewArea = document.getElementById('preview-area');
  var compactPanel = window.matchMedia('(max-width:1280px)');
  var activePicker;
  function createPicker(select, describe) {
    var menu = document.createElement('div');
    // 旧浏览器继续使用原生选择器；支持 Popover 时菜单可越过面板滚动边界。
    if (typeof menu.showPopover !== 'function') return {
      button:select, refresh:function() {}, close:function() {},
      setBusy:function(busy) { select.disabled = busy; }
    };
    var field = select.parentElement;
    var button = document.createElement('button');
    button.id = select.id + '-trigger';
    button.type = 'button';
    button.className = 'selector-trigger';
    button.setAttribute('role', 'combobox');
    button.setAttribute('aria-haspopup', 'listbox');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', select.id + '-menu');
    button.innerHTML = '<span class="selector-swatch" aria-hidden="true"></span><span class="selector-value"></span>' +
      '<svg class="selector-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4.5 6 3.5 3.5L11.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var valueLabel = button.querySelector('.selector-value');
    valueLabel.id = select.id + '-value';
    button.setAttribute('aria-labelledby', select.getAttribute('aria-labelledby') + ' ' + valueLabel.id);
    menu.id = select.id + '-menu';
    menu.className = 'selector-menu';
    menu.setAttribute('popover', 'manual');
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-labelledby', select.getAttribute('aria-labelledby'));
    menu.hidden = true;
    var options = Array.from(select.options);
    var entries = options.map(function(option, index) {
      var entry = document.createElement('div');
      var detail = describe ? describe(option.value) : {};
      entry.id = select.id + '-option-' + index;
      entry.className = 'selector-option';
      entry.setAttribute('role', 'option');
      if (detail.color) {
        var swatch = document.createElement('span');
        swatch.className = 'selector-swatch';
        swatch.setAttribute('aria-hidden', 'true');
        swatch.style.color = detail.color;
        entry.appendChild(swatch);
      }
      var text = document.createElement('span');
      text.className = 'selector-option-text';
      var label = document.createElement('span');
      label.textContent = option.textContent;
      text.appendChild(label);
      if (detail.caption) {
        var caption = document.createElement('small');
        caption.textContent = detail.caption;
        text.appendChild(caption);
      }
      entry.appendChild(text);
      entry.insertAdjacentHTML('beforeend', '<svg class="selector-check" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3.5 8 3 3 6-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      menu.appendChild(entry);
      entry.addEventListener('pointermove', function() { if (activeIndex !== index) setActive(index); });
      entry.addEventListener('click', function() { choose(index); });
      return entry;
    });
    field.append(button, menu);
    select.hidden = true;
    var activeIndex = select.selectedIndex;
    function position() {
      if (menu.hidden) return;
      var rect = button.getBoundingClientRect();
      var width = Math.min(rect.width, window.innerWidth - 24);
      menu.style.width = width + 'px';
      var below = window.innerHeight - rect.bottom - 18;
      var above = rect.top - 18;
      var desired = Math.min(menu.scrollHeight + 2, 340);
      var upward = below < desired && above > below;
      menu.style.maxHeight = Math.max(40, Math.min(340, upward ? above : below)) + 'px';
      var height = menu.getBoundingClientRect().height;
      menu.style.left = Math.max(12, Math.min(rect.left, window.innerWidth - width - 12)) + 'px';
      menu.style.top = (upward ? rect.top - height - 6 : rect.bottom + 6) + 'px';
    }
    function setActive(index) {
      activeIndex = index;
      entries.forEach(function(entry, current) { entry.classList.toggle('is-active', current === index); });
      button.setAttribute('aria-activedescendant', entries[index].id);
      // 只滚动菜单，避免 scrollIntoView 连带移动正文或面板。
      var entry = entries[index];
      var top = entry.offsetTop, bottom = top + entry.offsetHeight;
      if (top < menu.scrollTop) menu.scrollTop = top;
      else if (bottom > menu.scrollTop + menu.clientHeight) menu.scrollTop = bottom - menu.clientHeight;
    }
    function close(restoreFocus) {
      if (menu.hidden) return;
      menu.hidePopover();
      menu.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      button.removeAttribute('aria-activedescendant');
      if (activePicker === picker) activePicker = null;
      if (restoreFocus) button.focus({ preventScroll:true });
    }
    function open(index) {
      if (select.disabled) return;
      if (activePicker && activePicker !== picker) activePicker.close(false);
      activePicker = picker;
      menu.style.maxHeight = '340px';
      menu.hidden = false;
      menu.showPopover();
      button.setAttribute('aria-expanded', 'true');
      position();
      setActive(index);
    }
    function choose(index) {
      if (select.disabled || menu.hidden) return;
      select.value = options[index].value;
      select.dispatchEvent(new Event('change', { bubbles:true }));
      close(true);
    }
    var picker = {
      button:button, close:close,
      refresh:function() {
        valueLabel.textContent = select.selectedOptions[0].textContent;
        var detail = describe ? describe(select.value) : {};
        var swatch = button.querySelector('.selector-swatch');
        swatch.hidden = !detail.color;
        if (detail.color) swatch.style.color = detail.color;
        entries.forEach(function(entry, index) { entry.setAttribute('aria-selected', String(index === select.selectedIndex)); });
        if (!menu.hidden) setActive(select.selectedIndex);
      },
      setBusy:function(busy) {
        if (busy) close(false);
        select.disabled = busy;
        button.disabled = busy;
        entries.forEach(function(entry) { entry.setAttribute('aria-disabled', String(busy)); });
      }
    };
    button.addEventListener('click', function() {
      if (menu.hidden) open(select.selectedIndex);
      else close(false);
    });
    button.addEventListener('keydown', function(event) {
      if (select.disabled || event.isComposing) return;
      if (event.key === 'Tab') { close(false);return; }
      if (event.key === 'Escape' && !menu.hidden) {
        event.preventDefault();event.stopPropagation();close(true);return;
      }
      if (!['ArrowDown','ArrowUp','Home','End','Enter',' '].includes(event.key)) return;
      event.preventDefault();
      if (menu.hidden) {
        open(event.key === 'Home' ? 0 : event.key === 'End' ? entries.length - 1 : select.selectedIndex);
      } else if (event.key === 'Enter' || event.key === ' ') choose(activeIndex);
      else setActive(event.key === 'Home' ? 0 : event.key === 'End' ? entries.length - 1 : (activeIndex + (event.key === 'ArrowDown' ? 1 : -1) + entries.length) % entries.length);
    });
    menu.addEventListener('pointerdown', function(event) {
      if (event.target.closest('[role="option"]')) event.preventDefault();
    });
    field.addEventListener('focusout', function(event) { if (!field.contains(event.relatedTarget)) close(false); });
    document.addEventListener('pointerdown', function(event) { if (!field.contains(event.target)) close(false); });
    // 窗口或面板滚动时收起，避免菜单与触发器脱离。
    window.addEventListener('resize', function() { close(false); });
    document.addEventListener('scroll', function(event) { if (!menu.contains(event.target)) close(false); }, true);
    picker.refresh();
    return picker;
  }
  var themePicker = createPicker(themeSelect, function(id) {
    var theme = themes.find(function(item) { return item.id === id; });
    return { color:theme.colors.accent, caption:theme.category };
  });
  var imagePicker = createPicker(imageSelect);
  function syncPanel() {
    if (activePicker) activePicker.close(false);
    var modal = compactPanel.matches && panel.classList.contains('is-open');
    var visible = !compactPanel.matches || modal;
    panel.inert = !visible;
    panelToggle.hidden = !compactPanel.matches || modal;
    panelToggle.setAttribute('aria-expanded', String(visible));
    panelBackdrop.hidden = !modal;
    previewArea.inert = modal;
    document.body.classList.toggle('panel-open', modal);
    if (visible) panel.removeAttribute('aria-hidden');
    else panel.setAttribute('aria-hidden', 'true');
    if (modal) {
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
    } else {
      panel.removeAttribute('role');
      panel.removeAttribute('aria-modal');
    }
  }
  function closePanel() {
    panel.classList.remove('is-open');
    syncPanel();
    if (compactPanel.matches) panelToggle.focus({ preventScroll:true });
  }
  panelToggle.addEventListener('click', function() {
    panel.classList.add('is-open');
    syncPanel();
    themePicker.button.focus({ preventScroll:true });
  });
  panelClose.addEventListener('click', closePanel);
  panelBackdrop.addEventListener('click', closePanel);
  panel.addEventListener('keydown', function(event) {
    if (!compactPanel.matches || !panel.classList.contains('is-open')) return;
    if (event.key === 'Escape') { event.preventDefault();closePanel();return; }
    if (event.key !== 'Tab') return;
    var focusable = Array.from(panel.querySelectorAll('button:not(:disabled),select:not(:disabled),summary,a[href]')).filter(function(element) {
      var closedDetails = element.closest('details:not([open])');
      return (!closedDetails || closedDetails.querySelector('summary') === element) && element.getClientRects().length > 0;
    });
    var first = focusable[0], last = focusable[focusable.length-1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault();last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault();first.focus(); }
  });
  compactPanel.addEventListener('change', syncPanel);
  syncPanel();
  function setBusy(busy) {
    themePicker.setBusy(busy);
    imagePicker.setBusy(busy);
    titleButton.disabled = busy;
    document.querySelectorAll('[data-template-choice]').forEach(function(button) { button.disabled = busy; });
  }
  function applyImageStyles(announce) {
    var theme = themes.find(function(item) { return item.id === activeId; });
    var styles = createStudioStyles(theme);
    article.querySelectorAll('[data-image-appearance]').forEach(function(block) {
      var appearance = block.dataset.imageAppearance === 'default' ? activeImageStyle : block.dataset.imageAppearance;
      var frame = block.querySelector('[data-image-frame]');
      if (frame.dataset.imageFrame === appearance) return;
      var holder = document.createElement('div');
      holder.innerHTML = createStudioImageFrame(appearance,block.dataset.imageTitle,frame.querySelector('img').outerHTML,styles);
      frame.replaceWith(holder.firstElementChild);
    });
    imageSelect.value = activeImageStyle;
    imagePicker.refresh();
    if (announce) setStatus('默认配图已切换为「' + imageSelect.selectedOptions[0].textContent + '」。单张已指定样式的配图按各自设置显示。', 'info');
  }
  function applyTheme(id, announce) {
    var theme = themes.find(function(item) { return item.id === id; });
    if (!theme) return;
    activeId = id;
    var styles = createStudioStyles(theme);
    article.querySelectorAll('[data-studio]').forEach(function(element) {
      element.style.cssText = styles[element.dataset.studio] || '';
      if (element.dataset.align) element.style.textAlign = element.dataset.align;
      if (element.dataset.tableWidth) element.style.width = element.dataset.tableWidth;
      if (element.dataset.tableMinWidth) element.style.minWidth = element.dataset.tableMinWidth + 'px';
      if (element.dataset.tableCompact === 'true') {
        element.style.whiteSpace = 'nowrap';
        element.style.fontVariantNumeric = 'tabular-nums';
      }
    });
    article.querySelectorAll('[data-section-index]').forEach(function(element) {
      var title = element.querySelector('[data-studio="h2"]').innerHTML;
      var holder = document.createElement('div');
      holder.innerHTML = createStudioHeading(theme,Number(element.dataset.sectionIndex),title,styles);
      element.replaceWith(holder.firstElementChild);
    });
    article.style.cssText = styles.article;
    if (['editorial','terminal'].includes(theme.layout.heading)) {
      article.querySelectorAll('h2 [data-studio="strong"],h2 [data-studio="em"],h2 [data-studio="link"],h2 [data-studio="underline"]').forEach(function(element) { element.style.color = 'inherit'; });
    }
    if (theme.layout.heading === 'skygrid') {
      article.querySelectorAll('h1,h2,h3,h4,h5,h6,[data-studio="componentLabel"],[data-studio="faqQuestion"]').forEach(function(heading) {
        heading.querySelectorAll('[data-studio]').forEach(function(element) { element.style.color = 'inherit'; });
      });
    }
    applyImageStyles(false);
    // 编辑器外壳保持中性配色，模板个性只体现在文章纸面与标题上。
    document.querySelector('.paper').style.cssText = styles.paper || '';
    document.getElementById('article-title').style.cssText = styles.articleTitle;
    themeSelect.value = id;
    themePicker.refresh();
    document.getElementById('theme-description').textContent = '「' + theme.name + '」' + theme.description;
    document.querySelectorAll('[data-template-choice]').forEach(function(button) {
      button.setAttribute('aria-pressed', String(button.dataset.templateChoice === id));
    });
    if (announce) setStatus('已切换到「' + theme.name + '」。点击复制，将按当前样式复制正文。', 'info');
  }
  themeSelect.addEventListener('change', function() { applyTheme(themeSelect.value, true); });
  imageSelect.addEventListener('change', function() { activeImageStyle = imageSelect.value;applyImageStyles(true); });
  document.querySelectorAll('[data-template-choice]').forEach(function(button) {
    button.addEventListener('click', function() { applyTheme(button.dataset.templateChoice, true); });
  });
  applyTheme(activeId, false);

  function setStatus(message, kind) {
    status.textContent = message;
    status.dataset.kind = kind || 'info';
  }
  function inlineMediaImage(image) {
    var media = window.__STUDIO_MEDIA__;
    var replacement = media && media[image.getAttribute('src') || ''];
    if (replacement) image.setAttribute('src', replacement);
  }
  function selectBody() {
    if (compactPanel.matches) closePanel();
    article.querySelectorAll('img').forEach(inlineMediaImage);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(article);
    selection.removeAllRanges();
    selection.addRange(range);
    article.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  function getArticlePayload() {
    var clone = article.cloneNode(true);
    clone.removeAttribute('id');
    [clone].concat(Array.from(clone.querySelectorAll('*'))).forEach(function(element) {
      Array.from(element.attributes).forEach(function(attribute) {
        if (attribute.name.indexOf('data-') === 0) element.removeAttribute(attribute.name);
      });
    });
    clone.querySelectorAll('[id]').forEach(function (element) {
      element.removeAttribute('id');
    });
    clone.querySelectorAll('img').forEach(inlineMediaImage);
    return {
      html: '<!doctype html><html><head><meta charset="utf-8"></head><body><!--StartFragment-->' +
        clone.outerHTML + '<!--EndFragment--></body></html>',
      text: article.innerText
    };
  }
  function copyWithSelection(payload) {
    var selection = window.getSelection();
    var oldRanges = [];
    for (var i = 0; i < selection.rangeCount; i++) {
      oldRanges.push(selection.getRangeAt(i).cloneRange());
    }
    var oldFocus = document.activeElement;
    var helper = document.createElement('div');
    helper.contentEditable = 'true';
    helper.setAttribute('aria-hidden', 'true');
    helper.style.cssText = 'position:fixed;left:-10000px;top:0;width:676px;background:white;';
    if (payload.html) helper.innerHTML = payload.html;
    else helper.textContent = payload.text;
    document.body.appendChild(helper);
    helper.focus();
    var range = document.createRange();
    range.selectNodeContents(helper);
    selection.removeAllRanges();
    selection.addRange(range);
    var copiedEvent = false;
    function handleCopy(event) {
      if (!event.clipboardData) return;
      event.preventDefault();
      if (payload.html) event.clipboardData.setData('text/html', payload.html);
      event.clipboardData.setData('text/plain', payload.text);
      copiedEvent = true;
    }
    document.addEventListener('copy', handleCopy);
    var copied = false;
    try { copied = document.execCommand('copy'); }
    catch (error) { copied = false; }
    finally {
      document.removeEventListener('copy', handleCopy);
      helper.remove();
      selection.removeAllRanges();
      oldRanges.forEach(function (oldRange) {
        try { selection.addRange(oldRange); } catch (error) {}
      });
      if (oldFocus && oldFocus.focus) oldFocus.focus({ preventScroll: true });
    }
    return copied && copiedEvent;
  }
  async function copyBody() {
    clearTimeout(resetTimer);
    bodyButton.disabled = true;
    setBusy(true);
    bodyButton.textContent = '正在复制…';
    setStatus('正在准备正文和配图…');
    var payload = getArticlePayload();
    var copied = false;
    try {
      if (navigator.clipboard && navigator.clipboard.write && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({
          'text/html': new Blob([payload.html], { type: 'text/html' }),
          'text/plain': new Blob([payload.text], { type: 'text/plain' })
        })]);
        copied = true;
      }
    } catch (error) {
      copied = false;
    }
    if (!copied) copied = copyWithSelection(payload);
    bodyButton.disabled = false;
    setBusy(false);
    if (copied) {
      bodyButton.textContent = '已复制正文 ✓';
      setStatus('正文已复制。打开公众号正文编辑器，按 Ctrl+V（Mac：⌘V）粘贴。', 'success');
      resetTimer = setTimeout(function () { bodyButton.textContent = '一键复制正文'; }, 4000);
    } else {
      bodyButton.textContent = '一键复制正文';
      selectBody();
      setStatus('浏览器未允许自动复制，已选中正文。按 Ctrl+C（Mac：⌘C）后再粘贴。', 'error');
    }
  }
  async function copyTitle() {
    var payload = { text: document.getElementById('article-title').textContent };
    var copied = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(payload.text);
        copied = true;
      }
    } catch (error) { copied = false; }
    if (!copied) copied = copyWithSelection(payload);
    if (copied) setStatus('标题已复制，可以粘贴到公众号的标题栏。', 'success');
    else setStatus('未能自动复制标题，请选中预览中的标题后按 Ctrl+C。', 'error');
  }
  bodyButton.addEventListener('click', copyBody);
  titleButton.addEventListener('click', copyTitle);
  document.querySelectorAll('[data-save-image]').forEach(function (link) {
    link.addEventListener('click', function () {
      link.href = document.getElementById(link.dataset.saveImage).src;
    });
  });
})();
