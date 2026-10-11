(function () {
  'use strict';
  var gallery = document.querySelector('.gallery');
  var grid = document.querySelector('.theme-grid');
  var header = document.querySelector('.gallery-header');
  var cards = Array.from(document.querySelectorAll('.theme-card'));
  var search = document.getElementById('theme-search');
  var filters = Array.from(document.querySelectorAll('.filter-control')).map(function (control) {
    var toggle = control.querySelector('.filter-toggle');
    var menu = control.querySelector('.filter-menu');
    var options = Array.from(menu.querySelectorAll('.filter-option'));
    var label = toggle.querySelector('.filter-toggle-value');
    var key = control.dataset.filter;
    var value = '';
    var focusIndex = 0;
    options.forEach(function (option, index) { option.id = 'filter-' + key + '-option-' + index; });
    function moveFocus(index) {
      focusIndex = Math.max(0, Math.min(options.length - 1, index));
      options.forEach(function (option, i) { option.classList.toggle('is-focus', i === focusIndex); });
      menu.setAttribute('aria-activedescendant', options[focusIndex].id);
      options[focusIndex].scrollIntoView({ block: 'nearest' });
    }
    function open(fromEnd) {
      if (!menu.hidden) return;
      menu.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      var selected = options.findIndex(function (option) { return option.getAttribute('aria-selected') === 'true'; });
      moveFocus(fromEnd ? options.length - 1 : (selected < 0 ? 0 : selected));
      menu.focus({ preventScroll: true });
    }
    function close(returnFocus) {
      if (menu.hidden) return;
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      menu.removeAttribute('aria-activedescendant');
      options.forEach(function (option) { option.classList.remove('is-focus'); });
      if (returnFocus) toggle.focus({ preventScroll: true });
    }
    function choose(option) {
      value = option.dataset.value || '';
      label.textContent = option.textContent;
      options.forEach(function (item) { item.setAttribute('aria-selected', item === option ? 'true' : 'false'); });
      applyFilters();
    }
    toggle.addEventListener('click', function () { menu.hidden ? open() : close(false); });
    toggle.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown') { event.preventDefault(); open(); }
      else if (event.key === 'ArrowUp') { event.preventDefault(); open(true); }
    });
    menu.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown') { event.preventDefault(); moveFocus(focusIndex + 1); }
      else if (event.key === 'ArrowUp') { event.preventDefault(); moveFocus(focusIndex - 1); }
      else if (event.key === 'Home') { event.preventDefault(); moveFocus(0); }
      else if (event.key === 'End') { event.preventDefault(); moveFocus(options.length - 1); }
      else if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') { event.preventDefault(); choose(options[focusIndex]); close(true); }
      else if (event.key === 'Escape') { event.preventDefault(); close(true); }
      else if (event.key === 'Tab') close();
    });
    menu.addEventListener('click', function (event) {
      var option = event.target.closest('.filter-option');
      if (!option) return;
      choose(option);
      close(true);
    });
    // 点击卡片内嵌 iframe 时 pointerdown 不会冒泡到本页面，焦点会随之移入 iframe，借 focusout 关闭菜单。
    control.addEventListener('focusout', function () {
      if (menu.hidden) return;
      setTimeout(function () {
        if (!control.contains(document.activeElement)) close(false);
      }, 0);
    });
    return {
      key: key,
      control: control,
      get value() { return value; },
      reset: function () {
        value = '';
        label.textContent = options[0].textContent;
        options.forEach(function (item, i) { item.setAttribute('aria-selected', i === 0 ? 'true' : 'false'); });
      },
      close: close
    };
  });
  document.addEventListener('pointerdown', function (event) {
    filters.forEach(function (filter) { if (!filter.control.contains(event.target)) filter.close(); });
  });
  var reset = document.getElementById('reset-filters');
  var dialog = document.getElementById('component-dialog');
  var frame = document.getElementById('component-preview');
  var loading = document.getElementById('component-loading');
  var source = JSON.parse(document.getElementById('component-source').textContent);
  var opener;
  function sizeCards() {
    var style = getComputedStyle(gallery);
    var top = parseFloat(style.paddingTop) + header.getBoundingClientRect().height + parseFloat(getComputedStyle(header).marginBottom);
    var gap = parseFloat(getComputedStyle(grid).rowGap);
    var available = innerHeight - top - gap;
    gallery.style.setProperty('--card-height', Math.max(240, Math.ceil(available)) + 'px');
  }
  sizeCards();
  window.addEventListener('resize', sizeCards);
  new ResizeObserver(sizeCards).observe(header);
  function applyFilters() {
    var query = search.value.trim().toLocaleLowerCase(), count = 0;
    cards.forEach(function (card) {
      card.hidden = !card.dataset.search.toLocaleLowerCase().includes(query) || !filters.every(function (filter) {
        return !filter.value || card.dataset[filter.key].split(' ').includes(filter.value);
      });
      if (!card.hidden) count++;
    });
    var active = !!query || filters.some(function (filter) { return !!filter.value; });
    filters.forEach(function (filter) { filter.control.classList.toggle('is-active', !!filter.value); });
    // 总数由标题旁的计数徽标常驻展示；右侧统计仅在筛选或搜索生效时出现，避免重复。
    document.getElementById('result-count').textContent = count + ' / ' + cards.length + ' 款模板';
    document.getElementById('empty-result').hidden = count > 0;
    reset.hidden = !active;
    reset.parentElement.hidden = !active;
  }
  search.addEventListener('input', applyFilters);
  reset.addEventListener('click', function () {
    search.value = '';
    filters.forEach(function (filter) { filter.reset(); });
    applyFilters();
    search.focus({preventScroll:true});
  });
  applyFilters();
  var toast = document.getElementById('copy-toast');
  var toastTimer;
  function showToast() {
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 1800);
  }
  function copyPrompt(button) {
    var text = '使用 laymate skill，用「' + button.dataset.name + '」风格写一篇公众号文章，内容是：';
    var fallback = function () {
      var helper = document.createElement('textarea');
      helper.value = text;
      helper.setAttribute('readonly', '');
      helper.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.appendChild(helper);
      helper.select();
      try { document.execCommand('copy'); } catch (error) {}
      document.body.removeChild(helper);
      showToast();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(showToast, fallback);
    else fallback();
  }
  grid.addEventListener('click', function (event) {
    var copyButton = event.target.closest('.copy-prompt');
    if (copyButton) { copyPrompt(copyButton); return; }
    var button = event.target.closest('.open-article');
    if (!button) return;
    opener = button;
    document.getElementById('component-title').textContent = button.dataset.name + ' · 完整组件预览';
    frame.title = button.dataset.name + '完整组件预览';
    loading.hidden = false;
    frame.srcdoc = source.replace(/data-initial-theme="[^"]*"/, 'data-initial-theme="' + button.dataset.template + '"');
    document.body.classList.add('preview-open');
    dialog.showModal();
  });
  frame.addEventListener('load', function () {
    if (!dialog.open || !frame.hasAttribute('srcdoc')) return;
    loading.hidden = true;
    frame.contentDocument.querySelectorAll('a').forEach(function (link) { link.tabIndex = -1; });
    frame.contentDocument.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { event.preventDefault(); dialog.close(); }
    });
  });
  document.getElementById('component-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', function () {
    document.body.classList.remove('preview-open');
    frame.removeAttribute('srcdoc');
    loading.hidden = true;
    if (opener) opener.focus({preventScroll:true});
  });
})();
