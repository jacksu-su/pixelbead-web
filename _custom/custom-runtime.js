
/* ===== bundled source: _custom/quick-palette.js ===== */
/* PixelBead fast home palette: opens without mounting the 100x100 editor canvas. */
(() => {
  'use strict';

  const STORAGE_KEY = 'customPerlerPaletteSelections';
  const PREFS_KEY = 'pixelbeadPalettePrefs';
  const DATA_CHUNK = './_next/static/chunks/8493-3d1e765a863e12e3.js?v=20260917-11';
  const systems = [
    { label: 'MARD', key: 'MARD' },
    { label: 'COCO', key: 'COCO' },
    { label: 'ManMan', key: '漫漫' },
    { label: 'PanPan', key: '盼盼' },
    { label: 'MiXiaoWo', key: '咪小窝' }
  ];
  const presetOrder = ['291', '221', '144', '120', '96', '72', '48', '24'];

  const style = document.createElement('style');
  style.textContent = `
    body.pb-palette-open { overflow: hidden !important; }
    #pb-quick-palette[hidden] { display: none !important; }
    #pb-quick-palette {
      position: fixed;
      z-index: 2800;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 24px;
      color: #342936;
      background: rgba(10, 8, 15, .7);
      backdrop-filter: blur(20px) saturate(1.08);
      font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
    }
    .pb-palette-panel {
      display: grid;
      grid-template-rows: auto minmax(0, 1fr) auto;
      width: min(1060px, 100%);
      height: min(780px, calc(100dvh - 48px));
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, .9);
      border-radius: 30px;
      background:
        radial-gradient(circle at 4% 0%, rgba(255, 189, 119, .25), transparent 30%),
        radial-gradient(circle at 100% 0%, rgba(153, 70, 221, .15), transparent 34%),
        rgba(255, 249, 244, .97);
      box-shadow: 0 36px 100px rgba(0, 0, 0, .48), inset 0 1px rgba(255,255,255,.9);
    }
    .pb-palette-head {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 16px;
      min-height: 78px;
      padding: 16px 20px;
      color: #fff;
      background: linear-gradient(112deg, rgba(19, 23, 41, .99), rgba(49, 31, 51, .97));
      box-shadow: 0 12px 30px rgba(27, 18, 30, .16);
    }
    .pb-palette-brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
    .pb-palette-mark {
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      flex: none;
      border: 1px solid rgba(255,255,255,.4);
      border-radius: 13px;
      background: linear-gradient(145deg, #bc3fe5, #326cf1);
      box-shadow: 0 8px 22px rgba(92, 64, 218, .32), inset 0 1px rgba(255,255,255,.28);
      font: 700 14px/1 Georgia, serif;
    }
    .pb-palette-brand h2 { margin: 0; font: 700 22px/1.2 Georgia, "Songti SC", serif; }
    .pb-palette-brand p { margin: 5px 0 0; color: rgba(255,255,255,.64); font-size: 12px; }
    .pb-palette-summary { color: rgba(255,255,255,.78); font-size: 13px; text-align: center; }
    .pb-palette-summary strong { display: block; margin-top: 3px; color: #fff; font-size: 16px; }
    .pb-palette-close {
      justify-self: end;
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border: 1px solid rgba(255,255,255,.2);
      border-radius: 50%;
      color: #fff;
      background: rgba(255,255,255,.1);
      cursor: pointer;
      font-size: 25px;
    }
    .pb-palette-close:hover { background: rgba(255,255,255,.18); }
    .pb-palette-content { display: grid; grid-template-columns: 288px minmax(0, 1fr); min-height: 0; }
    .pb-palette-controls {
      overflow: auto;
      padding: 22px;
      border-right: 1px solid rgba(112, 79, 86, .14);
      background: rgba(255,255,255,.36);
    }
    .pb-palette-label { display: block; margin: 0 0 9px; color: #756975; font-size: 12px; font-weight: 700; }
    .pb-palette-label:not(:first-child) { margin-top: 21px; }
    .pb-system-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .pb-system-button,
    .pb-preset-button,
    .pb-palette-utility,
    .pb-group-button {
      border: 1px solid rgba(112, 83, 90, .13);
      color: #665865;
      background: rgba(255,255,255,.68);
      cursor: pointer;
      transition: transform .15s ease, border-color .15s ease, background .15s ease;
    }
    .pb-system-button { min-height: 40px; padding: 0 10px; border-radius: 11px; font-weight: 700; }
    .pb-system-button[aria-pressed="true"] {
      border-color: rgba(129, 67, 205, .35);
      color: #fff;
      background: linear-gradient(115deg, #b33fe1, #426ef0);
      box-shadow: 0 8px 18px rgba(102, 66, 207, .22);
    }
    .pb-preset-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; }
    .pb-preset-button { min-height: 36px; border-radius: 10px; font-size: 12px; font-weight: 700; }
    .pb-preset-button[aria-pressed="true"] { color: #7640bd; border-color: rgba(132, 67, 206, .4); background: #f1e7ff; }
    .pb-palette-search {
      width: 100%;
      height: 42px;
      box-sizing: border-box;
      padding: 0 13px;
      border: 1px solid rgba(110, 80, 87, .16);
      border-radius: 12px;
      outline: none;
      color: #443743;
      background: rgba(255,255,255,.78);
      font-size: 13px;
    }
    .pb-palette-search:focus { border-color: #9a63da; box-shadow: 0 0 0 3px rgba(149, 89, 215, .13); }
    .pb-utility-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 11px; }
    .pb-palette-utility { min-height: 38px; border-radius: 11px; font-weight: 700; }
    .pb-palette-utility[data-action="clear"] { color: #be4e4a; }
    .pb-palette-main { min-width: 0; min-height: 0; overflow: auto; padding: 22px 24px 28px; }
    .pb-palette-groups { display: flex; gap: 7px; overflow-x: auto; padding-bottom: 12px; scrollbar-width: thin; }
    .pb-group-button { flex: none; min-width: 42px; height: 34px; padding: 0 11px; border-radius: 999px; font-size: 12px; font-weight: 700; }
    .pb-group-button[aria-pressed="true"] { color: #fff; border-color: transparent; background: linear-gradient(110deg, #a646d8, #4c70e9); }
    .pb-palette-results { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin: 2px 0 15px; }
    .pb-palette-results strong { font-size: 16px; }
    .pb-palette-results span { color: #817381; font-size: 12px; }
    .pb-swatch-grid { display: grid; grid-template-columns: repeat(8, minmax(58px, 1fr)); gap: 11px; }
    .pb-swatch {
      display: grid;
      gap: 6px;
      min-width: 0;
      padding: 0;
      border: 0;
      color: #625561;
      background: transparent;
      cursor: pointer;
      font: 700 11px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
    }
    .pb-swatch-color {
      position: relative;
      aspect-ratio: 1.16 / 1;
      border: 2px solid rgba(88, 67, 75, .12);
      border-radius: 11px;
      box-shadow: 0 5px 14px rgba(73, 47, 47, .1), inset 0 1px rgba(255,255,255,.35);
      transition: transform .15s ease, border-color .15s ease, box-shadow .15s ease;
    }
    .pb-swatch:hover .pb-swatch-color { transform: translateY(-2px); }
    .pb-swatch[aria-pressed="true"] .pb-swatch-color { border-color: #8d45d2; box-shadow: 0 0 0 3px rgba(144, 70, 210, .16), 0 7px 16px rgba(73, 47, 47, .13); }
    .pb-swatch-check {
      position: absolute;
      right: 5px;
      top: 5px;
      display: none;
      place-items: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      color: #fff;
      background: linear-gradient(145deg, #b43edf, #3f70ef);
      box-shadow: 0 3px 8px rgba(50, 34, 70, .3);
    }
    .pb-swatch[aria-pressed="true"] .pb-swatch-check { display: grid; }
    .pb-swatch-code { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .pb-palette-empty { padding: 60px 20px; color: #847684; text-align: center; }
    .pb-palette-loading { display: grid; min-height: 250px; place-items: center; color: #766977; }
    .pb-palette-foot {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 18px;
      padding: 15px 20px;
      border-top: 1px solid rgba(112, 79, 86, .13);
      background: rgba(255,255,255,.66);
      box-shadow: 0 -10px 24px rgba(90, 59, 62, .05);
    }
    .pb-palette-foot p { margin: 0; color: #7e707d; font-size: 12px; line-height: 1.55; }
    .pb-palette-apply {
      min-width: 210px;
      height: 48px;
      border: 0;
      border-radius: 999px;
      color: #fff;
      background: linear-gradient(105deg, #ba3edf, #326df3);
      box-shadow: 0 10px 24px rgba(89, 65, 220, .28);
      cursor: pointer;
      font-size: 15px;
      font-weight: 800;
    }
    .pb-palette-apply:disabled { cursor: not-allowed; opacity: .45; box-shadow: none; }
    @media (max-width: 760px) {
      #pb-quick-palette { align-items: end; padding: 0; }
      .pb-palette-panel { width: 100%; height: 94dvh; border-width: 1px 0 0; border-radius: 26px 26px 0 0; }
      .pb-palette-head { grid-template-columns: 1fr auto; min-height: 70px; padding: 13px 15px; }
      .pb-palette-summary { display: none; }
      .pb-palette-content { grid-template-columns: 1fr; overflow: auto; }
      .pb-palette-controls { overflow: visible; border-right: 0; border-bottom: 1px solid rgba(112, 79, 86, .14); padding: 17px; }
      .pb-palette-main { overflow: visible; padding: 18px 16px 24px; }
      .pb-swatch-grid { grid-template-columns: repeat(5, minmax(48px, 1fr)); gap: 10px 8px; }
      .pb-palette-foot { grid-template-columns: 1fr; gap: 10px; padding: 12px 15px calc(12px + env(safe-area-inset-bottom)); }
      .pb-palette-foot p { display: none; }
      .pb-palette-apply { width: 100%; min-width: 0; }
    }
    @media (prefers-reduced-motion: reduce) { .pb-swatch-color, .pb-system-button { transition: none; } }
  `;
  document.head.append(style);

  const root = document.createElement('section');
  root.id = 'pb-quick-palette';
  root.hidden = true;
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-labelledby', 'pb-palette-title');
  root.innerHTML = `
    <div class="pb-palette-panel">
      <header class="pb-palette-head">
        <div class="pb-palette-brand">
          <span class="pb-palette-mark" aria-hidden="true">PB</span>
          <div><h2 id="pb-palette-title">色板管理</h2><p>直接设置，无需进入工作台</p></div>
        </div>
        <div class="pb-palette-summary"><span>当前方案</span><strong>正在读取…</strong></div>
        <button class="pb-palette-close" type="button" aria-label="关闭色板管理">×</button>
      </header>
      <div class="pb-palette-content">
        <aside class="pb-palette-controls">
          <span class="pb-palette-label">色号系统</span>
          <div class="pb-system-grid"></div>
          <span class="pb-palette-label">颜色数量</span>
          <div class="pb-preset-grid"></div>
          <span class="pb-palette-label">查找与选择</span>
          <input class="pb-palette-search" type="search" placeholder="搜索色号或颜色值" aria-label="搜索色号或颜色值">
          <div class="pb-utility-row">
            <button class="pb-palette-utility" type="button" data-action="all">全选</button>
            <button class="pb-palette-utility" type="button" data-action="clear">清空</button>
          </div>
        </aside>
        <main class="pb-palette-main">
          <div class="pb-palette-loading">正在读取色板…</div>
          <div class="pb-palette-groups" hidden></div>
          <div class="pb-palette-results" hidden></div>
          <div class="pb-swatch-grid" hidden></div>
          <div class="pb-palette-empty" hidden>没有找到对应颜色</div>
        </main>
      </div>
      <footer class="pb-palette-foot">
        <p>设置会保存在当前设备，并自动用于之后打开的工作台。</p>
        <button class="pb-palette-apply" type="button" disabled>应用色板</button>
      </footer>
    </div>`;
  document.body.append(root);

  const elements = {
    summary: root.querySelector('.pb-palette-summary strong'),
    close: root.querySelector('.pb-palette-close'),
    systems: root.querySelector('.pb-system-grid'),
    presets: root.querySelector('.pb-preset-grid'),
    search: root.querySelector('.pb-palette-search'),
    groups: root.querySelector('.pb-palette-groups'),
    results: root.querySelector('.pb-palette-results'),
    grid: root.querySelector('.pb-swatch-grid'),
    empty: root.querySelector('.pb-palette-empty'),
    loading: root.querySelector('.pb-palette-loading'),
    apply: root.querySelector('.pb-palette-apply')
  };

  let paletteData = null;
  let draft = new Set();
  let system = 'MARD';
  let preset = '221';
  let group = '全部';
  let previousFocus = null;

  const readJSON = (key, fallback = null) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  };

  const loadData = async () => {
    const source = await fetch(DATA_CHUNK, { cache: 'force-cache' }).then(response => {
      if (!response.ok) throw new Error('无法读取色板数据');
      return response.text();
    });
    const marker = source.indexOf('let a=JSON.parse(\'{"#FAF4C8"');
    const jsonStart = source.indexOf('\'{', marker) + 1;
    const jsonEnd = source.indexOf('\'),', jsonStart);
    if (marker < 0 || jsonStart < 1 || jsonEnd < 0) throw new Error('色板数据格式不匹配');
    const mapping = JSON.parse(source.slice(jsonStart, jsonEnd));
    const presets = {};
    const pattern = /JSON\.parse\('(\{"version":"3\.0","selectedHexValues":\[[^']*?\],(?:"exportDate":"[^"]*",)?"totalColors":(291|221|144|120|96|72|48|24)\})'\)/g;
    let match;
    while ((match = pattern.exec(source))) {
      if (!presets[match[2]]) presets[match[2]] = JSON.parse(match[1]).selectedHexValues;
    }
    if (Object.keys(mapping).length !== 291 || presetOrder.some(key => !presets[key])) {
      throw new Error('色板数据不完整');
    }
    return { mapping, presets, colors: Object.keys(mapping) };
  };

  const dataPromise = loadData();
  const codeFor = hex => paletteData.mapping[hex]?.[system] || hex;
  const groupFor = hex => {
    const code = codeFor(hex);
    if (system === '盼盼' || system === '咪小窝') {
      const number = Number(code);
      if (!Number.isFinite(number)) return '其他';
      if (number <= 20) return '1-20';
      if (number <= 50) return '21-50';
      if (number <= 100) return '51-100';
      if (number <= 200) return '101-200';
      return '200+';
    }
    return code.match(/^[A-Z]+/i)?.[0]?.toUpperCase() || '其他';
  };

  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  const refreshPreset = () => {
    preset = presetOrder.find(key => {
      const values = paletteData.presets[key];
      return values.length === draft.size && values.every(hex => draft.has(hex));
    }) || null;
  };

  const render = () => {
    if (!paletteData) return;
    refreshPreset();
    elements.systems.innerHTML = systems.map(item => `
      <button class="pb-system-button" type="button" data-system="${item.key}" aria-pressed="${item.key === system}">${item.label}</button>
    `).join('');
    elements.presets.innerHTML = presetOrder.map(key => `
      <button class="pb-preset-button" type="button" data-preset="${key}" aria-pressed="${key === preset}">${key}色</button>
    `).join('');

    const groups = [...new Set(paletteData.colors.map(groupFor))].sort((a, b) => {
      if (a === '其他') return 1;
      if (b === '其他') return -1;
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });
    if (group !== '全部' && !groups.includes(group)) group = '全部';
    elements.groups.innerHTML = ['全部', ...groups].map(value => `
      <button class="pb-group-button" type="button" data-group="${escapeHTML(value)}" aria-pressed="${value === group}">${escapeHTML(value)}</button>
    `).join('');

    const query = elements.search.value.trim().toLowerCase();
    const visibleColors = paletteData.colors.filter(hex => {
      const code = codeFor(hex);
      return (group === '全部' || groupFor(hex) === group) && (!query || hex.toLowerCase().includes(query) || code.toLowerCase().includes(query));
    });
    elements.grid.innerHTML = visibleColors.map(hex => {
      const code = codeFor(hex);
      const selected = draft.has(hex);
      return `<button class="pb-swatch" type="button" data-color="${hex}" aria-pressed="${selected}" aria-label="${selected ? '取消选择' : '选择'}色号 ${escapeHTML(code)}">
        <span class="pb-swatch-color" style="background:${hex}" aria-hidden="true"><span class="pb-swatch-check">✓</span></span>
        <span class="pb-swatch-code">${escapeHTML(code)}</span>
      </button>`;
    }).join('');

    const label = systems.find(item => item.key === system)?.label || 'MARD';
    elements.summary.textContent = `${label} · 已选 ${draft.size} 色`;
    elements.results.innerHTML = `<strong>${group === '全部' ? '全部颜色' : `${escapeHTML(group)} 系列`}</strong><span>显示 ${visibleColors.length} 色 · 已选 ${draft.size} 色</span>`;
    elements.loading.hidden = true;
    elements.groups.hidden = false;
    elements.results.hidden = false;
    elements.grid.hidden = visibleColors.length === 0;
    elements.empty.hidden = visibleColors.length !== 0;
    elements.apply.disabled = draft.size === 0;
    elements.apply.textContent = draft.size ? `应用色板 · ${draft.size} 色` : '请至少选择一种颜色';
  };

  const prepare = async () => {
    if (!paletteData) paletteData = await dataPromise;
    const prefs = readJSON(PREFS_KEY, {});
    system = systems.some(item => item.key === prefs.system) ? prefs.system : 'MARD';
    const saved = readJSON(STORAGE_KEY);
    draft = saved && typeof saved === 'object'
      ? new Set(paletteData.colors.filter(hex => saved[hex] === true))
      : new Set(paletteData.presets['221']);
    if (!draft.size) draft = new Set(paletteData.presets['221']);
    group = '全部';
    elements.search.value = '';
    render();
  };

  const open = () => {
    if (!root.isConnected) document.body.append(root);
    previousFocus = document.activeElement;
    root.hidden = false;
    document.body.classList.add('pb-palette-open');
    elements.close.focus();
    prepare().catch(error => {
      elements.loading.textContent = `${error.message}，请刷新页面后重试。`;
    });
  };
  const close = () => {
    root.hidden = true;
    document.body.classList.remove('pb-palette-open');
    previousFocus?.focus?.();
  };

  root.addEventListener('click', event => {
    if (event.target === root) return close();
    const systemButton = event.target.closest('[data-system]');
    if (systemButton) {
      system = systemButton.dataset.system;
      group = '全部';
      render();
      return;
    }
    const presetButton = event.target.closest('[data-preset]');
    if (presetButton) {
      draft = new Set(paletteData.presets[presetButton.dataset.preset]);
      render();
      return;
    }
    const groupButton = event.target.closest('[data-group]');
    if (groupButton) {
      group = groupButton.dataset.group;
      render();
      return;
    }
    const swatch = event.target.closest('[data-color]');
    if (swatch) {
      const hex = swatch.dataset.color;
      draft.has(hex) ? draft.delete(hex) : draft.add(hex);
      render();
      return;
    }
    const utility = event.target.closest('[data-action]');
    if (utility?.dataset.action === 'all') {
      draft = new Set(paletteData.colors);
      render();
    } else if (utility?.dataset.action === 'clear') {
      draft.clear();
      render();
    }
  });
  elements.search.addEventListener('input', render);
  elements.close.addEventListener('click', close);
  elements.apply.addEventListener('click', () => {
    if (!paletteData || !draft.size) return;
    const selections = Object.fromEntries(paletteData.colors.map(hex => [hex, draft.has(hex)]));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
    localStorage.setItem(PREFS_KEY, JSON.stringify({ system, preset, count: draft.size }));
    window.dispatchEvent(new CustomEvent('pixelbead-palette-applied', {
      detail: { system, preset, count: draft.size, selections }
    }));
    elements.apply.textContent = '已应用到工作台 ✓';
    setTimeout(close, 320);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !root.hidden) close();
  });

  window.PixelBeadPalette = { open, close };
  window.dispatchEvent(new Event('pixelbead-palette-ready'));
})();

/* ===== bundled source: _custom/reference-home.js ===== */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    body.pb-reference-home {
      overflow: hidden !important;
      background: #151319 !important;
    }
    body.pb-reference-home > :not(#pb-reference-home):not(#pb-written-guide):not(#pb-quick-palette):not(script):not(style) {
      visibility: hidden !important;
    }
    #pb-reference-home {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      overflow: hidden;
      isolation: isolate;
      background: #151319;
      font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
    }
    #pb-reference-home::before {
      content: '';
      position: absolute;
      z-index: -2;
      inset: -32px;
      background: url('./_custom/pixelbead-approved-ui-v3.png') center / cover no-repeat;
      filter: blur(24px) brightness(.54) saturate(.9);
      transform: scale(1.06);
    }
    #pb-reference-home::after {
      content: '';
      position: absolute;
      z-index: -1;
      inset: 0;
      background: rgba(11, 9, 14, .12);
      pointer-events: none;
    }
    #pb-reference-home[hidden] { display: none; }

    .pb-reference-scene {
      position: relative;
      width: min(100vw, 177.6833vh);
      aspect-ratio: 1672 / 941;
      flex: none;
      background: url('./_custom/pixelbead-approved-ui-v3.png') center / 100% 100% no-repeat;
      box-shadow: 0 0 80px rgba(0, 0, 0, .4);
    }
    .pb-reference-action {
      position: absolute;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: transparent;
      cursor: pointer;
    }
    .pb-reference-action:focus-visible {
      outline: 3px solid #fff;
      outline-offset: 5px;
    }
    .pb-reference-action:hover { box-shadow: 0 0 24px rgba(255, 255, 255, .45); }

    .pb-upload { left: 25.12%; top: 52.82%; width: 22.91%; height: 6.48%; }
    .pb-blank { left: 25.12%; top: 76.73%; width: 22.91%; height: 5.95%; }
    .pb-workspace { left: 79.25%; top: 3.4%; width: 13.7%; height: 5.85%; }
    .pb-projects { left: 27.05%; top: 3.6%; width: 4.4%; height: 6%; border-radius: 12px; }
    .pb-tutorial { left: 32.6%; top: 3.6%; width: 4.5%; height: 6%; border-radius: 12px; }
    .pb-palette { left: 38.2%; top: 3.6%; width: 4.2%; height: 6%; border-radius: 12px; }
    .pb-upload-zone { position: absolute; left: 23.27%; top: 31.88%; width: 26.73%; height: 30.71%; border-radius: 28px; }
    .pb-reference-preview {
      position: absolute;
      z-index: 1;
      top: 41.23%;
      height: 30.18%;
      box-sizing: border-box;
      margin: 0;
      overflow: hidden;
      border: 0;
      border-radius: 12px;
      background: #fff;
      box-shadow: none;
      pointer-events: none;
    }
    .pb-reference-preview.pb-original-preview { left: 54.55%; width: 15.25%; }
    .pb-reference-preview.pb-bead-preview { left: 72.25%; width: 16.27%; }
    .pb-reference-preview img {
      display: block;
      width: 100%;
      height: 100%;
      padding: 0;
      box-sizing: border-box;
      object-fit: contain;
      background: #fff;
      border-radius: inherit;
    }
    .pb-reference-preview.is-empty {
      border-color: transparent;
      background: transparent;
      box-shadow: none;
    }
    .pb-reference-preview.is-empty img { visibility: hidden; }
    .pb-reference-scene.pb-dragging { outline: 3px solid #fff3c7; outline-offset: -3px; }
    .pb-reference-scene.pb-transitioning::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: rgba(13, 10, 17, .08);
      pointer-events: none;
    }
    .pb-mobile-controls { display: none; }
    .pb-mobile-image-home { display: none; }

    @media (max-width: 700px) {
      #pb-reference-home { display: grid; place-items: center; overflow: hidden; background: #171218; }
      #pb-reference-home::before {
        filter: blur(18px) brightness(.72) saturate(1.05);
        transform: scale(1.12);
      }
      #pb-reference-home::after { background: linear-gradient(transparent 48%, rgba(18, 11, 10, .9)); }
      .pb-reference-scene {
        width: 180vw;
        max-width: none;
        margin: 0;
        box-shadow: 0 16px 50px #0009;
      }
      .pb-reference-action:not(.pb-upload):not(.pb-blank) { display: none; }
      .pb-upload-zone { display: none; }
      .pb-reference-action.pb-upload,
      .pb-reference-action.pb-blank {
        /* 点击热区必须跟背景图里的两个原始按钮重合；不要移到底部，
           否则用户点击看到的按钮时实际点到的是背景图。 */
        position: absolute;
        top: auto;
        bottom: auto;
        z-index: 2;
        color: transparent;
        font-size: 0;
        font-weight: 400;
        letter-spacing: 0;
        border: 0;
        box-shadow: none;
      }
      .pb-reference-action.pb-upload {
        left: 25.12%;
        top: 52.82%;
        width: 22.91%;
        height: 6.48%;
        background: transparent;
      }
      .pb-reference-action.pb-blank {
        left: 25.12%;
        top: 76.73%;
        width: 22.91%;
        height: 5.95%;
        background: transparent;
      }
      /* 保留键盘/辅助技术可识别的按钮，不让视觉按钮被文字样式改变。 */
      .pb-reference-action.pb-upload:focus-visible,
      .pb-reference-action.pb-blank:focus-visible {
        outline: 3px solid #fff;
        outline-offset: 4px;
      }
      /* 兼容旧样式覆盖，确保不会再次变成底部固定按钮。 */
      .pb-reference-action.pb-upload,
      .pb-reference-action.pb-blank {
        position: absolute;
      }
      /* 原移动端底部按钮样式不再使用。 */
      /*
        z-index: 2;
        top: auto;
        bottom: 26px;
        width: calc(50% - 24px);
        height: 54px;
        min-height: 54px;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: .03em;
        border: 1px solid rgba(255, 255, 255, .45);
        box-shadow: 0 10px 28px rgba(0, 0, 0, .5);
      }
      .pb-reference-action.pb-upload {
        left: 16px;
        background: linear-gradient(100deg, #c45dd6, #7952cf);
      }
      .pb-reference-action.pb-blank {
        left: auto;
        right: 16px;
        background: linear-gradient(100deg, #4f91d4, #2d63aa);
      }
      */
    }

    /*
     * 移动端使用独立的竖向内容流。
     * 顶部先完整保留原始场景图，下面再纵向排列同一组原有功能，
     * 避免把横向场景强行塞进手机宽度后裁掉角色和装饰。
     */
    @media (max-width: 700px) {
      body.pb-reference-home {
        overflow: hidden !important;
      }
      #pb-reference-home {
        position: fixed;
        inset: 0;
        display: block;
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: contain;
        background: #171218;
      }
      #pb-reference-home::before {
        inset: 0;
        background:
          radial-gradient(circle at 16% 8%, rgba(102, 120, 187, .22), transparent 30%),
          radial-gradient(circle at 86% 28%, rgba(255, 169, 104, .20), transparent 34%),
          linear-gradient(180deg, #151827 0%, #241b26 52%, #3a241e 100%);
        filter: none;
        transform: none;
      }
      #pb-reference-home::after {
        background: linear-gradient(180deg, rgba(15, 12, 18, .18) 0%, rgba(18, 10, 12, .58) 100%);
      }
      .pb-reference-scene {
        display: none !important;
      }
      .pb-reference-scene > .pb-reference-action,
      .pb-reference-scene > .pb-upload-zone,
      .pb-reference-scene > .pb-reference-preview {
        display: none !important;
      }
      .pb-mobile-controls {
        position: relative;
        z-index: 2;
        display: grid;
        gap: 14px;
        min-height: 100%;
        padding: 22px 14px 34px;
        color: #2b2331;
        background: linear-gradient(180deg, rgba(20, 15, 22, .08) 0%, rgba(20, 13, 16, .12) 36%, rgba(246, 225, 214, .88) 100%);
      }
      .pb-mobile-scene-collage {
        display: grid;
        grid-template-columns: 1fr 1.7fr 1fr;
        width: calc(100% + 28px);
        height: 220px;
        margin: -22px -14px 2px;
        overflow: hidden;
        border-bottom: 1px solid rgba(255, 255, 255, .38);
        box-shadow: 0 16px 30px rgba(16, 11, 20, .24);
        background: #171521;
      }
      .pb-mobile-scene-crop {
        min-width: 0;
        background-image: url('./_custom/pixelbead-approved-ui-v3.png');
        background-repeat: no-repeat;
        background-size: 391px 220px;
        filter: saturate(.96) brightness(.92);
      }
      .pb-mobile-scene-crop.left { background-position: left top; }
      .pb-mobile-scene-crop.center { background-position: center top; border-inline: 1px solid rgba(255, 255, 255, .20); }
      .pb-mobile-scene-crop.right { background-position: right top; }
      .pb-mobile-scene-bottom {
        height: 150px;
        margin: 0 -14px;
        border-top: 1px solid rgba(255, 255, 255, .28);
        border-bottom: 0;
        box-shadow: inset 0 12px 22px rgba(20, 12, 14, .18);
      }
      .pb-mobile-scene-bottom .pb-mobile-scene-crop {
        background-position-y: bottom;
      }
      .pb-mobile-scene-bottom .pb-mobile-scene-crop.center { background-position-x: center; }
      .pb-mobile-intro {
        padding: 2px 2px 0;
        color: #fff;
        text-shadow: 0 2px 14px rgba(0, 0, 0, .55);
      }
      .pb-mobile-intro h1 {
        margin: 0;
        font: 700 24px/1.25 Georgia, "Songti SC", serif;
        letter-spacing: .01em;
      }
      .pb-mobile-intro p {
        margin: 6px 0 0;
        color: rgba(255, 255, 255, .78);
        font-size: 13px;
        line-height: 1.55;
      }
      .pb-mobile-card {
        padding: 16px;
        border: 1px solid rgba(255, 255, 255, .9);
        border-radius: 20px;
        background: rgba(255, 255, 255, .82);
        box-shadow: 0 12px 28px rgba(78, 41, 40, .14), inset 0 1px rgba(255, 255, 255, .9);
        backdrop-filter: blur(12px);
      }
      .pb-mobile-card h2 {
        margin: 0;
        color: #27202e;
        font-size: 18px;
        line-height: 1.35;
      }
      .pb-mobile-card p {
        margin: 6px 0 12px;
        color: #796d7e;
        font-size: 13px;
        line-height: 1.5;
      }
      .pb-mobile-action {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 48px;
        padding: 0 16px;
        border: 0;
        border-radius: 999px;
        color: #fff;
        background: linear-gradient(100deg, #b846e9, #366bf2);
        box-shadow: 0 9px 20px rgba(92, 70, 216, .24);
        font: inherit;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
      }
      .pb-mobile-action.secondary {
        color: #5b4c67;
        border: 1px solid #ddd2df;
        background: rgba(255, 255, 255, .86);
        box-shadow: none;
      }
      .pb-mobile-action:focus-visible,
      .pb-mobile-nav button:focus-visible {
        outline: 3px solid #8b58e8;
        outline-offset: 3px;
      }
      .pb-mobile-action:active,
      .pb-mobile-nav button:active {
        transform: translateY(1px) scale(.99);
      }
      .pb-mobile-nav {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }
      .pb-mobile-nav button {
        min-height: 42px;
        padding: 0 6px;
        border: 1px solid rgba(177, 145, 168, .38);
        border-radius: 13px;
        color: #57465e;
        background: rgba(255, 255, 255, .62);
        font: inherit;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
      }
      .pb-mobile-previews {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }
      .pb-mobile-preview {
        min-width: 0;
        padding: 9px;
        border: 1px solid #eadce6;
        border-radius: 16px;
        background: rgba(255, 255, 255, .82);
      }
      .pb-mobile-preview figcaption {
        margin: 0 0 7px;
        color: #65566c;
        font-size: 12px;
        font-weight: 700;
        text-align: center;
      }
      .pb-mobile-preview img {
        display: block;
        width: 100%;
        height: 132px;
        object-fit: contain;
        border-radius: 10px;
        background: #fff;
      }
      .pb-mobile-preview.is-empty img {
        visibility: hidden;
      }
      .pb-mobile-preview-card[hidden] {
        display: none !important;
      }
      @media (max-width: 360px) {
        .pb-mobile-nav { grid-template-columns: 1fr 1fr; }
        .pb-mobile-nav button:last-child { grid-column: 1 / -1; }
        .pb-mobile-preview img { height: 116px; }
      }

      /* 用户提供的手机版效果图作为手机版唯一视觉排版，功能用透明热区接回原逻辑。 */
      .pb-mobile-controls { display: none !important; }
      .pb-reference-scene { display: none !important; }
      .pb-mobile-image-home {
        display: block;
        position: relative;
        z-index: 2;
        width: 100%;
        min-height: 100dvh;
        background: #171218;
      }
      .pb-mobile-image-stage {
        position: relative;
        width: 100%;
        max-width: 430px;
        min-height: 100dvh;
        margin: 0 auto;
        background: url('./_custom/pixelbead-mobile-ui.png') center top / cover no-repeat;
        aspect-ratio: 724 / 1480;
      }
      /* 手机版顶部不显示系统状态栏时间、网络、电量和灵动岛装饰。 */
      .pb-mobile-image-stage::before {
        content: "";
        position: absolute;
        z-index: 1;
        inset: 0 0 auto;
        height: 42px;
        pointer-events: none;
        background: linear-gradient(180deg, rgba(10, 21, 42, .98), rgba(15, 28, 48, .94));
        backdrop-filter: blur(12px);
      }
      .pb-mobile-image-action {
        position: absolute;
        z-index: 3;
        display: block;
        padding: 0;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: transparent;
        cursor: pointer;
      }
      .pb-mobile-image-action:focus-visible {
        outline: 3px solid #fff;
        outline-offset: 4px;
      }
      .pb-mobile-image-workspace { left: 55.5%; top: 8.0%; width: 21.5%; height: 4.2%; }
      .pb-mobile-image-menu { left: 78.5%; top: 7.8%; width: 8.4%; height: 4.8%; }
      .pb-mobile-image-upload { left: 30%; top: 39.8%; width: 40%; height: 4.3%; }
      .pb-mobile-image-blank { left: 29.8%; top: 53.4%; width: 40.5%; height: 4.4%; }
      .pb-mobile-image-preview {
        position: absolute;
        z-index: 2;
        overflow: hidden;
        margin: 0;
        border-radius: 12px;
        pointer-events: none;
      }
      .pb-mobile-image-preview img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        background: #fff;
      }
      .pb-mobile-image-preview.is-empty { display: none; }
      .pb-mobile-image-preview.pb-mobile-image-original-preview { left: 28.3%; top: 69.6%; width: 25.5%; height: 15.7%; }
      .pb-mobile-image-preview.pb-mobile-image-bead-preview { left: 55.2%; top: 69.6%; width: 25.5%; height: 15.7%; }
      .pb-mobile-image-menu-panel[hidden] { display: none !important; }
      .pb-mobile-image-menu-panel {
        position: absolute;
        z-index: 5;
        top: 13.2%;
        right: 8.5%;
        display: grid;
        gap: 8px;
        width: min(190px, 48%);
        padding: 12px;
        border: 1px solid rgba(255,255,255,.5);
        border-radius: 18px;
        background: rgba(25, 24, 35, .9);
        box-shadow: 0 18px 38px rgba(0,0,0,.32);
        backdrop-filter: blur(14px);
      }
      .pb-mobile-image-menu-panel button {
        min-height: 38px;
        border: 1px solid rgba(255,255,255,.22);
        border-radius: 11px;
        color: #fff;
        background: rgba(255,255,255,.12);
        font: inherit;
        font-size: 13px;
        cursor: pointer;
      }
    }
  `;
  document.head.append(style);

  const root = document.createElement('main');
  root.id = 'pb-reference-home';
  root.hidden = true;
  root.innerHTML = `
    <div class="pb-reference-scene" role="region" aria-label="PixelBead 首页">
      <div class="pb-upload-zone" aria-hidden="true"></div>
      <figure class="pb-reference-preview pb-original-preview is-empty">
        <img alt="原图预览" width="384" height="384" loading="eager" decoding="async">
      </figure>
      <figure class="pb-reference-preview pb-bead-preview is-empty">
        <img alt="拼豆图预览" width="640" height="640" loading="eager" decoding="async">
      </figure>
      <button class="pb-reference-action pb-upload" type="button" aria-label="选择图片，上传图片生成拼豆图，支持 JPG / PNG">选择图片 →</button>
      <button class="pb-reference-action pb-blank" type="button" aria-label="开始创作，手动创建 100×100 空白画板">开始创作 →</button>
      <button class="pb-reference-action pb-workspace" type="button" aria-label="进入工作台">进入工作台 →</button>
      <button class="pb-reference-action pb-projects" type="button" aria-label="查看作品">作品</button>
      <button class="pb-reference-action pb-tutorial" type="button" aria-label="打开教程">教程</button>
      <button class="pb-reference-action pb-palette" type="button" aria-label="打开色板管理">色板</button>
    </div>
    <section class="pb-mobile-controls" aria-label="手机版功能区">
      <div class="pb-mobile-scene-collage" aria-hidden="true">
        <span class="pb-mobile-scene-crop left"></span>
        <span class="pb-mobile-scene-crop center"></span>
        <span class="pb-mobile-scene-crop right"></span>
      </div>
      <div class="pb-mobile-intro">
        <h1>把喜欢的照片，变成可以直接照着拼的拼豆图纸</h1>
        <p>自动配色 · 品牌色号 · 一键去背景 · 高清导出</p>
      </div>
      <div class="pb-mobile-card">
        <h2>上传图片生成拼豆图纸</h2>
        <p>支持 JPG / PNG，选择图片后继续使用原有生成流程。</p>
        <button class="pb-mobile-action pb-mobile-upload" type="button">选择图片 →</button>
      </div>
      <div class="pb-mobile-card">
        <h2>手动创建空白画布</h2>
        <p>创建 100×100 空白画布，自由设计拼豆图。</p>
        <button class="pb-mobile-action secondary pb-mobile-blank" type="button">开始创作 →</button>
      </div>
      <div class="pb-mobile-card">
        <h2>按项目色板标注</h2>
        <p>已经完成的拼豆照片按项目现有色板逐格标注色号并统计数量。</p>
        <button class="pb-mobile-action secondary pb-mobile-label" type="button">选择拼豆照片 →</button>
      </div>
      <div class="pb-mobile-card pb-mobile-preview-card" hidden>
        <h2>效果预览</h2>
        <p>上传图片后，会在这里显示预览效果。</p>
        <div class="pb-mobile-previews">
          <figure class="pb-mobile-preview pb-mobile-original-preview is-empty">
            <figcaption>原图</figcaption>
            <img alt="手机版原图预览" width="320" height="320" loading="lazy" decoding="async">
          </figure>
          <figure class="pb-mobile-preview pb-mobile-bead-preview is-empty">
            <figcaption>拼豆图</figcaption>
            <img alt="手机版拼豆图预览" width="320" height="320" loading="lazy" decoding="async">
          </figure>
        </div>
      </div>
      <div class="pb-mobile-scene-collage pb-mobile-scene-bottom" aria-hidden="true">
        <span class="pb-mobile-scene-crop left"></span>
        <span class="pb-mobile-scene-crop center"></span>
        <span class="pb-mobile-scene-crop right"></span>
      </div>
      <div class="pb-mobile-nav" aria-label="更多页面">
        <button class="pb-mobile-workspace" type="button">工作台</button>
        <button class="pb-mobile-projects" type="button">作品</button>
        <button class="pb-mobile-tutorial" type="button">教程</button>
        <button class="pb-mobile-palette" type="button">色板</button>
      </div>
    </section>
    <section class="pb-mobile-image-home" aria-label="手机版首页效果图">
      <div class="pb-mobile-image-stage">
        <button class="pb-mobile-image-action pb-mobile-image-workspace" type="button" aria-label="进入工作台">进入工作台</button>
        <button class="pb-mobile-image-action pb-mobile-image-menu" type="button" aria-label="打开手机版菜单" aria-expanded="false">菜单</button>
        <button class="pb-mobile-image-action pb-mobile-image-upload" type="button" aria-label="选择图片，上传图片生成拼豆图">选择图片</button>
        <button class="pb-mobile-image-action pb-mobile-image-blank" type="button" aria-label="开始创作，手动创建空白画布">开始创作</button>
        <figure class="pb-mobile-image-preview pb-mobile-image-original-preview is-empty">
          <img alt="手机版原图预览" width="320" height="320" loading="lazy" decoding="async">
        </figure>
        <figure class="pb-mobile-image-preview pb-mobile-image-bead-preview is-empty">
          <img alt="手机版拼豆图预览" width="320" height="320" loading="lazy" decoding="async">
        </figure>
        <div class="pb-mobile-image-menu-panel" hidden>
          <button class="pb-mobile-image-menu-workspace" type="button">进入工作台</button>
          <button class="pb-mobile-image-menu-projects" type="button">作品</button>
          <button class="pb-mobile-image-menu-tutorial" type="button">教程</button>
          <button class="pb-mobile-image-menu-palette" type="button">色板</button>
        </div>
      </div>
    </section>
  `;
  document.body.append(root);

  const blankTrigger = () => [...document.querySelectorAll('p')]
    .find(element => element.textContent.trim() === '手动空白画板编辑')?.parentElement;
  const openUpload = () => document.getElementById('pindou-image-upload-input')?.click();
  const HOME_PREVIEW_KEY = 'pixelbeadHomePreviewV1';
  const HOME_PREVIEW_DB = 'pixelbeadUiState';
  const HOME_PREVIEW_STORE = 'previews';
  const originalPreview = root.querySelector('.pb-original-preview');
  const beadPreview = root.querySelector('.pb-bead-preview');
  const originalPreviewImage = originalPreview.querySelector('img');
  const beadPreviewImage = beadPreview.querySelector('img');
  const mobileOriginalPreview = root.querySelector('.pb-mobile-original-preview');
  const mobileBeadPreview = root.querySelector('.pb-mobile-bead-preview');
  const mobileOriginalPreviewImage = mobileOriginalPreview.querySelector('img');
  const mobileBeadPreviewImage = mobileBeadPreview.querySelector('img');
  const mobilePreviewCard = root.querySelector('.pb-mobile-preview-card');
  const mobileImageOriginalPreview = root.querySelector('.pb-mobile-image-original-preview');
  const mobileImageBeadPreview = root.querySelector('.pb-mobile-image-bead-preview');
  const mobileImageOriginalPreviewImage = mobileImageOriginalPreview.querySelector('img');
  const mobileImageBeadPreviewImage = mobileImageBeadPreview.querySelector('img');

  const readPreviewState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(HOME_PREVIEW_KEY));
      return saved && typeof saved === 'object' ? saved : {};
    } catch {
      return {};
    }
  };
  const openPreviewDatabase = () => new Promise((resolve, reject) => {
    if (!window.indexedDB) return reject(new Error('IndexedDB unavailable'));
    const request = indexedDB.open(HOME_PREVIEW_DB, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(HOME_PREVIEW_STORE)) {
        request.result.createObjectStore(HOME_PREVIEW_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('无法打开预览存储'));
  });
  const readPreviewDatabase = async () => {
    const database = await openPreviewDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(HOME_PREVIEW_STORE, 'readonly');
      const request = transaction.objectStore(HOME_PREVIEW_STORE).get('home');
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error('无法读取预览'));
      transaction.oncomplete = () => database.close();
    });
  };
  const writePreviewDatabase = async state => {
    const database = await openPreviewDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(HOME_PREVIEW_STORE, 'readwrite');
      transaction.objectStore(HOME_PREVIEW_STORE).put(state, 'home');
      transaction.oncomplete = () => {
        database.close();
        resolve();
      };
      transaction.onerror = () => {
        database.close();
        reject(transaction.error || new Error('无法保存预览'));
      };
    });
  };
  let previewState = readPreviewState();
  let previewUploadVersion = 0;
  let staleCanvasData = null;
  let captureNotBefore = 0;
  let previewPersistPromise = Promise.resolve();
  let previewSessionActive = sessionStorage.getItem('pixelbeadHomePreviewSession') === '1';

  const activatePreviewSession = () => {
    previewSessionActive = true;
    try { sessionStorage.setItem('pixelbeadHomePreviewSession', '1'); } catch {}
  };

  const writePreviewState = patch => {
    previewState = { ...previewState, ...patch, updatedAt: Date.now() };
    try { localStorage.setItem(HOME_PREVIEW_KEY, JSON.stringify(previewState)); } catch {}
    const snapshot = { ...previewState };
    previewPersistPromise = writePreviewDatabase(snapshot).catch(() => {});
    return previewPersistPromise;
  };
  const showPreview = (figure, image, source, fallback) => {
    const resolved = previewSessionActive ? (source || fallback) : null;
    const pairs = figure === originalPreview
      ? [[originalPreview, originalPreviewImage], [mobileOriginalPreview, mobileOriginalPreviewImage], [mobileImageOriginalPreview, mobileImageOriginalPreviewImage]]
      : figure === beadPreview
        ? [[beadPreview, beadPreviewImage], [mobileBeadPreview, mobileBeadPreviewImage], [mobileImageBeadPreview, mobileImageBeadPreviewImage]]
        : [[figure, image]];
    pairs.forEach(([targetFigure, targetImage]) => {
      targetFigure.classList.toggle('is-empty', !resolved);
      if (resolved && targetImage.getAttribute('src') !== resolved) targetImage.src = resolved;
    });
    if (resolved && previewSessionActive) mobilePreviewCard.hidden = false;
  };
  const syncMobilePreviewVisibility = () => {
    mobilePreviewCard.hidden = !(previewSessionActive && (previewState.original || previewState.bead));
  };
  const refreshHomePreviews = () => {
    showPreview(originalPreview, originalPreviewImage, previewState.original, null);
    showPreview(beadPreview, beadPreviewImage, previewState.awaiting ? null : previewState.bead, null);
    syncMobilePreviewVisibility();
  };
  const imageFileToPreview = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error || new Error('无法读取图片'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('无法解析图片'));
      image.onload = () => {
        const maxSide = 640;
        const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext('2d');
        if (!context) return reject(new Error('无法创建预览'));
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', .88));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
  const imageElementToPreview = image => {
    if (!image?.naturalWidth || !image?.naturalHeight) return null;
    try {
      const maxSide = 640;
      const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext('2d');
      if (!context) return null;
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg', .88);
    } catch {
      return null;
    }
  };
  const captureCropOriginal = (version, attempts = 0) => {
    const savedState = readPreviewState();
    if ((savedState.updatedAt || 0) > (previewState.updatedAt || 0)) {
      previewState = { ...previewState, ...savedState };
    }
    if (version !== previewUploadVersion || !previewState.awaiting || previewState.original) return;
    const cropImage = document.querySelector('img[alt="待裁剪图片"]');
    const data = imageElementToPreview(cropImage);
    if (data) {
      writePreviewState({ original: data });
      showPreview(originalPreview, originalPreviewImage, data, null);
      return;
    }
    if (attempts < 30) setTimeout(() => captureCropOriginal(version, attempts + 1), 100);
  };
  const canvasToPreview = canvas => {
    if (!canvas?.width || !canvas?.height) return null;
    try {
      const sourceContext = canvas.getContext('2d', { willReadFrequently: true });
      if (!sourceContext) return null;
      const pixels = sourceContext.getImageData(0, 0, canvas.width, canvas.height).data;
      const corners = [
        0,
        (canvas.width - 1) * 4,
        (canvas.height - 1) * canvas.width * 4,
        (canvas.width * canvas.height - 1) * 4
      ];
      const background = [0, 1, 2].map(channel => Math.round(
        corners.reduce((sum, offset) => sum + pixels[offset + channel], 0) / corners.length
      ));
      let minX = canvas.width;
      let minY = canvas.height;
      let maxX = -1;
      let maxY = -1;
      const threshold = 18;
      for (let y = 0; y < canvas.height; y += 1) {
        for (let x = 0; x < canvas.width; x += 1) {
          const offset = (y * canvas.width + x) * 4;
          const differs = Math.max(
            Math.abs(pixels[offset] - background[0]),
            Math.abs(pixels[offset + 1] - background[1]),
            Math.abs(pixels[offset + 2] - background[2])
          ) > threshold;
          if (pixels[offset + 3] > 8 && differs) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      if (maxX < minX || maxY < minY) return null;
      const margin = 4;
      const sourceX = Math.max(0, minX - margin);
      const sourceY = Math.max(0, minY - margin);
      const sourceWidth = Math.min(canvas.width - sourceX, maxX - minX + 1 + margin * 2);
      const sourceHeight = Math.min(canvas.height - sourceY, maxY - minY + 1 + margin * 2);
      const maxSide = 640;
      const scale = Math.min(1, maxSide / Math.max(sourceWidth, sourceHeight));
      const output = document.createElement('canvas');
      output.width = Math.max(1, Math.round(sourceWidth * scale));
      output.height = Math.max(1, Math.round(sourceHeight * scale));
      const context = output.getContext('2d');
      if (!context) return null;
      context.imageSmoothingEnabled = false;
      context.drawImage(
        canvas,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        output.width,
        output.height
      );
      return output.toDataURL('image/png');
    } catch {
      return null;
    }
  };
  const captureGeneratedPreview = (force = false) => {
    if (!previewState.awaiting || (!force && Date.now() < captureNotBefore)) return false;
    if (/生成预览效果中|正在恢复编辑数据|请稍候，正在载入画布/.test(document.body.innerText)) return false;
    const canvas = document.querySelector('canvas[aria-label="拼豆画布"]');
    const data = canvasToPreview(canvas);
    if (!data || data === staleCanvasData) return false;
    writePreviewState({ bead: data, awaiting: false, beadCropVersion: 2 });
    showPreview(beadPreview, beadPreviewImage, data, null);
    return true;
  };
  const normalizeLegacyBeadPreview = () => {
    if (!previewState.bead || previewState.beadCropVersion === 2) return;
    const source = previewState.bead;
    const image = new Image();
    image.onload = () => {
      if (previewState.bead !== source) return;
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.drawImage(image, 0, 0);
      const normalized = canvasToPreview(canvas);
      if (!normalized) return;
      writePreviewState({ bead: normalized, beadCropVersion: 2 });
      showPreview(beadPreview, beadPreviewImage, normalized, null);
    };
    image.src = source;
  };
  refreshHomePreviews();
  normalizeLegacyBeadPreview();
  readPreviewDatabase().then(saved => {
    if (!saved || (previewState.updatedAt && saved.updatedAt < previewState.updatedAt)) return;
    previewState = { ...previewState, ...saved };
    try { localStorage.setItem(HOME_PREVIEW_KEY, JSON.stringify(previewState)); } catch {}
    refreshHomePreviews();
    normalizeLegacyBeadPreview();
  }).catch(() => {});

  let entered = false;
  let seenEditor = false;
  let transitioning = false;
  let paletteSystemCanvas = null;

  const applySavedPaletteSystem = () => {
    const canvas = document.querySelector('canvas[aria-label="拼豆画布"]');
    if (!canvas || canvas === paletteSystemCanvas) return;
    let prefs = null;
    try { prefs = JSON.parse(localStorage.getItem('pixelbeadPalettePrefs')); } catch {}
    const label = {
      MARD: 'MARD',
      COCO: 'COCO',
      '漫漫': 'ManMan',
      '盼盼': 'PanPan',
      '咪小窝': 'MiXiaoWo'
    }[prefs?.system];
    if (!label || label === 'MARD') {
      paletteSystemCanvas = canvas;
      return;
    }
    const target = [...document.querySelectorAll('button')].find(button =>
      !button.closest('#pb-quick-palette') && button.textContent.trim() === label
    );
    if (!target) return;
    paletteSystemCanvas = canvas;
    window.__pbApplyingSavedSystem = true;
    target.click();
    queueMicrotask(() => { window.__pbApplyingSavedSystem = false; });
  };

  const leave = () => {
    entered = true;
    transitioning = false;
    root.querySelector('.pb-reference-scene')?.classList.remove('pb-transitioning');
    root.hidden = true;
    document.body.classList.remove('pb-reference-home');
  };

  const visible = element => Boolean(element && element.getClientRects().length &&
    getComputedStyle(element).visibility !== 'hidden' && getComputedStyle(element).display !== 'none');
  const editorReady = () => document.querySelector('canvas[aria-label="拼豆画布"]') ||
    [...document.querySelectorAll('button')].find(button => button.textContent.trim() === '色板管理');
  const waitFor = (findTarget, maxAttempts = 80) => new Promise(resolve => {
    let attempts = 0;
    const check = () => {
      attempts += 1;
      const target = findTarget();
      if (target || attempts >= maxAttempts) {
        resolve(target || null);
        return;
      }
      setTimeout(check, 100);
    };
    check();
  });

  const enterWorkspace = async (options = {}) => {
    const trigger = blankTrigger();
    if (!trigger) return;
    transitioning = true;
    root.hidden = false;
    root.querySelector('.pb-reference-scene')?.classList.add('pb-transitioning');
    document.body.classList.add('pb-reference-home');
    trigger.click();
    const ready = await waitFor(editorReady);
    if (!ready) {
      transitioning = false;
      root.querySelector('.pb-reference-scene')?.classList.remove('pb-transitioning');
      sync();
      return;
    }
    if (options.activate) {
      const target = await waitFor(options.activate);
      if (!target) {
        leave();
        return;
      }
      target.click();
      if (options.revealWhen) await waitFor(options.revealWhen);
    }
    leave();
  };

  const sync = () => {
    if (!root.isConnected) document.body.append(root);
    const latestPreviewState = readPreviewState();
    if (latestPreviewState.awaiting && !latestPreviewState.original) {
      captureCropOriginal(previewUploadVersion);
    }
    const hasHome = Boolean(blankTrigger());
    applySavedPaletteSystem();
    if (entered && !hasHome) seenEditor = true;
    if (seenEditor && hasHome) {
      entered = false;
      seenEditor = false;
    }
    const pn = location.pathname.replace(/\/index\.html$/, '/');
    const show = /^\/(?:[^\/]+\/)?(?:app\/[^\/]+\/?|6\/?)?$/.test(pn) &&
      (transitioning || (!entered && hasHome));
    if (root.hidden === show) root.hidden = !show;
    document.body.classList.toggle('pb-reference-home', show);
  };

  root.querySelector('.pb-upload').addEventListener('click', openUpload);
  root.querySelector('.pb-blank').addEventListener('click', () => enterWorkspace());
  root.querySelector('.pb-workspace').addEventListener('click', () => enterWorkspace());
  root.querySelector('.pb-projects').addEventListener('click', () => { location.href = './projects/'; });
  root.querySelector('.pb-tutorial').addEventListener('click', () => {
    window.PixelBeadGuide?.open();
  });
  root.querySelector('.pb-palette').addEventListener('click', () => {
    if (window.PixelBeadPalette?.open) {
      window.PixelBeadPalette.open();
      return;
    }
    window.addEventListener('pixelbead-palette-ready', () => window.PixelBeadPalette?.open(), { once: true });
  });
  root.querySelector('.pb-mobile-upload').addEventListener('click', () => {
    // 复用桌面端同一个上传热区，让“按项目色板标注/生成拼豆图”的选择弹层保持一致。
    root.querySelector('.pb-upload')?.click();
  });
  root.querySelector('.pb-mobile-blank').addEventListener('click', () => enterWorkspace());
  root.querySelector('.pb-mobile-workspace').addEventListener('click', () => enterWorkspace());
  root.querySelector('.pb-mobile-projects').addEventListener('click', () => { location.href = './projects/'; });
  root.querySelector('.pb-mobile-tutorial').addEventListener('click', () => {
    window.PixelBeadGuide?.open();
  });
  root.querySelector('.pb-mobile-palette').addEventListener('click', () => {
    if (window.PixelBeadPalette?.open) {
      window.PixelBeadPalette.open();
      return;
    }
    window.addEventListener('pixelbead-palette-ready', () => window.PixelBeadPalette?.open(), { once: true });
  });
  root.querySelector('.pb-mobile-label').addEventListener('click', () => {
    document.getElementById('pb-bead-photo-input')?.click();
  });
  const mobileImageMenu = root.querySelector('.pb-mobile-image-menu');
  const mobileImageMenuPanel = root.querySelector('.pb-mobile-image-menu-panel');
  const closeMobileImageMenu = () => {
    mobileImageMenuPanel.hidden = true;
    mobileImageMenu.setAttribute('aria-expanded', 'false');
  };
  mobileImageMenu.addEventListener('click', event => {
    event.stopPropagation();
    const open = mobileImageMenuPanel.hidden;
    mobileImageMenuPanel.hidden = !open;
    mobileImageMenu.setAttribute('aria-expanded', String(open));
  });
  root.querySelector('.pb-mobile-image-workspace').addEventListener('click', () => enterWorkspace());
  root.querySelector('.pb-mobile-image-upload').addEventListener('click', () => root.querySelector('.pb-upload')?.click());
  root.querySelector('.pb-mobile-image-blank').addEventListener('click', () => enterWorkspace());
  root.querySelector('.pb-mobile-image-menu-workspace').addEventListener('click', () => { closeMobileImageMenu(); enterWorkspace(); });
  root.querySelector('.pb-mobile-image-menu-projects').addEventListener('click', () => { location.href = './projects/'; });
  root.querySelector('.pb-mobile-image-menu-tutorial').addEventListener('click', () => { closeMobileImageMenu(); window.PixelBeadGuide?.open(); });
  root.querySelector('.pb-mobile-image-menu-palette').addEventListener('click', () => {
    closeMobileImageMenu();
    if (window.PixelBeadPalette?.open) {
      window.PixelBeadPalette.open();
      return;
    }
    window.addEventListener('pixelbead-palette-ready', () => window.PixelBeadPalette?.open(), { once: true });
  });

  const scene = root.querySelector('.pb-reference-scene');
  scene.addEventListener('dragover', event => {
    event.preventDefault();
    scene.classList.add('pb-dragging');
  });
  scene.addEventListener('dragleave', () => scene.classList.remove('pb-dragging'));
  scene.addEventListener('drop', event => {
    event.preventDefault();
    scene.classList.remove('pb-dragging');
    const input = document.getElementById('pindou-image-upload-input');
    const file = [...event.dataTransfer.files].find(item => item.type.startsWith('image/'));
    if (!input || !file) return;
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  document.addEventListener('change', event => {
    if (event.target.id !== 'pindou-image-upload-input' || !event.target.files?.length) return;
    const file = [...event.target.files].find(item => item.type.startsWith('image/'));
    if (file) {
      activatePreviewSession();
      previewUploadVersion += 1;
      const version = previewUploadVersion;
      const currentCanvas = document.querySelector('canvas[aria-label="拼豆画布"]');
      staleCanvasData = canvasToPreview(currentCanvas);
      captureNotBefore = Date.now() + 1200;
      writePreviewState({ original: null, bead: null, awaiting: true, beadCropVersion: null });
      syncMobilePreviewVisibility();
      let objectURL = null;
      try { objectURL = URL.createObjectURL(file); } catch {}
      if (objectURL) showPreview(originalPreview, originalPreviewImage, objectURL, null);
      beadPreview.classList.add('is-empty');
      imageFileToPreview(file).then(data => {
        if (version !== previewUploadVersion) return;
        writePreviewState({ original: data });
        showPreview(originalPreview, originalPreviewImage, data, null);
      }).catch(() => captureCropOriginal(version)).finally(() => {
        if (objectURL) URL.revokeObjectURL(objectURL);
      });
      setTimeout(() => captureCropOriginal(version), 100);
    }
    leave();
  }, true);

  window.setInterval(() => {
    const latestPreviewState = readPreviewState();
    if (latestPreviewState.awaiting && !latestPreviewState.original) {
      captureCropOriginal(previewUploadVersion);
    }
    if (root.hidden) captureGeneratedPreview(false);
  }, 900);

  document.addEventListener('click', event => {
    const back = event.target.closest('button[aria-label="返回首页"],button[aria-label="返回"]');
    if (!back) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    captureGeneratedPreview(true);
    previewPersistPromise.finally(() => {
      entered = false;
      seenEditor = false;
      location.assign('./');
    });
  }, true);

  new MutationObserver(sync).observe(document.body, { childList: true, subtree: true });
  window.addEventListener('pageshow', sync);
  window.addEventListener('popstate', sync);
  sync();
  document.body.classList.add('pb-ui-ready');
})();

/* ===== bundled source: _custom/site-theme.js ===== */
/* PixelBead shared visual language for functional pages.
 * Keeps the original React structure and behavior intact; only adds page markers
 * and presentation overrides for projects, crop, and editor states.
 */
(() => {
  'use strict';

  const style = document.createElement('style');
  style.textContent = `
    :root {
      --pb-ink: #292433;
      --pb-muted: #766d7a;
      --pb-cream: #fff8f1;
      --pb-peach: #f2d8ca;
      --pb-line: rgba(142, 103, 96, .20);
      --pb-purple: #a83be4;
      --pb-blue: #3268f3;
      --pb-navy: #15192a;
      --pb-glow: rgba(255, 157, 77, .24);
      --pb-shadow: 0 18px 46px rgba(77, 47, 43, .13);
    }

    body.pb-app-theme:not(.pb-reference-home) {
      min-height: 100dvh;
      color: var(--pb-ink) !important;
      background: #efe5dc !important;
      font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif !important;
    }
    body.pb-app-theme:not(.pb-reference-home) > div[class*="min-h-"] {
      position: relative;
      isolation: isolate;
      background:
        radial-gradient(circle at 13% 8%, rgba(255, 186, 119, .22), transparent 31%),
        radial-gradient(circle at 88% 3%, rgba(121, 90, 213, .15), transparent 30%),
        linear-gradient(145deg, #fbf4ed 0%, #f2e7df 55%, #eee3db 100%) !important;
    }
    body.pb-app-theme:not(.pb-reference-home) > div[class*="min-h-"]::before {
      content: "";
      position: fixed;
      z-index: -1;
      inset: 0;
      pointer-events: none;
      opacity: .5;
      background-image:
        linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px);
      background-size: 42px 42px;
      mask-image: linear-gradient(to bottom, #000, transparent 70%);
    }
    body.pb-app-theme:not(.pb-reference-home) header {
      border-color: rgba(255,255,255,.17) !important;
      color: #fff !important;
      background: linear-gradient(112deg, rgba(18, 23, 41, .96), rgba(35, 31, 48, .92)) !important;
      box-shadow: 0 12px 34px rgba(25, 18, 27, .17), inset 0 -1px rgba(255,255,255,.08);
      backdrop-filter: blur(24px) saturate(1.15) !important;
    }
    body.pb-app-theme:not(.pb-reference-home) header h1,
    body.pb-app-theme:not(.pb-reference-home) header [class*="text-gray"],
    body.pb-app-theme:not(.pb-reference-home) header [class*="text-[#"] {
      color: #fff !important;
    }
    body.pb-app-theme:not(.pb-reference-home) button,
    body.pb-app-theme:not(.pb-reference-home) label,
    body.pb-app-theme:not(.pb-reference-home) input,
    body.pb-app-theme:not(.pb-reference-home) select {
      transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, background-color .18s ease !important;
    }
    body.pb-app-theme:not(.pb-reference-home) button:active,
    body.pb-app-theme:not(.pb-reference-home) label[role="button"]:active {
      transform: translateY(1px) scale(.99);
    }
    body.pb-app-theme:not(.pb-reference-home) input[type="range"] {
      accent-color: var(--pb-purple) !important;
    }
    body.pb-app-theme:not(.pb-reference-home) input[type="text"],
    body.pb-app-theme:not(.pb-reference-home) input[type="number"],
    body.pb-app-theme:not(.pb-reference-home) select {
      border-color: rgba(116, 84, 92, .18) !important;
      background: rgba(255,255,255,.74) !important;
    }
    body.pb-app-theme:not(.pb-reference-home) input:focus,
    body.pb-app-theme:not(.pb-reference-home) select:focus {
      outline: none !important;
      border-color: rgba(168, 59, 228, .48) !important;
      box-shadow: 0 0 0 4px rgba(168, 59, 228, .09) !important;
    }
    body.pb-app-theme:not(.pb-reference-home) .ios-primary-button,
    body.pb-app-theme:not(.pb-reference-home) button[class*="bg-blue-500"] {
      border: 0 !important;
      color: #fff !important;
      background: linear-gradient(100deg, var(--pb-purple), var(--pb-blue)) !important;
      box-shadow: 0 10px 25px rgba(92, 71, 224, .25) !important;
    }
    body.pb-app-theme:not(.pb-reference-home) .ios-primary-button:hover,
    body.pb-app-theme:not(.pb-reference-home) button[class*="bg-blue-500"]:hover {
      filter: brightness(1.06);
      transform: translateY(-1px);
      box-shadow: 0 14px 30px rgba(92, 71, 224, .31) !important;
    }

    /* Projects: spacious gallery / library. */
    body.pb-page-projects header > div {
      max-width: 1180px !important;
      height: 76px !important;
    }
    body.pb-page-projects header button {
      border: 1px solid rgba(255,255,255,.20) !important;
      color: #fff !important;
      background: rgba(255,255,255,.10) !important;
      box-shadow: inset 0 1px rgba(255,255,255,.12), 0 8px 22px rgba(0,0,0,.16) !important;
    }
    body.pb-page-projects header button:last-child {
      background: linear-gradient(100deg, var(--pb-purple), var(--pb-blue)) !important;
      box-shadow: 0 8px 24px rgba(96, 69, 226, .38) !important;
    }
    body.pb-page-projects header h1 {
      font-family: Georgia, "Songti SC", serif;
      font-size: 21px !important;
      letter-spacing: .12em !important;
    }
    body.pb-page-projects main {
      max-width: 1180px !important;
      padding-top: 34px !important;
    }
    body.pb-page-projects main > section:first-child h2 {
      font-family: Georgia, "Songti SC", serif;
      font-size: clamp(32px, 4vw, 44px) !important;
      color: #342a35 !important;
      letter-spacing: -.03em !important;
    }
    body.pb-page-projects main > section:first-child p {
      color: #84737c !important;
      font-size: 14px !important;
    }
    body.pb-page-projects main > section:first-child > button {
      border: 1px solid rgba(168, 59, 228, .20) !important;
      color: #7440bd !important;
      background: rgba(255,255,255,.72) !important;
      box-shadow: 0 10px 26px rgba(70, 42, 53, .10) !important;
    }
    body.pb-page-projects main > div[class*="rounded-[26px]"] {
      border: 1px solid rgba(255,255,255,.78) !important;
      background: rgba(255, 250, 246, .78) !important;
      box-shadow: var(--pb-shadow), inset 0 1px rgba(255,255,255,.82) !important;
      backdrop-filter: blur(18px) saturate(1.08);
    }
    body.pb-page-projects main > div[class*="rounded-[26px]"] > div:first-child {
      background: rgba(92, 76, 101, .09) !important;
    }
    body.pb-page-projects main > div[class*="rounded-[26px]"] > div:first-child button[class*="bg-white"] {
      color: #442f51 !important;
      background: rgba(255,255,255,.94) !important;
      box-shadow: 0 6px 18px rgba(76, 47, 66, .11) !important;
    }
    body.pb-page-projects main > div[class*="rounded-[26px]"] label {
      border-color: rgba(127, 95, 102, .18) !important;
      background: rgba(255,255,255,.62) !important;
    }
    body.pb-page-projects article {
      overflow: hidden;
      border: 1px solid rgba(255,255,255,.82) !important;
      background: rgba(255, 251, 247, .88) !important;
      box-shadow: 0 16px 38px rgba(76, 47, 52, .11) !important;
      backdrop-filter: blur(14px);
    }
    body.pb-page-projects article:hover {
      transform: translateY(-5px) !important;
      box-shadow: 0 23px 48px rgba(76, 47, 52, .17), 0 0 0 1px rgba(211, 150, 116, .25) !important;
    }
    body.pb-page-projects article > div:first-child {
      background:
        radial-gradient(circle at 50% 40%, rgba(255,255,255,.84), transparent 42%),
        linear-gradient(145deg, #eaded5, #d9d2dc) !important;
    }
    body.pb-page-projects article > div:last-child {
      border-top: 1px solid rgba(130, 91, 94, .10);
    }

    /* Editor: canvas first, compact controls, denser workbench rhythm. */
    body.pb-page-editor > div[class*="min-h-"] {
      background:
        radial-gradient(circle at 7% 12%, rgba(255, 168, 89, .20), transparent 28%),
        radial-gradient(circle at 92% 18%, rgba(113, 83, 210, .16), transparent 31%),
        linear-gradient(135deg, #efe5dd, #e7e0df) !important;
    }
    body.pb-page-editor header > div {
      max-width: 1540px !important;
      padding-top: 10px !important;
      padding-bottom: 10px !important;
    }
    body.pb-page-editor header img {
      border-color: rgba(255,255,255,.28) !important;
      background: rgba(255,255,255,.94) !important;
      box-shadow: 0 5px 18px rgba(0,0,0,.18) !important;
    }
    body.pb-page-editor header label,
    body.pb-page-editor header button {
      border: 1px solid rgba(255,255,255,.20) !important;
      color: rgba(255,255,255,.88) !important;
      background: rgba(255,255,255,.09) !important;
    }
    body.pb-page-editor header label:hover,
    body.pb-page-editor header button:hover {
      color: #fff !important;
      border-color: rgba(255,255,255,.42) !important;
      background: rgba(255,255,255,.15) !important;
    }
    body.pb-page-editor div[class*="grid-cols-[minmax(0,1fr)_420px]"] {
      grid-template-columns: minmax(0, 1fr) 380px !important;
      gap: 18px !important;
    }
    body.pb-page-editor .workspace-stage {
      border: 1px solid rgba(255, 190, 131, .34) !important;
      border-radius: 24px !important;
      background: linear-gradient(145deg, rgba(34,31,42,.97), rgba(18,24,40,.98)) !important;
      box-shadow: 0 24px 56px rgba(38, 25, 33, .22), inset 0 1px rgba(255,255,255,.11), 0 0 0 5px rgba(255,255,255,.28) !important;
    }
    body.pb-page-editor aside > div,
    body.pb-page-editor div[class*="lg:hidden"] > div[class*="rounded-2xl"] {
      border: 1px solid rgba(255,255,255,.82) !important;
      border-radius: 24px !important;
      background: rgba(255, 250, 246, .84) !important;
      box-shadow: var(--pb-shadow), inset 0 1px rgba(255,255,255,.90) !important;
      backdrop-filter: blur(18px) saturate(1.08) !important;
    }
    body.pb-page-editor aside h2,
    body.pb-page-editor aside h3 {
      color: #3a2e3d !important;
    }
    body.pb-page-editor aside button[class*="bg-blue"],
    body.pb-page-editor aside button[class*="bg-[#"] {
      color: #fff !important;
      background: linear-gradient(100deg, var(--pb-purple), var(--pb-blue)) !important;
      box-shadow: 0 8px 20px rgba(93, 70, 221, .20) !important;
    }
    body.pb-page-editor button[aria-label="打开使用教程"],
    body.pb-page-editor button[data-pb-guide-trigger="true"] {
      border: 1px solid rgba(255,255,255,.72) !important;
      color: #fff !important;
      background: linear-gradient(150deg, #b04add, #396ff0) !important;
      box-shadow: 0 12px 28px rgba(89, 58, 184, .30) !important;
    }

    /* Crop: a focused single-task composition studio. */
    body.pb-page-crop > div[class*="min-h-"] {
      background:
        radial-gradient(circle at 10% 10%, rgba(255, 171, 91, .20), transparent 30%),
        radial-gradient(circle at 92% 24%, rgba(144, 72, 185, .14), transparent 32%),
        linear-gradient(145deg, #f2e7de, #e8dcd5) !important;
    }
    body.pb-page-crop header > div,
    body.pb-page-crop main,
    body.pb-page-crop > div > div[class*="sticky"][class*="bottom-0"] > div {
      max-width: 1380px !important;
    }
    body.pb-page-crop header [class*="text-red"] {
      color: #ffc68f !important;
    }
    body.pb-page-crop header button {
      border-color: rgba(255,255,255,.22) !important;
      color: #fff !important;
      background: rgba(255,255,255,.09) !important;
      box-shadow: inset 0 1px rgba(255,255,255,.12) !important;
    }
    body.pb-page-crop main {
      grid-template-columns: minmax(0, 1fr) 340px !important;
      gap: 20px !important;
      padding-top: 20px !important;
      padding-bottom: 20px !important;
    }
    body.pb-page-crop main > section {
      border: 1px solid rgba(255, 184, 122, .42) !important;
      border-radius: 26px !important;
      box-shadow: 0 25px 58px rgba(43, 24, 29, .28), 0 0 0 5px rgba(255,255,255,.32) !important;
    }
    body.pb-page-crop aside > div {
      border: 1px solid rgba(255,255,255,.82) !important;
      border-radius: 22px !important;
      background: rgba(255, 249, 244, .86) !important;
      box-shadow: 0 15px 34px rgba(76, 47, 52, .12), inset 0 1px rgba(255,255,255,.90) !important;
      backdrop-filter: blur(16px);
    }
    body.pb-page-crop aside > div button {
      border-color: rgba(133, 98, 103, .18) !important;
      color: #514552 !important;
      background: rgba(255,255,255,.70) !important;
    }
    body.pb-page-crop > div > div[class*="sticky"][class*="bottom-0"] {
      border-color: rgba(255,255,255,.52) !important;
      background: rgba(255, 249, 244, .80) !important;
      box-shadow: 0 -12px 34px rgba(60, 39, 45, .10) !important;
      backdrop-filter: blur(22px) saturate(1.08) !important;
    }
    body.pb-page-crop > div > div[class*="sticky"][class*="bottom-0"] button {
      border-radius: 14px !important;
    }
    body.pb-page-crop > div > div[class*="sticky"][class*="bottom-0"] button:last-child {
      border-color: rgba(103, 78, 208, .28) !important;
      color: #6b50ca !important;
      background: rgba(255,255,255,.78) !important;
    }

    @media (max-width: 1023px) {
      body.pb-page-editor div[class*="grid-cols-[minmax(0,1fr)_420px]"] {
        grid-template-columns: minmax(0, 1fr) !important;
      }
      body.pb-page-crop main {
        grid-template-columns: 1fr !important;
      }
    }
    @media (max-width: 700px) {
      body.pb-app-theme:not(.pb-reference-home) header > div {
        min-height: 62px;
      }
      body.pb-page-projects main {
        padding-top: 22px !important;
      }
      body.pb-page-projects main > section:first-child h2 {
        font-size: 30px !important;
      }
      body.pb-page-projects article {
        border-radius: 18px !important;
      }
      body.pb-page-editor .workspace-stage {
        min-height: 54vh;
        border-radius: 20px !important;
      }
      body.pb-page-crop main {
        gap: 14px !important;
        padding: 14px 12px !important;
      }
      body.pb-page-crop main > section {
        border-radius: 20px !important;
      }
      body.pb-page-crop aside {
        display: grid !important;
        grid-template-columns: 1fr 1fr;
        gap: 12px !important;
      }
      body.pb-page-crop aside > div:last-of-type,
      body.pb-page-crop aside > p {
        grid-column: 1 / -1;
      }
    }
  `;
  document.head.appendChild(style);

  const pageClasses = ['pb-page-projects', 'pb-page-editor', 'pb-page-crop'];
  let scheduled = false;

  function classify() {
    scheduled = false;
    const text = document.body?.innerText || '';
    let page = '';

    if (/\/projects\/?$/.test(location.pathname) || text.includes('我的项目')) {
      page = 'pb-page-projects';
    } else if (text.includes('裁剪图片') && text.includes('确认裁剪')) {
      page = 'pb-page-crop';
    } else if (document.querySelector('canvas[aria-label="拼豆画布"]') || text.includes('工作模式')) {
      page = 'pb-page-editor';
    }

    document.body.classList.remove(...pageClasses);
    document.body.classList.toggle('pb-app-theme', Boolean(page));
    if (page) document.body.classList.add(page);
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(classify);
  }

  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('popstate', schedule);
  window.addEventListener('hashchange', schedule);
  [0, 120, 450, 1100, 2200].forEach(ms => setTimeout(schedule, ms));
})();

/* ===== bundled source: _custom/editor-layout.js ===== */
/* PixelBead editor three-pane layout.
 * The original React controls stay mounted and keep all existing handlers.
 * Desktop-only proxy buttons in the left rail forward actions to those controls;
 * the right rail only groups the original cards into tabs.
 */
(() => {
  'use strict';

  const style = document.createElement('style');
  style.id = 'pb-editor-three-pane-style';
  style.textContent = `
    body.pb-editor-three-pane {
      overflow: hidden !important;
      background: #151319 !important;
    }
    body.pb-editor-three-pane > div[class*="min-h-"] {
      min-height: 100dvh !important;
      height: 100dvh !important;
      overflow: hidden !important;
      color: #292433 !important;
      background:
        linear-gradient(115deg, rgba(13, 15, 25, .74), rgba(37, 23, 22, .56)),
        url('./_custom/pixelbead-approved-ui-v3.png') center / cover fixed !important;
    }
    body.pb-editor-three-pane > div[class*="min-h-"]::before {
      content: '';
      position: fixed;
      z-index: -1;
      inset: 0;
      pointer-events: none;
      background:
        radial-gradient(circle at 18% 24%, rgba(255, 180, 93, .18), transparent 29%),
        radial-gradient(circle at 85% 12%, rgba(100, 92, 224, .16), transparent 30%),
        rgba(9, 9, 15, .20);
      backdrop-filter: blur(9px) saturate(.9);
    }

    body.pb-editor-three-pane header {
      position: relative !important;
      z-index: 80 !important;
      flex: 0 0 68px !important;
      height: 68px !important;
      border-bottom: 1px solid rgba(255, 255, 255, .18) !important;
      background: linear-gradient(112deg, rgba(19, 22, 37, .88), rgba(43, 31, 39, .82)) !important;
      box-shadow: 0 14px 34px rgba(7, 7, 12, .28), inset 0 -1px rgba(255,255,255,.08) !important;
      backdrop-filter: blur(24px) saturate(1.15) !important;
    }
    body.pb-editor-three-pane header > div {
      width: 100% !important;
      max-width: none !important;
      min-height: 68px !important;
      padding: 10px 22px !important;
      box-sizing: border-box !important;
    }
    body.pb-editor-three-pane header img {
      width: 42px !important;
      height: 42px !important;
      border: 1px solid rgba(255,255,255,.42) !important;
      border-radius: 13px !important;
      background: rgba(255,255,255,.96) !important;
      box-shadow: 0 7px 20px rgba(0,0,0,.24) !important;
    }
    body.pb-editor-three-pane header [class*="text-gray"],
    body.pb-editor-three-pane header [class*="text-[#"] {
      color: #fff !important;
    }
    body.pb-editor-three-pane header button,
    body.pb-editor-three-pane header label {
      min-height: 38px !important;
      border: 1px solid rgba(255,255,255,.21) !important;
      border-radius: 12px !important;
      color: rgba(255,255,255,.91) !important;
      background: rgba(255,255,255,.10) !important;
      box-shadow: inset 0 1px rgba(255,255,255,.10), 0 7px 18px rgba(0,0,0,.14) !important;
    }
    body.pb-editor-three-pane header button:hover,
    body.pb-editor-three-pane header label:hover {
      color: #fff !important;
      border-color: rgba(255,255,255,.42) !important;
      background: rgba(255,255,255,.17) !important;
    }
    body.pb-editor-three-pane header button:last-child {
      border-color: rgba(163, 133, 255, .52) !important;
      background: linear-gradient(100deg, #ad42e6, #3471f4) !important;
      box-shadow: 0 9px 24px rgba(82, 65, 216, .34) !important;
    }

    body.pb-editor-three-pane > div[class*="min-h-"] > div[class*="flex-1"] {
      min-height: 0 !important;
      overflow: hidden !important;
    }
    body.pb-editor-three-pane .pb-editor-shell {
      width: 100% !important;
      max-width: none !important;
      height: 100% !important;
      min-height: 0 !important;
      padding: 16px 18px 18px !important;
      box-sizing: border-box !important;
    }
    body.pb-editor-three-pane.pb-page-editor div.pb-editor-grid {
      display: grid !important;
      grid-template-columns: 176px minmax(0, 1fr) 344px !important;
      grid-template-rows: minmax(0, 1fr) !important;
      gap: 14px !important;
      width: 100% !important;
      height: 100% !important;
      min-height: 0 !important;
    }
    body.pb-editor-three-pane .pb-editor-main {
      grid-column: 2 !important;
      grid-row: 1 !important;
      min-width: 0 !important;
      min-height: 0 !important;
      height: 100% !important;
    }
    body.pb-editor-three-pane .workspace-stage {
      min-height: 0 !important;
      height: 100% !important;
      max-height: none !important;
      border: 1px solid rgba(255, 190, 132, .54) !important;
      border-radius: 22px !important;
      background: linear-gradient(145deg, rgba(28, 27, 38, .96), rgba(13, 18, 31, .98)) !important;
      box-shadow:
        0 24px 58px rgba(4, 4, 10, .34),
        0 0 0 4px rgba(255,255,255,.17),
        inset 0 1px rgba(255,255,255,.12) !important;
    }
    body.pb-editor-three-pane .workspace-stage > div:last-child {
      border-color: rgba(255,255,255,.20) !important;
      color: rgba(255,255,255,.86) !important;
      background: rgba(18, 18, 27, .64) !important;
      backdrop-filter: blur(12px) !important;
    }

    .pb-editor-left {
      position: fixed;
      z-index: 70;
      top: 84px;
      bottom: 18px;
      left: 18px;
      width: 176px;
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,.49);
      border-radius: 22px;
      color: #302738;
      background: rgba(255, 247, 241, .82);
      box-shadow: 0 20px 46px rgba(6,5,10,.24), inset 0 1px rgba(255,255,255,.9);
      backdrop-filter: blur(22px) saturate(1.08);
    }
    .pb-editor-left-head {
      flex: 0 0 auto;
      padding: 17px 15px 12px;
      border-bottom: 1px solid rgba(120, 84, 90, .12);
    }
    .pb-editor-left-title {
      margin: 0;
      font-size: 15px;
      font-weight: 800;
      letter-spacing: .05em;
      color: #30283a;
    }
    .pb-editor-left-subtitle {
      margin: 5px 0 0;
      font-size: 11px;
      color: #827582;
    }
    .pb-editor-mode-list {
      display: grid;
      grid-template-columns: 1fr;
      gap: 7px;
      margin-top: 12px;
    }
    .pb-editor-tools-scroll {
      min-height: 0;
      overflow-y: auto;
      padding: 13px 11px 15px;
      scrollbar-width: thin;
      scrollbar-color: rgba(107, 80, 119, .28) transparent;
    }
    .pb-editor-tools-label {
      display: block;
      margin: 0 4px 9px;
      color: #827582;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .08em;
    }
    .pb-editor-tools-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }
    .pb-editor-proxy {
      min-width: 0;
      min-height: 39px;
      padding: 8px 5px;
      overflow: hidden;
      border: 1px solid rgba(121, 93, 106, .16);
      border-radius: 11px;
      color: #514553;
      background: rgba(255,255,255,.67);
      box-shadow: inset 0 1px rgba(255,255,255,.8);
      font: 700 11px/1.2 -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease, background .18s ease;
    }
    .pb-editor-proxy:hover {
      border-color: rgba(129, 77, 190, .34);
      background: rgba(255,255,255,.92);
      transform: translateY(-1px);
    }
    .pb-editor-proxy.is-active {
      border-color: transparent;
      color: #fff;
      background: linear-gradient(105deg, #ad42e6, #3471f4);
      box-shadow: 0 8px 18px rgba(90, 67, 217, .25);
    }
    .pb-editor-proxy:disabled {
      cursor: not-allowed;
      opacity: .38;
      transform: none;
      box-shadow: none;
    }

    body.pb-editor-three-pane .pb-editor-right {
      display: block !important;
      grid-column: 3 !important;
      grid-row: 1 !important;
      min-width: 0 !important;
      min-height: 0 !important;
      height: 100% !important;
    }
    body.pb-editor-three-pane .pb-editor-right > div {
      display: flex !important;
      flex-direction: column !important;
      height: 100% !important;
      min-height: 0 !important;
      overflow: hidden !important;
      border: 1px solid rgba(255,255,255,.52) !important;
      border-radius: 22px !important;
      background: rgba(255, 247, 241, .82) !important;
      box-shadow: 0 20px 46px rgba(6,5,10,.24), inset 0 1px rgba(255,255,255,.9) !important;
      backdrop-filter: blur(22px) saturate(1.08) !important;
    }
    .pb-editor-tabs {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      flex: 0 0 auto;
      gap: 5px;
      margin: 0;
      padding: 11px;
      border-bottom: 1px solid rgba(120, 84, 90, .12);
      background: rgba(255,255,255,.26);
    }
    .pb-editor-tab {
      min-height: 38px;
      border: 1px solid transparent;
      border-radius: 11px;
      color: #766a77;
      background: transparent;
      font-size: 12px;
      font-weight: 750;
      cursor: pointer;
    }
    .pb-editor-tab:hover {
      color: #443649;
      background: rgba(255,255,255,.62);
    }
    .pb-editor-tab.is-active {
      color: #fff;
      background: linear-gradient(105deg, #ad42e6, #3471f4);
      box-shadow: 0 8px 18px rgba(91, 68, 217, .23);
    }
    body.pb-editor-three-pane .pb-editor-right-inner {
      display: flex !important;
      flex: 1 1 auto !important;
      flex-direction: column !important;
      gap: 11px !important;
      min-height: 0 !important;
      overflow-y: auto !important;
      padding: 12px !important;
      scrollbar-width: thin;
      scrollbar-color: rgba(107, 80, 119, .28) transparent;
    }
    body.pb-editor-three-pane .pb-editor-right-inner > div {
      flex: 0 0 auto !important;
      border: 1px solid rgba(128, 94, 101, .14) !important;
      border-radius: 16px !important;
      background: rgba(255,255,255,.69) !important;
      box-shadow: 0 9px 22px rgba(72, 43, 52, .07), inset 0 1px rgba(255,255,255,.8) !important;
    }
    body.pb-editor-three-pane .pb-original-left-card {
      display: none !important;
    }
    body.pb-editor-three-pane .pb-panel-hidden {
      display: none !important;
    }
    body.pb-editor-three-pane .pb-editor-right h2,
    body.pb-editor-three-pane .pb-editor-right h3 {
      color: #382d3c !important;
    }
    body.pb-editor-three-pane .pb-editor-right button[class*="bg-blue"],
    body.pb-editor-three-pane .pb-editor-right .ios-primary-button {
      color: #fff !important;
      border-color: transparent !important;
      background: linear-gradient(105deg, #ad42e6, #3471f4) !important;
      box-shadow: 0 8px 19px rgba(91, 68, 217, .20) !important;
    }
    body.pb-editor-three-pane button[aria-label="打开使用教程"],
    body.pb-editor-three-pane button[aria-label="打开画布视频教程分类"] {
      left: 18px !important;
      top: auto !important;
      bottom: 18px !important;
      z-index: 120 !important;
      width: 42px !important;
      height: 42px !important;
      border: 1px solid rgba(255,255,255,.48) !important;
      border-radius: 50% !important;
      color: #fff !important;
      background: linear-gradient(145deg, #ad42e6, #3471f4) !important;
      box-shadow: 0 10px 24px rgba(30,18,50,.34) !important;
      transform: none !important;
      font-size: 0 !important;
    }
    body.pb-editor-three-pane button[aria-label="打开使用教程"]::after,
    body.pb-editor-three-pane button[aria-label="打开画布视频教程分类"]::after {
      content: '?';
      font-size: 17px;
      font-weight: 800;
    }

    @media (max-width: 1260px) {
      body.pb-editor-three-pane.pb-page-editor div.pb-editor-grid {
        grid-template-columns: 158px minmax(0, 1fr) 318px !important;
        gap: 11px !important;
      }
      body.pb-editor-three-pane .pb-editor-shell { padding-inline: 12px !important; }
      .pb-editor-left { left: 12px; width: 158px; }
      .pb-editor-tools-list { grid-template-columns: 1fr; }
    }
    @media (max-width: 1023px) {
      body.pb-editor-three-pane { overflow: auto !important; }
      body.pb-editor-three-pane > div[class*="min-h-"] {
        height: auto !important;
        min-height: 100dvh !important;
        overflow: visible !important;
      }
      body.pb-editor-three-pane > div[class*="min-h-"] > div[class*="flex-1"] {
        overflow: visible !important;
      }
      body.pb-editor-three-pane .pb-editor-shell {
        height: auto !important;
        padding: 12px !important;
      }
      body.pb-editor-three-pane.pb-page-editor div.pb-editor-grid {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) !important;
        grid-template-rows: auto !important;
      }
      body.pb-editor-three-pane .pb-editor-main {
        grid-column: 1 !important;
        min-height: 62vh !important;
      }
      .pb-editor-left { display: none !important; }
      body.pb-editor-three-pane .pb-editor-right { display: none !important; }
      body.pb-editor-three-pane .pb-editor-grid > div[class*="lg:hidden"] { display: flex !important; }
      body.pb-editor-three-pane .workspace-stage { min-height: 62vh !important; }
    }
    @media (max-width: 640px) {
      body.pb-editor-three-pane header { height: auto !important; min-height: 64px !important; }
      body.pb-editor-three-pane header > div { padding-inline: 12px !important; }
      body.pb-editor-three-pane header img { width: 38px !important; height: 38px !important; }
      body.pb-editor-three-pane header button,
      body.pb-editor-three-pane header label { min-height: 36px !important; padding-inline: 9px !important; }
      body.pb-editor-three-pane .workspace-stage { min-height: 56vh !important; border-radius: 18px !important; }
    }
    @media (prefers-reduced-motion: reduce) {
      .pb-editor-proxy, .pb-editor-tab { transition: none !important; }
    }
  `;
  document.head.appendChild(style);

  const state = {
    grid: null,
    main: null,
    aside: null,
    asideInner: null,
    left: null,
    tabs: null,
    panel: 'settings',
    scheduled: false,
    applying: false,
  };
  const MODE_LABELS = ['极简模式', '专业全屏'];
  const TOOL_LABELS = ['拖拽', '画笔', '取色', '撤回', '填充', '橡皮', '镜像', '颜色高亮', '色号坐标', '替换杂色', '一键去背景', '文字生成'];

  const cleanText = node => (node?.textContent || '').replace(/\s+/g, ' ').trim();
  const cardTitle = card => cleanText(card.querySelector('h1, h2, h3')) || cleanText(card).slice(0, 24);

  function findEditor() {
    const canvas = document.querySelector('canvas[aria-label="拼豆画布"]');
    const main = canvas?.closest('main');
    const grid = main?.parentElement;
    const aside = grid ? [...grid.children].find(node => node.tagName === 'ASIDE') : null;
    const asideShell = aside?.firstElementChild;
    const asideInner = asideShell
      ? [...asideShell.children].find(node => !node.classList.contains('pb-editor-tabs') && (node.className.includes('overflow-y-auto') || node.children.length >= 4))
      : null;
    if (!canvas || !main || !grid || !aside || !asideInner) return null;
    return { canvas, main, grid, aside, asideInner };
  }

  function findCards(asideInner) {
    const result = {};
    [...asideInner.children].forEach(card => {
      const title = cardTitle(card);
      const text = cleanText(card);
      if (title.includes('工作模式')) result.mode = card;
      else if (title.includes('参数设置')) result.settings = card;
      else if (title.includes('工具')) result.tools = card;
      else if (title.includes('画笔颜色选择')) result.palette = card;
      else if (text.includes('去除杂色') && text.includes('总计')) result.stats = card;
      else if (title.includes('色板与导出')) result.export = card;
    });
    return result;
  }

  function originalButtons(card) {
    return card ? [...card.querySelectorAll('button')].filter(button => cleanText(button)) : [];
  }

  function makeProxy(original, group) {
    const label = typeof original === 'string' ? original : cleanText(original);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pb-editor-proxy';
    button.dataset.pbProxyGroup = group;
    button.dataset.pbProxyLabel = label;
    button.textContent = label;
    button.addEventListener('click', () => {
      const target = [...document.querySelectorAll('.pb-editor-right-inner .pb-original-left-card button')]
        .find(item => cleanText(item) === button.dataset.pbProxyLabel);
      if (target && !target.disabled) {
        ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(type => {
          const EventType = type.startsWith('pointer') && window.PointerEvent ? PointerEvent : MouseEvent;
          target.dispatchEvent(new EventType(type, { bubbles: true, cancelable: true, view: window }));
        });
      }
      requestAnimationFrame(syncProxies);
    });
    return button;
  }

  function populateProxyLists(cards) {
    if (!state.left?.isConnected) return;
    const modeList = state.left.querySelector('.pb-editor-mode-list');
    const toolsList = state.left.querySelector('.pb-editor-tools-list');
    const modeLabels = originalButtons(cards.mode).map(cleanText).filter(Boolean);
    const toolLabels = originalButtons(cards.tools).map(cleanText).filter(Boolean);
    const resolvedModeLabels = modeLabels.length ? modeLabels : MODE_LABELS;
    const resolvedToolLabels = toolLabels.length ? toolLabels : TOOL_LABELS;
    const modeSignature = resolvedModeLabels.join('|');
    const toolSignature = resolvedToolLabels.join('|');

    if (modeList.dataset.signature !== modeSignature) {
      modeList.replaceChildren(...resolvedModeLabels.map(label => makeProxy(label, 'mode')));
      modeList.dataset.signature = modeSignature;
    }
    if (toolsList.dataset.signature !== toolSignature) {
      toolsList.replaceChildren(...resolvedToolLabels.map(label => makeProxy(label, 'tool')));
      toolsList.dataset.signature = toolSignature;
    }
  }

  function ensureLeft(cards) {
    if (!state.left?.isConnected) {
      const left = document.createElement('nav');
      left.className = 'pb-editor-left';
      left.setAttribute('aria-label', '工作台工具');
      left.innerHTML = `
        <div class="pb-editor-left-head">
          <h2 class="pb-editor-left-title">工作模式</h2>
          <p class="pb-editor-left-subtitle">选择模式与绘图工具</p>
          <div class="pb-editor-mode-list"></div>
        </div>
        <div class="pb-editor-tools-scroll">
          <span class="pb-editor-tools-label">工具</span>
          <div class="pb-editor-tools-list"></div>
        </div>
      `;
      document.body.appendChild(left);
      state.left = left;
    }
    populateProxyLists(cards);
  }

  function ensureTabs() {
    const asideShell = state.aside.firstElementChild;
    if (!asideShell) return;
    let tabs = asideShell.querySelector(':scope > .pb-editor-tabs');
    if (!tabs) {
      tabs = document.createElement('div');
      tabs.className = 'pb-editor-tabs';
      tabs.setAttribute('role', 'tablist');
      tabs.setAttribute('aria-label', '工作台设置');
      [
        ['settings', '参数'],
        ['palette', '色板'],
        ['stats', '统计'],
      ].forEach(([key, label]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'pb-editor-tab';
        button.dataset.pbPanel = key;
        button.setAttribute('role', 'tab');
        button.textContent = label;
        button.addEventListener('click', () => {
          state.panel = key;
          const editor = findEditor();
          if (editor) state.asideInner = editor.asideInner;
          applyPanelVisibility(findCards(editor?.asideInner || state.asideInner));
        });
        tabs.appendChild(button);
      });
      asideShell.insertBefore(tabs, state.asideInner);
    }
    state.tabs = tabs;
  }

  function applyPanelVisibility(cards) {
    if (!cards) return;
    const panelMap = {
      settings: ['settings'],
      palette: ['palette', 'export'],
      stats: ['stats'],
    };
    const shown = new Set(panelMap[state.panel] || panelMap.settings);
    Object.entries(cards).forEach(([key, card]) => {
      if (!card) return;
      const originalLeft = key === 'mode' || key === 'tools';
      card.classList.toggle('pb-original-left-card', originalLeft);
      card.classList.toggle('pb-panel-hidden', !originalLeft && !shown.has(key));
    });
    if (state.tabs) {
      state.tabs.querySelectorAll('.pb-editor-tab').forEach(button => {
        const active = button.dataset.pbPanel === state.panel;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-selected', String(active));
        button.tabIndex = active ? 0 : -1;
      });
    }
  }

  function syncProxies() {
    if (!state.left || !state.asideInner) return;
    const editor = findEditor();
    const cards = findCards(editor?.asideInner || state.asideInner);
    const activeTool = originalButtons(cards.tools)
      .find(button => /bg-blue|ios-primary-button/.test(String(button.className)))?.textContent.trim() || '';
    const activeMode = originalButtons(cards.mode).find(button => /bg-blue|ios-primary-button/.test(String(button.className)))?.textContent.trim() || '';

    state.left.querySelectorAll('.pb-editor-proxy').forEach(proxy => {
      const sourceCard = proxy.dataset.pbProxyGroup === 'mode' ? cards.mode : cards.tools;
      const original = originalButtons(sourceCard).find(button => cleanText(button) === proxy.dataset.pbProxyLabel);
      proxy.disabled = Boolean(original?.disabled);
      const active = proxy.dataset.pbProxyGroup === 'mode'
        ? proxy.dataset.pbProxyLabel === activeMode
        : proxy.dataset.pbProxyLabel === activeTool;
      proxy.classList.toggle('is-active', active);
      proxy.setAttribute('aria-pressed', String(active));
    });
  }

  function clearEditor() {
    document.body.classList.remove('pb-editor-three-pane');
    state.left?.remove();
    state.tabs?.remove();
    state.asideInner?.querySelectorAll('.pb-original-left-card, .pb-panel-hidden').forEach(card => {
      card.classList.remove('pb-original-left-card', 'pb-panel-hidden');
    });
    state.grid?.classList.remove('pb-editor-grid');
    state.main?.classList.remove('pb-editor-main');
    state.aside?.classList.remove('pb-editor-right');
    state.asideInner?.classList.remove('pb-editor-right-inner');
    state.grid?.parentElement?.classList.remove('pb-editor-shell');
    state.grid = state.main = state.aside = state.asideInner = state.left = state.tabs = null;
  }

  function apply() {
    state.scheduled = false;
    if (state.applying) return;
    state.applying = true;
    try {
      const editor = findEditor();
      if (!editor) {
        if (document.body.classList.contains('pb-editor-three-pane')) clearEditor();
        return;
      }
      state.grid = editor.grid;
      state.main = editor.main;
      state.aside = editor.aside;
      state.asideInner = editor.asideInner;

      document.body.classList.add('pb-editor-three-pane');
      state.grid.classList.add('pb-editor-grid');
      state.main.classList.add('pb-editor-main');
      state.aside.classList.add('pb-editor-right');
      state.asideInner.classList.add('pb-editor-right-inner');
      state.grid.parentElement?.classList.add('pb-editor-shell');

      const cards = findCards(state.asideInner);
      ensureLeft(cards);
      ensureTabs();
      applyPanelVisibility(cards);
      syncProxies();
    } finally {
      state.applying = false;
    }
  }

  function schedule() {
    if (state.scheduled) return;
    state.scheduled = true;
    requestAnimationFrame(apply);
  }

  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['class', 'disabled'],
  });
  window.addEventListener('resize', schedule);
  window.addEventListener('popstate', schedule);
  [0, 120, 450, 1100, 2200].forEach(delay => setTimeout(schedule, delay));
})();

/* ===== bundled source: _custom/brand-guide.js ===== */
/* PixelBead brand normalization and video-free written guide. */
(() => {
  'use strict';

  const BRAND_ICON = './_custom/pixelbead-blank-favicon.svg?v=20260917-13';

  const style = document.createElement('style');
  style.textContent = `
    body.pb-guide-open { overflow: hidden !important; }
    #pb-written-guide[hidden] { display: none !important; }
    #pb-written-guide {
      position: fixed;
      z-index: 2400;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 24px;
      color: #2f2833;
      background: rgba(10, 10, 18, .72);
      backdrop-filter: blur(18px) saturate(1.06);
      font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
    }
    .pb-guide-panel {
      width: min(920px, 100%);
      max-height: min(820px, calc(100dvh - 48px));
      overflow: auto;
      overscroll-behavior: contain;
      border: 1px solid rgba(255, 255, 255, .88);
      border-radius: 30px;
      background:
        radial-gradient(circle at 8% 0%, rgba(255, 190, 127, .24), transparent 30%),
        radial-gradient(circle at 96% 4%, rgba(147, 79, 219, .15), transparent 32%),
        rgba(255, 249, 244, .96);
      box-shadow: 0 34px 90px rgba(0, 0, 0, .38), inset 0 1px rgba(255,255,255,.9);
    }
    .pb-guide-head {
      position: sticky;
      z-index: 2;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      padding: 22px 24px;
      color: #fff;
      background: linear-gradient(112deg, rgba(18, 23, 41, .98), rgba(42, 31, 48, .96));
      box-shadow: 0 10px 26px rgba(26, 18, 29, .18);
    }
    .pb-guide-brand {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .pb-guide-mark,
    .pb-brand-mark {
      display: inline-grid;
      place-items: center;
      flex: none;
      width: 42px;
      height: 42px;
      border: 1px solid rgba(255,255,255,.42);
      border-radius: 13px;
      color: #fff;
      background: linear-gradient(145deg, #b63fe2, #336cf3);
      box-shadow: 0 8px 22px rgba(92, 64, 218, .32), inset 0 1px rgba(255,255,255,.28);
      font: 700 14px/1 Georgia, serif;
      letter-spacing: -.05em;
    }
    .pb-guide-head h2 { margin: 0; font: 700 23px/1.2 Georgia, "Songti SC", serif; }
    .pb-guide-head p { margin: 5px 0 0; color: rgba(255,255,255,.68); font-size: 12px; }
    .pb-guide-close {
      display: inline-grid;
      place-items: center;
      flex: none;
      width: 42px;
      height: 42px;
      padding: 0;
      border: 1px solid rgba(255,255,255,.22);
      border-radius: 50%;
      color: #fff;
      background: rgba(255,255,255,.10);
      cursor: pointer;
      font-size: 24px;
      line-height: 1;
    }
    .pb-guide-close:hover { background: rgba(255,255,255,.18); }
    .pb-guide-body { padding: 24px; }
    .pb-guide-intro {
      margin: 0 0 18px;
      color: #675c68;
      font-size: 14px;
      line-height: 1.75;
    }
    .pb-guide-list { display: grid; gap: 12px; }
    .pb-guide-item {
      overflow: hidden;
      border: 1px solid rgba(128, 91, 98, .16);
      border-radius: 19px;
      background: rgba(255,255,255,.73);
      box-shadow: 0 11px 28px rgba(77, 47, 43, .07);
    }
    .pb-guide-item[open] {
      border-color: rgba(143, 76, 203, .25);
      box-shadow: 0 15px 34px rgba(77, 47, 75, .11);
    }
    .pb-guide-item summary {
      display: flex;
      align-items: center;
      gap: 13px;
      min-height: 66px;
      padding: 0 18px;
      cursor: pointer;
      list-style: none;
      color: #392f3d;
      font-weight: 700;
    }
    .pb-guide-item summary::-webkit-details-marker { display: none; }
    .pb-guide-index {
      display: inline-grid;
      place-items: center;
      width: 32px;
      height: 32px;
      flex: none;
      border-radius: 10px;
      color: #fff;
      background: linear-gradient(145deg, #b33fe1, #3e70ef);
      box-shadow: 0 6px 16px rgba(97, 69, 215, .22);
      font: 700 13px/1 Georgia, serif;
    }
    .pb-guide-item summary::after {
      content: "+";
      margin-left: auto;
      color: #8d7d90;
      font-size: 21px;
      font-weight: 400;
    }
    .pb-guide-item[open] summary::after { content: "−"; }
    .pb-guide-copy {
      padding: 0 20px 19px 63px;
      color: #655a67;
      font-size: 14px;
      line-height: 1.72;
    }
    .pb-guide-copy ol,
    .pb-guide-copy ul { margin: 0; padding-left: 1.25em; }
    .pb-guide-copy li + li { margin-top: 7px; }
    .pb-guide-copy strong { color: #48394f; }
    .pb-guide-note {
      margin-top: 12px;
      padding: 10px 12px;
      border: 1px solid rgba(184, 112, 63, .16);
      border-radius: 12px;
      color: #795747;
      background: rgba(255, 224, 193, .38);
    }
    header .pb-brand-mark { width: 40px; height: 40px; }
    header img[src*="logtu"] + .pb-brand-mark { margin-left: -2px; }
    img[src*="logtu"],
    img[src*="shouyetu"],
    img[src*="caomei" i],
    img[src*="tuzhitu" i],
    img[data-pb-legacy-brand="true"] { display: none !important; }
    @media (max-width: 700px) {
      #pb-written-guide { align-items: end; padding: 0; }
      .pb-guide-panel {
        width: 100%;
        max-height: 92dvh;
        border-width: 1px 0 0;
        border-radius: 25px 25px 0 0;
      }
      .pb-guide-head { padding: 17px 18px; }
      .pb-guide-head h2 { font-size: 20px; }
      .pb-guide-head p { display: none; }
      .pb-guide-body { padding: 18px 14px 24px; }
      .pb-guide-copy { padding: 0 16px 17px 16px; }
    }
  `;
  document.head.append(style);

  const guide = document.createElement('section');
  guide.id = 'pb-written-guide';
  guide.hidden = true;
  guide.setAttribute('role', 'dialog');
  guide.setAttribute('aria-modal', 'true');
  guide.setAttribute('aria-labelledby', 'pb-guide-title');
  guide.innerHTML = `
    <div class="pb-guide-panel">
      <header class="pb-guide-head">
        <div class="pb-guide-brand">
          <span class="pb-guide-mark" aria-hidden="true">PB</span>
          <div><h2 id="pb-guide-title">PixelBead 使用教程</h2><p>根据原教程内容整理 · 无需播放视频</p></div>
        </div>
        <button class="pb-guide-close" type="button" aria-label="关闭使用教程">×</button>
      </header>
      <div class="pb-guide-body">
        <p class="pb-guide-intro">按实际操作顺序整理了原有六段教程。第一次使用建议先看“从图片到图纸”，需要精修时再查看后面的工具说明。</p>
        <div class="pb-guide-list">
          <details class="pb-guide-item" open>
            <summary><span class="pb-guide-index">01</span>从图片到图纸</summary>
            <div class="pb-guide-copy"><ol>
              <li><strong>准备原图：</strong>人物或宠物照片建议先处理成 Q 版或纯色像素图；照片拼豆尽量只保留头部和肩部，避免细节过多、图纸过大。</li>
              <li><strong>上传和裁剪：</strong>选择图片后，尽量裁掉无用的空白背景并让主体居中；需要保留完整画面时可使用“原图生成”。</li>
              <li><strong>调整尺寸：</strong>尺寸越大，像素和轮廓越清晰；尺寸越小，图纸越简化。根据图片复杂程度选择合适的豆格尺寸。</li>
              <li><strong>清理颜色：</strong>一个或两个豆的零散颜色可以合并或替换；若它本来就是画面需要的颜色，不要删除。</li>
              <li><strong>去背景和下载：</strong>完成修改后使用“一键去背景”，确认背景不再显示色号，再点击“下载”保存图纸。手机端保存时选择保存到相册。</li>
            </ol></div>
          </details>
          <details class="pb-guide-item">
            <summary><span class="pb-guide-index">02</span>调整图纸尺寸</summary>
            <div class="pb-guide-copy"><ul>
              <li>在“参数设置”里调节“图纸尺寸设置”的滑杆或手动输入数值。</li>
              <li>数值越小，豆格越少、画面越简化；数值越大，豆格越多、细节越清晰。</li>
              <li>复杂的人像和动物图需要更大的尺寸；原图细节很多时，小尺寸容易模糊。</li>
              <li>当前豆格尺寸会显示在画布边缘。为了尺寸准确，上传前先裁掉无用背景。</li>
            </ul></div>
          </details>
          <details class="pb-guide-item">
            <summary><span class="pb-guide-index">03</span>去除图内杂色</summary>
            <div class="pb-guide-copy"><ul>
              <li><strong>指定替换：</strong>选择“替换杂色”，点击画布中要处理的颜色，再选择目标颜色；图中所有相同颜色都会一起替换。</li>
              <li><strong>自动合并：</strong>在“去除杂色”的颜色列表中点击某个色号，它会合并到图中最接近的已有颜色。</li>
            </ul><div class="pb-guide-note">一个或两个豆的零散颜色通常可以清理；如果画面确实需要该颜色，请保留，否则会影响整体效果。</div></div>
          </details>
          <details class="pb-guide-item">
            <summary><span class="pb-guide-index">04</span>颜色合并值</summary>
            <div class="pb-guide-copy"><ul>
              <li>颜色合并值会把图片中相近的颜色自动合成更少的几种颜色。</li>
              <li>默认值为 30。数值越大，相近颜色合并得越多，零散色差会减少。</li>
              <li>它没有适用于所有图片的固定值。一般保留默认值；只有调整后画面确实更自然时再修改。</li>
            </ul></div>
          </details>
          <details class="pb-guide-item">
            <summary><span class="pb-guide-index">05</span>颜色高亮</summary>
            <div class="pb-guide-copy"><ol>
              <li>在工具栏选择“颜色高亮”。</li>
              <li>点击画布上的任意颜色。</li>
              <li>画布中所有相同颜色会同时高亮，方便修图时快速找到同一色号的位置。</li>
            </ol></div>
          </details>
          <details class="pb-guide-item">
            <summary><span class="pb-guide-index">06</span>替换杂色</summary>
            <div class="pb-guide-copy"><ol>
              <li>在工具栏选择“替换杂色”。</li>
              <li>点击画布中想替换的色号，打开更换颜色面板。</li>
              <li>选择新的颜色后，图中所有该色号都会一次性替换成目标颜色。</li>
            </ol></div>
          </details>
        </div>
      </div>
    </div>`;
  document.body.append(guide);

  let previousFocus = null;
  const closeButton = guide.querySelector('.pb-guide-close');
  const open = () => {
    if (!guide.isConnected) document.body.append(guide);
    previousFocus = document.activeElement;
    guide.hidden = false;
    document.body.classList.add('pb-guide-open');
    closeButton.focus();
  };
  const close = () => {
    guide.hidden = true;
    document.body.classList.remove('pb-guide-open');
    previousFocus?.focus?.();
  };
  window.PixelBeadGuide = { open, close };

  closeButton.addEventListener('click', close);
  guide.addEventListener('click', event => { if (event.target === guide) close(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !guide.hidden) close();
  });

  document.addEventListener('click', event => {
    const trigger = event.target.closest('.pb-tutorial,[data-pb-guide-trigger="true"],button[aria-label="打开使用教程"]');
    if (!trigger) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    open();
  }, true);

  const blocked = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA']);
  const LEGACY_BERRY = '\u8349\u8393';
  const brandify = value => value
    .replaceAll('🍓', '')
    .replaceAll(`${LEGACY_BERRY}\u62fc\u8c46`, 'PixelBead')
    .replaceAll(`${LEGACY_BERRY}\u62fc\u56fe`, 'PixelBead')
    .replaceAll(LEGACY_BERRY, 'PixelBead')
    .replaceAll('PixelBead拼豆', 'PixelBead');
  let scheduled = false;
  function ensureBrandIcon() {
    document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]').forEach(link => {
      if (link.getAttribute('href') !== BRAND_ICON || link.type !== 'image/svg+xml') link.remove();
    });
    if (!document.head.querySelector(`link[rel="icon"][href="${BRAND_ICON}"]`)) {
      const icon = document.createElement('link');
      icon.rel = 'icon';
      icon.type = 'image/svg+xml';
      icon.sizes = 'any';
      icon.href = BRAND_ICON;
      document.head.append(icon);
    }
  }
  function normalize() {
    scheduled = false;
    if (!guide.isConnected) document.body.append(guide);
    document.title = brandify(document.title);
    ensureBrandIcon();
    document.querySelectorAll('meta[content]').forEach(meta => {
      meta.content = brandify(meta.content);
    });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (blocked.has(node.parentElement?.tagName)) return;
      node.nodeValue = brandify(node.nodeValue);
    });
    document.querySelectorAll('[alt],[title],[aria-label],[placeholder]').forEach(element => {
      ['alt', 'title', 'aria-label', 'placeholder'].forEach(name => {
        const value = element.getAttribute(name);
        if (value) element.setAttribute(name, brandify(value));
      });
    });
    document.querySelectorAll('img').forEach(image => {
      const legacySource = `${image.getAttribute('src') || ''} ${image.getAttribute('srcset') || ''}`;
      const legacyLabel = `${image.alt || ''} ${image.title || ''}`;
      if (/caomei|logtu|shouyetu|tuzhitu/i.test(legacySource) || legacyLabel.includes(LEGACY_BERRY)) {
        image.dataset.pbLegacyBrand = 'true';
        image.remove();
      }
    });
    document.querySelectorAll('video').forEach(video => video.remove());
    document.querySelectorAll('[role="dialog"]').forEach(dialog => {
      if (dialog !== guide && dialog.textContent.includes('视频教程')) dialog.remove();
    });
    document.querySelectorAll('button[aria-label="打开画布视频教程分类"]').forEach(button => {
      button.setAttribute('aria-label', '打开使用教程');
      button.dataset.pbGuideTrigger = 'true';
    });
    document.querySelectorAll('header img[src*="logtu"]').forEach(image => {
      if (!image.nextElementSibling?.classList.contains('pb-brand-mark')) {
        const mark = document.createElement('span');
        mark.className = 'pb-brand-mark';
        mark.setAttribute('aria-hidden', 'true');
        mark.textContent = 'PB';
        image.after(mark);
      }
      image.remove();
    });
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(normalize);
  }
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  [0, 120, 500, 1200, 2500].forEach(ms => setTimeout(schedule, ms));
})();

/* ===== bundled source: _custom/remove-auth.js ===== */
/* Remove account, card-login and agreement surfaces from the local UI. */
(() => {
  'use strict';

  const compact = value => String(value || '').replace(/\s+/g, '').trim();
  const surfaceMarkers = [
    '登录后使用云端项目',
    '登录后打开本地草稿',
    '登录账号使用可免卡密验证',
    '手机号或卡密登录',
    '查询绑定',
    '用户协议',
    '隐私政策',
    '卡密验证'
  ];
  const actionLabels = new Set(['登录', '登录账户', '登录账号', '绑定账号', '查询绑定']);
  let running = false;

  function hasAuthMarker(text) {
    return surfaceMarkers.some(marker => text.includes(marker));
  }

  function removeAuthUI() {
    if (running) return;
    running = true;
    try {
      document.querySelectorAll('[role="dialog"], [aria-modal="true"], div.fixed').forEach(element => {
        const text = compact(element.innerText || element.textContent);
        if (!text || !hasAuthMarker(text)) return;
        element.remove();
      });

      document.querySelectorAll('button, a, [role="button"]').forEach(element => {
        const label = compact(
          element.innerText || element.getAttribute('aria-label') || element.getAttribute('title')
        );
        if (actionLabels.has(label)) element.remove();
      });

      document.querySelectorAll('p, label, span, a, button').forEach(element => {
        const text = compact(element.innerText || element.textContent);
        if (
          text === '登录即代表您已知悉并同意《用户协议》《隐私政策》' ||
          text === '我已阅读并同意用户协议与隐私政策'
        ) {
          element.remove();
        }
      });
    } finally {
      running = false;
    }
  }

  removeAuthUI();
  new MutationObserver(removeAuthUI).observe(document.documentElement, { childList: true, subtree: true });
  [120, 400, 900, 1800, 3200].forEach(ms => setTimeout(removeAuthUI, ms));
})();

/* ===== bundled source: _custom/bead-photo-analyzer.js ===== */
/*
 * 统计已经完成的拼豆照片。
 * 这条路径不进入普通“图片转拼豆图”流程，而是按照片中的规则网格
 * 读取每颗豆子的颜色，再复用原站色板映射得到色号和数量。
 */
(() => {
  'use strict';

  if (window.__pbBeadPhotoAnalyzerInstalled) return;
  if (!document.body) {
    if (window.__pbBeadPhotoAnalyzerWaiting) return;
    window.__pbBeadPhotoAnalyzerWaiting = true;
    const retryWhenReady = () => {
      if (!document.body) return setTimeout(retryWhenReady, 25);
      window.__pbBeadPhotoAnalyzerWaiting = false;
      const retry = document.createElement('script');
      retry.src = './_custom/bead-photo-analyzer.js?v=20260917-5';
      document.head.append(retry);
    };
    retryWhenReady();
    return;
  }
  window.__pbBeadPhotoAnalyzerInstalled = true;

  const compact = value => String(value || '').replace(/\s+/g, ' ').trim();
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.hidden = true;
  input.id = 'pb-bead-photo-input';
  // 放到 html 末端，避免 Next/React 首屏 hydration 重建 body 时把隐藏输入框删掉。
  document.documentElement.append(input);

  const style = document.createElement('style');
  style.textContent = `
    #pb-bead-photo-layer, body.pb-reference-home > #pb-bead-photo-layer { position: fixed; inset: 0; z-index: 12000; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(12, 10, 18, .58); backdrop-filter: blur(14px); visibility: visible !important; }
    #pb-bead-photo-layer[hidden] { display: none; }
    .pb-bead-photo-card { width: min(1120px, 100%); max-height: min(92vh, 920px); overflow: auto; border: 1px solid rgba(255,255,255,.55); border-radius: 28px; background: linear-gradient(145deg, rgba(255,255,255,.96), rgba(247,242,249,.94)); color: #272130; box-shadow: 0 24px 80px rgba(0,0,0,.28); padding: 22px; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; }
    .pb-bead-photo-card h2 { margin: 0; font-size: 22px; letter-spacing: -.02em; }
    .pb-bead-photo-card p { margin: 8px 0 0; color: #766b7c; font-size: 13px; line-height: 1.7; }
    .pb-bead-photo-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
    .pb-bead-photo-button { flex: 1 1 220px; min-height: 46px; border: 0; border-radius: 14px; padding: 0 18px; cursor: pointer; font: inherit; font-weight: 700; color: #fff; background: linear-gradient(100deg, #b746e9, #3b67ef); box-shadow: 0 10px 24px rgba(91,66,214,.24); }
    .pb-bead-photo-button.secondary { color: #51475b; background: #fff; border: 1px solid #ddd4e2; box-shadow: none; }
    .pb-bead-photo-button:disabled { cursor: wait; opacity: .55; }
    .pb-bead-photo-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 18px; }
    .pb-bead-photo-stat { border: 1px solid #e5dce9; border-radius: 16px; background: rgba(255,255,255,.78); padding: 14px; }
    .pb-bead-photo-stat span { display: block; color: #817789; font-size: 12px; }
    .pb-bead-photo-stat strong { display: block; margin-top: 4px; font-size: 22px; }
    .pb-bead-photo-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(145px, 1fr)); gap: 8px; margin-top: 16px; }
    .pb-bead-photo-row { display: flex; align-items: center; gap: 9px; min-height: 42px; padding: 8px 10px; border: 1px solid #e9e1eb; border-radius: 12px; background: rgba(255,255,255,.82); }
    .pb-bead-photo-swatch { width: 22px; height: 22px; flex: 0 0 22px; border-radius: 7px; border: 1px solid rgba(40,30,50,.18); box-shadow: inset 0 0 0 1px rgba(255,255,255,.28); }
    .pb-bead-photo-code { flex: 1; font: 700 13px ui-monospace, SFMono-Regular, Menlo, monospace; }
    .pb-bead-photo-count { color: #62556d; font-size: 13px; white-space: nowrap; }
    .pb-bead-photo-note { margin-top: 14px !important; padding: 10px 12px; border-radius: 12px; background: #fff5fb; color: #9b4776 !important; }
    .pb-bead-photo-previews { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 16px; }
    .pb-bead-photo-preview { min-width: 0; padding: 10px; border: 1px solid #e5dce9; border-radius: 16px; background: rgba(255,255,255,.78); }
    .pb-bead-photo-preview strong { display: block; margin: 0 0 8px; color: #51475b; font-size: 13px; }
    .pb-bead-photo-preview img { display: block; width: 100%; height: min(38vh, 360px); object-fit: contain; border-radius: 10px; background: #fff; }
    @media (max-width: 760px) { .pb-bead-photo-previews { grid-template-columns: 1fr; } .pb-bead-photo-preview img { height: min(34vh, 260px); } }
    @media (max-width: 520px) { .pb-bead-photo-card { padding: 18px; border-radius: 22px; } .pb-bead-photo-summary { grid-template-columns: 1fr; } .pb-bead-photo-list { grid-template-columns: 1fr 1fr; } }
  `;
  document.head.append(style);

  const layer = document.createElement('div');
  layer.id = 'pb-bead-photo-layer';
  layer.hidden = true;
  // 同样挂到 html 末端，确保弹层和输入框在首屏重渲染后仍然存在。
  document.documentElement.append(layer);
  // 路由返回首页时 React 可能重建 body；如果把这些节点移除，立即补回。
  const restoreAnalyzerNodes = () => {
    if (!input.isConnected) document.documentElement.append(input);
    if (!layer.isConnected) document.documentElement.append(layer);
  };
  restoreAnalyzerNodes();
  new MutationObserver(restoreAnalyzerNodes).observe(document.documentElement, { childList: true, subtree: true });

  const getPalette = () => {
    let webpackRequire = null;
    try {
      self.webpackChunk_N_E.push([[`pb-photo-palette-${Date.now()}`], {}, require => { webpackRequire = require; }]);
      const paletteModule = webpackRequire?.(4576);
      const reverseMard = paletteModule?.H0?.();
      if (!reverseMard) return [];
      let system = 'MARD';
      try { system = JSON.parse(localStorage.getItem('pixelbeadPalettePrefs') || '{}').system || 'MARD'; } catch {}
      return Object.entries(reverseMard).map(([key, color]) => ({
        key,
        color: color.toUpperCase(),
        label: paletteModule.lW(color, system) || key
      }));
    } catch {
      return [];
    }
  };

  const rgb = (data, width, x, y) => {
    const px = Math.max(0, Math.min(width - 1, Math.round(x)));
    const py = Math.max(0, Math.min(Math.floor(data.length / 4 / width) - 1, Math.round(y)));
    const offset = (py * width + px) * 4;
    return [data[offset], data[offset + 1], data[offset + 2]];
  };
  const luminance = color => color[0] * .2126 + color[1] * .7152 + color[2] * .0722;
  const distance = (a, b) => {
    const dr = a[0] - b[0];
    const dg = a[1] - b[1];
    const db = a[2] - b[2];
    return dr * dr * .9 + dg * dg + db * db * 1.05;
  };
  const average = values => values.reduce((sum, value) => sum.map((v, i) => v + value[i]), [0, 0, 0]).map(v => v / Math.max(1, values.length));

  const axisSignal = (pixels, width, height, axis) => {
    const length = axis === 'x' ? width : height;
    const signal = new Array(length).fill(0);
    const stride = Math.max(1, Math.floor((axis === 'x' ? height : width) / 180));
    for (let i = 1; i < length; i += 1) {
      let total = 0;
      let samples = 0;
      for (let other = Math.floor((axis === 'x' ? height : width) * .08); other < (axis === 'x' ? height : width) * .92; other += stride) {
        const here = axis === 'x' ? rgb(pixels, width, i, other) : rgb(pixels, width, other, i);
        const before = axis === 'x' ? rgb(pixels, width, i - 1, other) : rgb(pixels, width, other, i - 1);
        total += Math.abs(luminance(here) - luminance(before));
        samples += 1;
      }
      signal[i] = total / Math.max(1, samples);
    }
    return signal;
  };

  const estimatePitch = (pixels, width, height, axis) => {
    const signal = axisSignal(pixels, width, height, axis);
    const length = signal.length;
    const mean = signal.reduce((sum, value) => sum + value, 0) / length;
    const centered = signal.map(value => value - mean);
    const candidates = [];
    for (let lag = 8; lag <= Math.min(70, Math.floor(length / 3)); lag += 1) {
      let score = 0;
      let normA = 0;
      let normB = 0;
      for (let i = 0; i < length - lag; i += 2) {
        score += centered[i] * centered[i + lag];
        normA += centered[i] * centered[i];
        normB += centered[i + lag] * centered[i + lag];
      }
      candidates.push({ lag, score: score / Math.sqrt(Math.max(1, normA * normB)) });
    }
    const maxScore = Math.max(...candidates.map(item => item.score));
    const localPeaks = candidates.filter((item, index) => {
      const prev = candidates[index - 1]?.score ?? -1;
      const next = candidates[index + 1]?.score ?? -1;
      return item.score >= prev && item.score >= next;
    });
    const peak = localPeaks
      .filter(item => item.score >= maxScore * .72)
      .sort((a, b) => a.lag - b.lag)[0] || candidates.sort((a, b) => b.score - a.score)[0];
    return Math.max(8, peak?.lag || 24);
  };

  const findOrigin = (pixels, width, height, pitch, axis) => {
    const length = axis === 'x' ? width : height;
    const otherLength = axis === 'x' ? height : width;
    let best = { offset: Math.round(pitch / 2), score: -Infinity };
    for (let offset = 0; offset < pitch; offset += 1) {
      let score = 0;
      let count = 0;
      for (let pos = offset; pos < length; pos += pitch) {
        for (let other = Math.floor(otherLength * .18); other < otherLength * .82; other += Math.max(2, Math.floor(pitch * 1.7))) {
          const color = axis === 'x' ? rgb(pixels, width, pos, other) : rgb(pixels, width, other, pos);
          score += 255 - luminance(color);
          count += 1;
        }
      }
      if (score / Math.max(1, count) > best.score) best = { offset, score: score / Math.max(1, count) };
    }
    return best.offset;
  };

  const sampleBeadColor = (pixels, width, x, y, pitch) => {
    const radius = Math.max(2, pitch * .31);
    const samples = [];
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
      samples.push(rgb(pixels, width, x + Math.cos(angle) * radius, y + Math.sin(angle) * radius));
    }
    return average(samples);
  };

  const analyze = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('无法读取图片'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('无法解析图片'));
      image.onload = () => {
        const maxSide = 1500;
        const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext('2d', { willReadFrequently: true });
        if (!context) return reject(new Error('无法读取图片像素'));
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        const palette = getPalette();
        if (!palette.length) return reject(new Error('色板数据尚未加载，请稍后重试'));
        const pitchX = estimatePitch(pixels, canvas.width, canvas.height, 'x');
        const pitchY = estimatePitch(pixels, canvas.width, canvas.height, 'y');
        const pitch = Math.max(8, Math.round((pitchX + pitchY) / 2));
        const originX = findOrigin(pixels, canvas.width, canvas.height, pitch, 'x');
        const originY = findOrigin(pixels, canvas.width, canvas.height, pitch, 'y');
        const columns = Math.max(1, Math.floor((canvas.width - 1 - originX) / pitch) + 1);
        const rows = Math.max(1, Math.floor((canvas.height - 1 - originY) / pitch) + 1);
        const counts = new Map();
        const cells = [];
        for (let row = 0; row < rows; row += 1) {
          for (let column = 0; column < columns; column += 1) {
            const color = sampleBeadColor(pixels, canvas.width, originX + column * pitch, originY + row * pitch, pitch);
            let closest = palette[0];
            let closestDistance = Infinity;
            for (const candidate of palette) {
              const candidateRgb = candidate.color.match(/[A-F0-9]{2}/g).map(value => parseInt(value, 16));
              const currentDistance = distance(color, candidateRgb);
              if (currentDistance < closestDistance) {
                closest = candidate;
                closestDistance = currentDistance;
              }
            }
            const current = counts.get(closest.key) || { ...closest, count: 0 };
            current.count += 1;
            counts.set(closest.key, current);
            cells.push({ x: column, y: row, color: closest.color, label: closest.label });
          }
        }
        const system = palette[0].label === palette[0].key ? 'MARD' : (() => {
          try { return JSON.parse(localStorage.getItem('pixelbeadPalettePrefs') || '{}').system || 'MARD'; } catch { return 'MARD'; }
        })();
        resolve({ sourceUrl: String(reader.result), width: columns, height: rows, total: columns * rows, pitch, system, cells, colors: [...counts.values()].sort((a, b) => b.count - a.count) });
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });

  const close = () => { layer.hidden = true; layer.innerHTML = ''; };
  const open = html => {
    layer.innerHTML = `<div class="pb-bead-photo-card">${html}</div>`;
    layer.hidden = false;
    layer.style.setProperty('visibility', 'visible', 'important');
  };
  const openChoice = () => {
    open(`<h2>选择图片处理方式</h2><p>普通照片继续使用项目原本的拼豆图生成流程；已经完成的拼豆照片按项目现有色板逐格标注色号并统计数量。</p><div class="pb-bead-photo-actions"><button class="pb-bead-photo-button" data-pb-photo-action="analyze">按项目色板标注</button><button class="pb-bead-photo-button secondary" data-pb-photo-action="generate">生成拼豆图</button><button class="pb-bead-photo-button secondary" data-pb-photo-action="cancel">取消</button></div>`);
  };
  const openLoading = () => open(`<h2>正在识别拼豆照片</h2><p>正在检测规则网格，并按当前色板匹配色号，请稍候。</p>`);
  const makeAnnotatedImage = result => {
    const cellSize = 26;
    const headerHeight = 92;
    const chartWidth = result.width * cellSize;
    const chartHeight = result.height * cellSize;
    const chartGap = 28;
    const legendColumns = 8;
    const legendWidth = chartWidth;
    const legendRows = Math.ceil(result.colors.length / legendColumns);
    const legendHeight = legendRows * 26 + 76;
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1200, chartWidth + 48);
    canvas.height = headerHeight + chartHeight + chartGap + legendHeight + 24;
    const context = canvas.getContext('2d');
    if (!context) return null;
    context.fillStyle = '#f5f1f7';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#2b2333';
    context.font = '700 28px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif';
    context.fillText('成品拼豆图色号标注', 24, 38);
    context.fillStyle = '#766b7c';
    context.font = '15px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif';
    context.fillText(`项目色板：${result.system}　网格：${result.width}×${result.height}　拼豆总数：${result.total}　颜色：${result.colors.length} 种`, 24, 68);
    const chartX = 24;
    const chartY = headerHeight;
    context.fillStyle = '#ffffff';
    context.fillRect(chartX - 8, chartY - 8, chartWidth + 16, chartHeight + 16);
    context.strokeStyle = '#d8cfdd';
    context.lineWidth = 1;
    context.strokeRect(chartX - 8, chartY - 8, chartWidth + 16, chartHeight + 16);
    const cellByPosition = new Map(result.cells.map(cell => [`${cell.x}:${cell.y}`, cell]));
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    result.cells.forEach(cell => {
      const x = chartX + cell.x * cellSize;
      const y = chartY + cell.y * cellSize;
      context.fillStyle = cell.color;
      context.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
      context.strokeStyle = 'rgba(40,30,50,.18)';
      context.strokeRect(x + .5, y + .5, cellSize - 1, cellSize - 1);
      const luminance = parseInt(cell.color.slice(1, 3), 16) * .2126 + parseInt(cell.color.slice(3, 5), 16) * .7152 + parseInt(cell.color.slice(5, 7), 16) * .0722;
      context.fillStyle = luminance > 150 ? '#2d2632' : '#ffffff';
      context.font = '700 8px ui-monospace, SFMono-Regular, Menlo, monospace';
      context.fillText(cell.label, x + cellSize / 2, y + cellSize / 2);
    });
    context.textAlign = 'left';
    const legendX = chartX;
    const legendY = chartY + chartHeight + chartGap;
    context.fillStyle = '#ffffff';
    context.fillRect(legendX, legendY, legendWidth, legendHeight);
    context.strokeStyle = '#d8cfdd';
    context.strokeRect(legendX, legendY, legendWidth, legendHeight);
    context.fillStyle = '#2b2333';
    context.font = '700 18px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif';
    context.fillText('颜色与数量', legendX + 18, legendY + 27);
    context.fillStyle = '#766b7c';
    context.font = '13px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif';
    context.fillText('按图纸中实际格子统计', legendX + 18, legendY + 49);
    result.colors.forEach((item, index) => {
      const column = index % legendColumns;
      const row = Math.floor(index / legendColumns);
      const itemWidth = (legendWidth - 36) / legendColumns;
      const itemX = legendX + 18 + column * itemWidth;
      const y = legendY + 60 + row * 26;
      context.fillStyle = item.color;
      context.fillRect(itemX, y, 16, 16);
      context.strokeStyle = 'rgba(40,30,50,.18)';
      context.strokeRect(itemX + .5, y + .5, 15, 15);
      context.fillStyle = '#2b2333';
      context.font = '700 11px ui-monospace, SFMono-Regular, Menlo, monospace';
      context.fillText(item.label, itemX + 24, y + 12);
      context.fillStyle = '#62556d';
      context.font = '11px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif';
      context.fillText(`${item.count}颗`, itemX + 82, y + 12);
      context.fillStyle = '#9a8da0';
      context.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
      context.fillText(item.color, itemX + 132, y + 12);
    });
    return canvas.toDataURL('image/png');
  };
  const openResult = result => {
    const rows = result.colors.map(item => `<div class="pb-bead-photo-row"><span class="pb-bead-photo-swatch" style="background:${item.color}"></span><span class="pb-bead-photo-code">${item.label}</span><span class="pb-bead-photo-count">${item.count} 颗</span></div>`).join('');
    const csv = ['色号,颜色,数量', ...result.colors.map(item => `${item.label},${item.color},${item.count}`)].join('\n');
    const encoded = `data:text/csv;charset=utf-8,${encodeURIComponent('\ufeff' + csv)}`;
    const annotatedUrl = makeAnnotatedImage(result) || '';
    window.__pbLastBeadPhotoAnalysis = result;
    open(`<h2>成品拼豆图色号标注</h2><p>按照片中的规则网格读取每颗豆子，并使用项目现有 ${result.system} 色板匹配色号。不新增色号，不重新生成拼豆图。</p><div class="pb-bead-photo-summary"><div class="pb-bead-photo-stat"><span>拼豆总数</span><strong>${result.total}</strong></div><div class="pb-bead-photo-stat"><span>颜色种类</span><strong>${result.colors.length}</strong></div><div class="pb-bead-photo-stat"><span>识别网格</span><strong>${result.width}×${result.height}</strong></div></div><div class="pb-bead-photo-previews"><div class="pb-bead-photo-preview"><strong>原始成品图</strong><img src="${result.sourceUrl}" alt="原始成品拼豆图"></div><div class="pb-bead-photo-preview"><strong>带色号标注图</strong><img src="${annotatedUrl}" alt="带色号标注图"></div></div><div class="pb-bead-photo-list">${rows}</div><p class="pb-bead-photo-note">色号和颜色均来自项目当前色板；网格位置与数量根据你提供的成品照片读取，照片反光或透视可能影响个别格子的匹配。</p><div class="pb-bead-photo-actions"><a class="pb-bead-photo-button" download="成品拼豆图色号标注.png" href="${annotatedUrl}">下载标注图</a><a class="pb-bead-photo-button secondary" download="成品拼豆图色号清单.csv" href="${encoded}">下载颜色清单</a><button class="pb-bead-photo-button secondary" data-pb-photo-action="close">关闭</button></div>`);
  };

  input.addEventListener('change', async () => {
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    openLoading();
    try { openResult(await analyze(file)); }
    catch (error) { open(`<h2>识别失败</h2><p>${compact(error?.message || '无法识别这张图片，请使用清晰、正对、完整的拼豆照片。')}</p><div class="pb-bead-photo-actions"><button class="pb-bead-photo-button secondary" data-pb-photo-action="close">关闭</button></div>`); }
  });

  layer.addEventListener('click', event => {
    if (event.target === layer) return close();
    const button = event.target.closest('[data-pb-photo-action]');
    if (!button) return;
    const action = button.dataset.pbPhotoAction;
    if (action === 'cancel' || action === 'close') return close();
    if (action === 'generate') { close(); document.getElementById('pindou-image-upload-input')?.click(); return; }
    if (action === 'analyze') { close(); input.click(); }
  });

  document.addEventListener('click', event => {
    const upload = event.target.closest?.('.pb-reference-action.pb-upload');
    if (!upload) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openChoice();
  }, true);

  // Also bind directly to the rendered hotspot. This covers browsers where
  // the reference-home layer is mounted after the document listener runs.
  const installUploadGuard = () => {
    const upload = document.querySelector('.pb-reference-action.pb-upload');
    if (!upload || upload.dataset.pbPhotoGuard === '1') return;
    upload.dataset.pbPhotoGuard = '1';
    upload.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openChoice();
    }, true);
  };
  installUploadGuard();
  new MutationObserver(installUploadGuard).observe(document.body, { childList: true, subtree: true });
})();

/* ===== bundled source: _custom/hide-elements.js ===== */
/* ============================================================
 * 界面精简补丁 —— 由用户指定隐藏以下元素
 *   1. 「预览视频效果」整个区块
 *   2. 「视频教程」按钮
 *   3. 「常用AI 风格生图口令」按钮
 *   4. header 的「登录账户」按钮（保留「历史记录」）
 *
 * 实现方式：不改动原站任何代码，只在运行时按文本精准隐藏。
 * 用 MutationObserver 兜住 React 重渲染，避免元素被重新挂回来。
 * 想恢复：把 serve.py 里的注入那行注释掉。
 * ============================================================ */
(function () {
  'use strict';

  var norm = function (s) { return (s || '').replace(/\s+/g, '').trim(); };

  // 每条规则：选择器 + 文本判定
  var RULES = [
    {
      // 整个视频区块（含标题、说明、播放器、"视频仅为效果示例…"）
      sel: 'section',
      hit: function (el) {
        var t = norm(el.innerText);
        return t.indexOf('预览视频效果') !== -1 && t.indexOf('视频仅为效果示例') !== -1;
      },
      note: '预览视频效果区块'
    },
    {
      sel: 'button',
      hit: function (el) { return norm(el.innerText) === '视频教程'; },
      note: '视频教程按钮'
    },
    {
      sel: 'button',
      hit: function (el) { return norm(el.innerText) === '常用AI风格生图口令'; },
      note: '常用AI风格生图口令按钮'
    },
    {
      sel: 'button',
      hit: function (el) {
        var t = norm(el.innerText);
        return t === '登录账户' || t === '登录';
      },
      note: '登录账户按钮'
    },
    {
      // 整个页脚（版权 · 关于我们 · 联系我们 · ICP备案 · 公网安备）
      sel: 'footer',
      hit: function (el) {
        var t = norm(el.innerText);
        return t.indexOf('鲁ICP备') !== -1 || t.indexOf('PixelBead底稿生成器') !== -1;
      },
      note: '页脚'
    }
  ];

  var MARK = 'hiddenByUiPatch';
  var running = false;

  function apply() {
    if (running) return;          // 防止 MutationObserver 自触发递归
    running = true;
    try {
      RULES.forEach(function (rule) {
        var nodes = document.querySelectorAll(rule.sel);
        for (var i = 0; i < nodes.length; i++) {
          var el = nodes[i];
          if (el.dataset && el.dataset[MARK] === '1') continue;
          var ok = false;
          try { ok = rule.hit(el); } catch (e) { ok = false; }
          if (!ok) continue;
          el.style.setProperty('display', 'none', 'important');
          if (el.dataset) el.dataset[MARK] = '1';
        }
      });
    } finally {
      running = false;
    }
  }

  function start() {
    apply();
    var scheduled = false;
    var schedule = function () {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        apply();
      });
    };
    var mo = new MutationObserver(schedule);
    mo.observe(document.documentElement, { childList: true, subtree: true });
    // 只在 React hydration 可能重建页面的短窗口内校准，不持续轮询。
    [120, 400, 900, 1800, 3200, 5000].forEach(function (ms) { setTimeout(schedule, ms); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
