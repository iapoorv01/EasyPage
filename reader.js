// reader.js - Loads file from chrome.storage.local and renders it with all reading effects


// --- Reading Effects & Settings ---
const defaultSettings = {
  font: 'default',
  fontSize: 18,
  lineSpacing: 1.7,
  bgColor: '#111111',
  textColor: '#fafafa',
};

function getSettings() {
  try {
    return JSON.parse(localStorage.getItem('readerSettings')) || { ...defaultSettings };
  } catch {
    return { ...defaultSettings };
  }
}
function saveSettings(settings) {
  localStorage.setItem('readerSettings', JSON.stringify(settings));
}
function applySettingsToContent(settings) {
  const contentEl = document.getElementById('readerContent');
  let fontFamily = '';
  let fontWeight = settings.bold ? 'bold' : (settings.weight ? settings.weight : 'normal');
  let fontStyle = settings.italic ? 'italic' : 'normal';
  function loadFontFace(name, url, weight = 'normal', style = 'normal') {
    const id = `font-${name.replace(/\s/g, '')}-${weight}-${style}`;
    if (document.getElementById(id)) return;
    const styleEl = document.createElement('style');
    styleEl.id = id;
    styleEl.textContent = `@font-face { font-family: '${name}'; src: url('${url}'); font-weight: ${weight}; font-style: ${style}; font-display: swap; }`;
    document.head.appendChild(styleEl);
  }
  switch (settings.font) {
    case 'opendyslexic':
      fontFamily = '"OpenDyslexic", Arial, sans-serif';
      if (!document.getElementById('opendyslexic-css')) {
        const link = document.createElement('link');
        link.id = 'opendyslexic-css';
        link.rel = 'stylesheet';
        link.href = 'fonts/opendyslexic.css';
        document.head.appendChild(link);
      }
      // OpenDyslexic bold handled by font-weight, as the CSS includes all weights
      break;
    case 'Fast Sans':
      if (settings.bold && settings.italic) {
        loadFontFace('Fast Sans', 'fonts/kindle/Fast_Sans/Fast_Sans-BoldItalic.otf', 'bold', 'italic');
        fontFamily = 'Fast Sans, Arial, sans-serif';
        fontWeight = 'bold';
        fontStyle = 'italic';
      } else if (settings.bold) {
        loadFontFace('Fast Sans', 'fonts/kindle/Fast_Sans/Fast_Sans-Bold.otf', 'bold', 'normal');
        fontFamily = 'Fast Sans, Arial, sans-serif';
        fontWeight = 'bold';
        fontStyle = 'normal';
      } else if (settings.italic) {
        loadFontFace('Fast Sans', 'fonts/kindle/Fast_Sans/Fast_Sans-Italic.otf', 'normal', 'italic');
        fontFamily = 'Fast Sans, Arial, sans-serif';
        fontWeight = 'normal';
        fontStyle = 'italic';
      } else {
        loadFontFace('Fast Sans', 'fonts/Fast_Sans.ttf', 'normal', 'normal');
        fontFamily = 'Fast Sans, Arial, sans-serif';
        fontWeight = 'normal';
        fontStyle = 'normal';
      }
      break;
    case 'Fast Serif':
      if (settings.bold && settings.italic) {
        loadFontFace('Fast Serif', 'fonts/kindle/Fast_Serif/Fast_Serif-BoldItalic.otf', 'bold', 'italic');
        fontFamily = 'Fast Serif, serif';
        fontWeight = 'bold';
        fontStyle = 'italic';
      } else if (settings.bold) {
        loadFontFace('Fast Serif', 'fonts/kindle/Fast_Serif/Fast_Serif-Bold.otf', 'bold', 'normal');
        fontFamily = 'Fast Serif, serif';
        fontWeight = 'bold';
        fontStyle = 'normal';
      } else if (settings.italic) {
        loadFontFace('Fast Serif', 'fonts/kindle/Fast_Serif/Fast_Serif-Italic.otf', 'normal', 'italic');
        fontFamily = 'Fast Serif, serif';
        fontWeight = 'normal';
        fontStyle = 'italic';
      } else {
        loadFontFace('Fast Serif', 'fonts/Fast_Serif.ttf', 'normal', 'normal');
        fontFamily = 'Fast Serif, serif';
        fontWeight = 'normal';
        fontStyle = 'normal';
      }
      break;
    case 'Fast Mono':
      if (settings.bold && settings.italic) {
        loadFontFace('Fast Mono', 'fonts/kindle/Fast_Mono/Fast_Mono-BoldItalic.otf', 'bold', 'italic');
        fontFamily = 'Fast Mono, monospace';
        fontWeight = 'bold';
        fontStyle = 'italic';
      } else if (settings.bold) {
        loadFontFace('Fast Mono', 'fonts/kindle/Fast_Mono/Fast_Mono-Bold.otf', 'bold', 'normal');
        fontFamily = 'Fast Mono, monospace';
        fontWeight = 'bold';
        fontStyle = 'normal';
      } else if (settings.italic) {
        loadFontFace('Fast Mono', 'fonts/kindle/Fast_Mono/Fast_Mono-Italic.otf', 'normal', 'italic');
        fontFamily = 'Fast Mono, monospace';
        fontWeight = 'normal';
        fontStyle = 'italic';
      } else {
        loadFontFace('Fast Mono', 'fonts/Fast_Mono.ttf', 'normal', 'normal');
        fontFamily = 'Fast Mono, monospace';
        fontWeight = 'normal';
        fontStyle = 'normal';
      }
      break;
    case 'serif':
      fontFamily = 'serif';
      break;
    case 'sans-serif':
      fontFamily = 'sans-serif';
      break;
    case 'monospace':
      fontFamily = 'monospace';
      break;
    default:
      fontFamily = 'inherit';
  }
  contentEl.style.fontFamily = fontFamily;
  contentEl.style.fontWeight = fontWeight;
  contentEl.style.fontStyle = fontStyle;
  contentEl.style.fontSize = settings.fontSize + 'px';
  contentEl.style.lineHeight = settings.lineSpacing;
  contentEl.style.background = settings.bgColor;
  contentEl.style.color = settings.textColor;
}

document.addEventListener('DOMContentLoaded', async () => {
    // Ensure all fonts are loaded on startup
    function preloadAllFonts() {
      // OpenDyslexic
      if (!document.getElementById('opendyslexic-css')) {
        const link = document.createElement('link');
        link.id = 'opendyslexic-css';
        link.rel = 'stylesheet';
        link.href = 'fonts/opendyslexic.css';
        document.head.appendChild(link);
      }
      // Fast Sans
      const loadFontFace = (name, url, weight = 'normal', style = 'normal') => {
        const id = `font-${name.replace(/\s/g, '')}-${weight}-${style}`;
        if (document.getElementById(id)) return;
        const styleEl = document.createElement('style');
        styleEl.id = id;
        styleEl.textContent = `@font-face { font-family: '${name}'; src: url('${url}'); font-weight: ${weight}; font-style: ${style}; font-display: swap; }`;
        document.head.appendChild(styleEl);
      };
      loadFontFace('Fast Sans', 'fonts/Fast_Sans.ttf', 'normal', 'normal');
      loadFontFace('Fast Sans', 'fonts/kindle/Fast_Sans/Fast_Sans-Bold.otf', 'bold', 'normal');
      loadFontFace('Fast Sans', 'fonts/kindle/Fast_Sans/Fast_Sans-Italic.otf', 'normal', 'italic');
      loadFontFace('Fast Sans', 'fonts/kindle/Fast_Sans/Fast_Sans-BoldItalic.otf', 'bold', 'italic');
      // Fast Serif
      loadFontFace('Fast Serif', 'fonts/Fast_Serif.ttf', 'normal', 'normal');
      loadFontFace('Fast Serif', 'fonts/kindle/Fast_Serif/Fast_Serif-Bold.otf', 'bold', 'normal');
      loadFontFace('Fast Serif', 'fonts/kindle/Fast_Serif/Fast_Serif-Italic.otf', 'normal', 'italic');
      loadFontFace('Fast Serif', 'fonts/kindle/Fast_Serif/Fast_Serif-BoldItalic.otf', 'bold', 'italic');
      // Fast Mono
      loadFontFace('Fast Mono', 'fonts/Fast_Mono.ttf', 'normal', 'normal');
      loadFontFace('Fast Mono', 'fonts/kindle/Fast_Mono/Fast_Mono-Bold.otf', 'bold', 'normal');
      loadFontFace('Fast Mono', 'fonts/kindle/Fast_Mono/Fast_Mono-Italic.otf', 'normal', 'italic');
      loadFontFace('Fast Mono', 'fonts/kindle/Fast_Mono/Fast_Mono-BoldItalic.otf', 'bold', 'italic');
    }
    preloadAllFonts();
  // Theme logic
  const themeToggle = document.getElementById('themeToggle');
  function setTheme(theme) {
    document.body.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem('readerTheme', theme);
  }
  function getTheme() {
    return localStorage.getItem('readerTheme') || 'dark';
  }
  // Set initial theme
  setTheme(getTheme());
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }
  const titleEl = document.getElementById('readerTitle');
  const contentEl = document.getElementById('readerContent');
  const backBtn = document.getElementById('backBtn');
  const exportBtn = document.getElementById('exportBtn');
  const settingsBtn = document.getElementById('settingsBtn');
  // Settings drawer elements
  const settingsDrawer = document.getElementById('settingsDrawer');
  const closeSettingsDrawer = document.getElementById('closeSettingsDrawer');
  const ctlFont = document.getElementById('ctlFont');
  const ctlFontSize = document.getElementById('ctlFontSize');
  const ctlBold = document.getElementById('ctlBold');
  const ctlItalic = document.getElementById('ctlItalic');
  const ctlUnderline = document.getElementById('ctlUnderline');
  const ctlUnderlineDotted = document.getElementById('ctlUnderlineDotted');
  const ctlUnderlineDashed = document.getElementById('ctlUnderlineDashed');
  const ctlHighlight = document.getElementById('ctlHighlight');
  const ctlStrength = document.getElementById('ctlStrength');
  const ctlStrengthVal = document.getElementById('ctlStrengthVal');
  const ctlOpacity = document.getElementById('ctlOpacity');
  const ctlOpacityVal = document.getElementById('ctlOpacityVal');
  const ctlLineHeight = document.getElementById('ctlLineHeight');
  const ctlLineHeightVal = document.getElementById('ctlLineHeightVal');
  const ctlWeight = document.getElementById('ctlWeight');
  const ctlWeightVal = document.getElementById('ctlWeightVal');
  const ctlSkipMinus = document.getElementById('ctlSkipMinus');
  const ctlSkipPlus = document.getElementById('ctlSkipPlus');
  const ctlSkipValue = document.getElementById('ctlSkipValue');
  const ctlHighlightColor = document.getElementById('ctlHighlightColor');
  const ctlInkColor = document.getElementById('ctlInkColor');
  const ctlFadeColor = document.getElementById('ctlFadeColor');
  const ctlBackgroundColor = document.getElementById('ctlBackgroundColor');
  const ctlInk = document.getElementById('ctlInk');
  const ctlFade = document.getElementById('ctlFade');
  const ctlBackground = document.getElementById('ctlBackground');
  const ctlDone = document.getElementById('ctlDone');
  const ctlFontSizeSelect = ctlFontSize;
  // Export modal elements
  const exportModal = document.getElementById('exportModal');
  const closeExport = document.getElementById('closeExport');
  const exportFormat = document.getElementById('exportFormat');
  const exportFilename = document.getElementById('exportFilename');
  const exportConfirm = document.getElementById('exportConfirm');

  // Load file from storage
  chrome.storage.local.get(['readerFile'], async (result) => {
    if (!result.readerFile) {
      titleEl.textContent = 'No file loaded';
      contentEl.textContent = 'Please use the Converter tab to upload a file.';
      return;
    }
    const { name, type, data } = result.readerFile;
    titleEl.textContent = name;
    const arrayBuffer = new Uint8Array(data).buffer;
    try {
      if (type === 'text/plain' || name.endsWith('.txt')) {
        const text = window.parseTxt(arrayBuffer);
        contentEl.textContent = text;
      } else if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || name.endsWith('.docx')) {
        contentEl.innerHTML = '<div class="loading">Parsing DOCX...</div>';
        const html = await window.parseDocx(arrayBuffer);
        contentEl.innerHTML = html;
      } else if (type === 'application/epub+zip' || name.endsWith('.epub')) {
        contentEl.innerHTML = '<div class="loading">Parsing EPUB...</div>';
        const html = await window.parseEpub(arrayBuffer);
        contentEl.innerHTML = html;
      } else {
        contentEl.textContent = 'Unsupported file type.';
      }
    } catch (err) {
      contentEl.textContent = 'Error parsing file: ' + err.message;
    }
    // Apply reading effects after rendering
    // ensure more advanced visual adjustments are applied too
    const settings = Object.assign({
      bold: false,
      italic: false,
      underline: false,
      highlight: false,
      strength: 100,
      opacity: 100,
      weight: 400,
      skip: 0,
      highlightColor: '#fff176',
      mode: 'ink',
      background: false,
    }, getSettings());
    applySettingsToContent(settings);
    applyAdvancedVisuals(settings);
  });

  // --- Settings Drawer Logic ---
  function openSettingsDrawer() {
    const s = Object.assign({}, getSettings());
    // ensure advanced defaults
    s.bold = s.bold || false;
    s.italic = s.italic || false;
    s.underline = s.underline || false;
    s.highlight = s.highlight || false;
    s.strength = s.strength || 100;
    s.opacity = s.opacity || 100;
    s.weight = s.weight || 400;
    s.skip = s.skip || 0;
    s.inkColor = s.inkColor || '#d32f2f';
    s.fadeColor = s.fadeColor || '#f44336';
    s.backgroundColor = s.backgroundColor || '#fffbe6';
    s.highlightColor = s.highlightColor || '#fff176';
    s.underlineStyle = s.underlineStyle || 'solid';
    s.mode = s.mode || 'ink';
    s.background = !!s.background;
    // populate controls
    if (ctlFont) ctlFont.value = s.font || 'inherit';
    if (ctlFontSizeSelect) ctlFontSizeSelect.value = (s.fontSize ? s.fontSize + 'px' : '18px');
    if (ctlBold) ctlBold.classList.toggle('active', !!s.bold);
    if (ctlItalic) ctlItalic.classList.toggle('active', !!s.italic);
    if (ctlUnderline) ctlUnderline.classList.toggle('active', s.underlineStyle === 'solid');
    if (ctlUnderlineDotted) ctlUnderlineDotted.classList.toggle('active', s.underlineStyle === 'dotted');
    if (ctlUnderlineDashed) ctlUnderlineDashed.classList.toggle('active', s.underlineStyle === 'dashed');
    if (ctlHighlight) ctlHighlight.classList.toggle('active', !!s.highlight);
    if (ctlStrength) { ctlStrength.value = s.strength; ctlStrengthVal.textContent = s.strength + '%'; }
    if (ctlOpacity) { ctlOpacity.value = s.opacity; ctlOpacityVal.textContent = s.opacity + '%'; }
    if (ctlLineHeight) { ctlLineHeight.value = s.lineSpacing || 1.7; ctlLineHeightVal.textContent = (s.lineSpacing || 1.7) + 'x'; }
    if (ctlWeight) { ctlWeight.value = s.weight || 400; ctlWeightVal.textContent = (s.weight || 400); }
    if (ctlSkipValue) ctlSkipValue.textContent = (s.skip || 0);
    if (ctlInkColor) ctlInkColor.value = s.inkColor || '#d32f2f';
    if (ctlFadeColor) ctlFadeColor.value = s.fadeColor || '#f44336';
    if (ctlBackgroundColor) ctlBackgroundColor.value = s.backgroundColor || '#fffbe6';
    if (ctlHighlightColor) ctlHighlightColor.value = s.highlightColor || '#fff176';
    if (ctlInk) ctlInk.classList.toggle('active', s.mode === 'ink');
    if (ctlFade) ctlFade.classList.toggle('active', s.mode === 'fade');
    if (ctlBackground) ctlBackground.checked = !!s.background;
    settingsDrawer.style.display = 'flex';
  }
  function closeSettingsDrawerFn() { settingsDrawer.style.display = 'none'; }
  settingsBtn.addEventListener('click', openSettingsDrawer);
  closeSettingsDrawer.addEventListener('click', closeSettingsDrawerFn);

  // control events
  function updateSettingAndApply(partial) {
    const s = Object.assign({}, getSettings(), partial);
    saveSettings(s);
    applySettingsToContent(s);
    applyAdvancedVisuals(s);
  }
  // font family
  if (ctlFont) ctlFont.addEventListener('change', () => {
    const s = getSettings();
    updateSettingAndApply({ font: ctlFont.value, bold: s.bold, italic: s.italic });
  });
  if (ctlFontSizeSelect) ctlFontSizeSelect.addEventListener('change', () => {
    const val = parseInt(ctlFontSizeSelect.value, 10) || 18;
    updateSettingAndApply({ fontSize: val });
  });
  // style buttons
  if (ctlBold) ctlBold.addEventListener('click', () => {
    ctlBold.classList.toggle('active');
    const s = getSettings();
    updateSettingAndApply({ bold: ctlBold.classList.contains('active'), font: s.font, italic: s.italic });
  });
  if (ctlItalic) ctlItalic.addEventListener('click', () => {
    ctlItalic.classList.toggle('active');
    const s = getSettings();
    updateSettingAndApply({ italic: ctlItalic.classList.contains('active'), font: s.font, bold: s.bold });
  });
  if (ctlUnderline) ctlUnderline.addEventListener('click', () => {
    ctlUnderline.classList.add('active');
    ctlUnderlineDotted.classList.remove('active');
    ctlUnderlineDashed.classList.remove('active');
    updateSettingAndApply({ underlineStyle: 'solid' });
  });
  if (ctlUnderlineDotted) ctlUnderlineDotted.addEventListener('click', () => {
    ctlUnderline.classList.remove('active');
    ctlUnderlineDotted.classList.add('active');
    ctlUnderlineDashed.classList.remove('active');
    updateSettingAndApply({ underlineStyle: 'dotted' });
  });
  if (ctlUnderlineDashed) ctlUnderlineDashed.addEventListener('click', () => {
    ctlUnderline.classList.remove('active');
    ctlUnderlineDotted.classList.remove('active');
    ctlUnderlineDashed.classList.add('active');
    updateSettingAndApply({ underlineStyle: 'dashed' });
  });
  if (ctlHighlight) ctlHighlight.addEventListener('click', () => { ctlHighlight.classList.toggle('active'); updateSettingAndApply({ highlight: ctlHighlight.classList.contains('active') }); });
  // sliders
  if (ctlStrength) ctlStrength.addEventListener('input', () => { ctlStrengthVal.textContent = ctlStrength.value + '%'; updateSettingAndApply({ strength: parseInt(ctlStrength.value, 10) }); });
  if (ctlOpacity) ctlOpacity.addEventListener('input', () => { ctlOpacityVal.textContent = ctlOpacity.value + '%'; updateSettingAndApply({ opacity: parseInt(ctlOpacity.value, 10) }); });
  if (ctlLineHeight) ctlLineHeight.addEventListener('input', () => { ctlLineHeightVal.textContent = ctlLineHeight.value + 'x'; updateSettingAndApply({ lineSpacing: parseFloat(ctlLineHeight.value) }); });
  if (ctlWeight) ctlWeight.addEventListener('input', () => { ctlWeightVal.textContent = ctlWeight.value; updateSettingAndApply({ weight: parseInt(ctlWeight.value, 10) }); });
  // skip
  if (ctlSkipMinus) ctlSkipMinus.addEventListener('click', () => { const v = Math.max(0, parseInt(ctlSkipValue.textContent,10)-1); ctlSkipValue.textContent = v; updateSettingAndApply({ skip: v }); });
  if (ctlSkipPlus) ctlSkipPlus.addEventListener('click', () => { const v = Math.min(30, parseInt(ctlSkipValue.textContent,10)+1); ctlSkipValue.textContent = v; updateSettingAndApply({ skip: v }); });
  if (ctlInkColor) ctlInkColor.addEventListener('input', () => updateSettingAndApply({ inkColor: ctlInkColor.value }));
  if (ctlFadeColor) ctlFadeColor.addEventListener('input', () => updateSettingAndApply({ fadeColor: ctlFadeColor.value }));
  if (ctlBackgroundColor) ctlBackgroundColor.addEventListener('input', () => updateSettingAndApply({ backgroundColor: ctlBackgroundColor.value }));
  if (ctlHighlightColor) ctlHighlightColor.addEventListener('input', () => updateSettingAndApply({ highlightColor: ctlHighlightColor.value }));
  if (ctlInk) ctlInk.addEventListener('click', () => { ctlInk.classList.add('active'); ctlFade.classList.remove('active'); updateSettingAndApply({ mode: 'ink' }); });
  if (ctlFade) ctlFade.addEventListener('click', () => { ctlFade.classList.add('active'); ctlInk.classList.remove('active'); updateSettingAndApply({ mode: 'fade' }); });
  if (ctlBackground) ctlBackground.addEventListener('change', () => updateSettingAndApply({ background: ctlBackground.checked }));
  if (ctlDone) ctlDone.addEventListener('click', () => closeSettingsDrawerFn());

  // --- Export Modal Logic ---
  // Remove any previous event listeners to prevent double export
  exportBtn.onclick = null;
  closeExport.onclick = null;
  exportConfirm.onclick = null;

  exportBtn.addEventListener('click', () => {
    exportFilename.value = titleEl.textContent || 'exported';
    exportModal.style.display = 'flex';
  });
  // Add close button and click-outside-to-close for export modal
  closeExport.addEventListener('click', () => {
    exportModal.style.display = 'none';
  });
  exportModal.addEventListener('mousedown', (e) => {
    if (e.target === exportModal) exportModal.style.display = 'none';
  });
  exportConfirm.addEventListener('click', () => {
    const fmt = exportFormat.value || 'html';
    const filename = (exportFilename.value || titleEl.textContent || 'exported').replace(/\.[^/.]+$/, '');
    // Clone content to preserve inline styles
    if (fmt === 'html') {
      const s = getSettings();
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>${filename}</title></head><body>${contentEl.innerHTML}</body></html>`;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = filename + '.html'; document.body.appendChild(a); a.click(); setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); },200);
    } else {
      const text = contentEl.textContent || '';
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = filename + '.txt'; document.body.appendChild(a); a.click(); setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); },200);
    }
    exportModal.style.display = 'none';
  });

  // --- Advanced Visuals Application ---
  function hexToRgb(hex) {
    const h = hex.replace('#','');
    const bigint = parseInt(h.length===3? h.split('').map(c=>c+c).join(''):h,16);
    return [(bigint>>16)&255, (bigint>>8)&255, bigint&255];
  }
  function applyAdvancedVisuals(settings){
    // Per-word highlighting and feature logic with skip
    const elems = contentEl.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, div');
    // Regex for emoji (unicode)
    const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;
    elems.forEach(el => {
      const words = el.textContent.split(/(\s+)/);
      let wordIndex = 0;
      el.innerHTML = words.map((word, i) => {
        if (/^\s+$/.test(word)) return word;
        // If word is only emoji, don't count for skip
        const isEmoji = emojiRegex.test(word) && word.replace(emojiRegex, '').length === 0;
        const isWord = !/^\s+$/.test(word) && !isEmoji;
        let applyFeatures = false;
        if (settings.skip === 0) {
          applyFeatures = isWord;
        } else {
          applyFeatures = isWord && (wordIndex % settings.skip === 0);
        }
        let result = '';
        if (applyFeatures) {
          // Split word by strength
          const strength = Math.max(0, Math.min(100, settings.strength || 100));
          const splitAt = Math.ceil(word.length * (strength / 100));
          const mainPart = word.slice(0, splitAt);
          const restPart = word.slice(splitAt);
          // Main part: all effects
          let styleMain = '';
          if (settings.mode === 'ink') styleMain += `color:${settings.inkColor||'#d32f2f'};`;
          if (settings.mode === 'fade') styleMain += `color:${settings.fadeColor||'#f44336'};opacity:0.5;`;
          if (settings.highlight) {
            const rgb = hexToRgb(settings.highlightColor || '#fff176');
            const baseAlpha = settings.mode === 'fade' ? 0.25 : 0.6;
            const alpha = Math.max(0.05, baseAlpha * ((settings.strength||100)/100) * ((settings.opacity||100)/100));
            const rgba = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
            styleMain += `background:${rgba};padding:2px 4px;border-radius:4px;`;
          }
          styleMain += `font-weight:${settings.bold ? 'bold' : (settings.weight||400)};`;
          if (settings.italic) styleMain += 'font-style:italic;';
          if (settings.underlineStyle) styleMain += `text-decoration:underline; text-decoration-style:${settings.underlineStyle};`;
          styleMain += `word-spacing:${settings.skip||0}px;`;
          // Rest part: only opacity if set
          let styleRest = '';
          if (restPart && (settings.opacity !== undefined && settings.opacity !== 100)) {
            styleRest += `opacity:${settings.opacity/100};`;
          }
          styleRest += `font-weight:normal;font-style:normal;word-spacing:${settings.skip||0}px;`;
          result = `<span style=\"${styleMain}\">${mainPart}</span>`;
          if (restPart) result += `<span style=\"${styleRest}\">${restPart}</span>`;
        } else {
          // Non-targeted or emoji: normal style
          let style = 'font-weight:normal;font-style:normal;';
          style += `word-spacing:${settings.skip||0}px;`;
          result = `<span style=\"${style}\">${word}</span>`;
        }
        if (isWord) wordIndex++;
        return result;
      }).join('');
      el.style.opacity = 1;
    });
    // Background toggle
    if (settings.background) {
      contentEl.style.background = settings.backgroundColor || settings.bgColor || '#fffbe6';
    } else {
      contentEl.style.background = settings.bgColor || '';
    }
  }


  // --- Export Modal: Add EPUB Option ---
  if (exportFormat && !exportFormat.querySelector('option[value="epub"]')) {
    const epubOption = document.createElement('option');
    epubOption.value = 'epub';
    epubOption.textContent = 'EPUB';
    exportFormat.appendChild(epubOption);
  }

  // --- Export Logic ---
  exportConfirm.addEventListener('click', () => {
    const fmt = exportFormat.value || 'html';
    const filename = (exportFilename.value || titleEl.textContent || 'exported').replace(/\.[^/.]+$/, '');
  if (fmt === 'html') {
      const s = getSettings();
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>${filename}</title></head><body>${contentEl.innerHTML}</body></html>`;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = filename + '.html'; document.body.appendChild(a); a.click(); setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); },200);
    } else if (fmt === 'txt') {
      const text = contentEl.textContent || '';
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = filename + '.txt'; document.body.appendChild(a); a.click(); setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); },200);
    } else if (fmt === 'epub') {
      // Ensure JSZip is loaded from libs
      if (!window.JSZip && typeof JSZip !== 'undefined') window.JSZip = JSZip;
      if (window.JSZip) {
        const html = `<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml"><head><title>${filename}</title><meta charset="utf-8"/></head><body>${contentEl.innerHTML}</body></html>`;
        const containerXml = `<?xml version='1.0' encoding='utf-8'?>\n<container version='1.0' xmlns='urn:oasis:names:tc:opendocument:xmlns:container'>\n<rootfiles>\n<rootfile full-path='OEBPS/content.xhtml' media-type='application/xhtml+xml'/></rootfiles>\n</container>`;
        const zip = new window.JSZip();
        zip.file("mimetype", "application/epub+zip");
        zip.folder("META-INF").file("container.xml", containerXml);
        const oebps = zip.folder("OEBPS");
        oebps.file("content.xhtml", html);
        oebps.file("content.opf", `<?xml version='1.0' encoding='utf-8'?>\n<package xmlns='http://www.idpf.org/2007/opf' unique-identifier='BookId' version='2.0'><metadata xmlns:dc='http://purl.org/dc/elements/1.1/'><dc:title>${filename}</dc:title></metadata><manifest><item id='content' href='content.xhtml' media-type='application/xhtml+xml'/></manifest><spine toc='ncx'><itemref idref='content'/></spine></package>`);
        zip.generateAsync({ type: "blob" }).then(function (epubBlob) {
          const url = URL.createObjectURL(epubBlob);
          const a = document.createElement('a'); a.href = url; a.download = filename + '.epub'; document.body.appendChild(a); a.click(); setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); },200);
        });
      } else {
        alert('EPUB export requires JSZip.');
      }
    } else if (fmt === 'docx') {
      // Ensure htmlDocx is loaded from libs
      if (!window.htmlDocx && typeof htmlDocx !== 'undefined') window.htmlDocx = htmlDocx;
      if (window.htmlDocx) {
        const html = `<!doctype html><html><head><meta charset='utf-8'><title>${filename}</title></head><body>${contentEl.innerHTML}</body></html>`;
        const docxBlob = window.htmlDocx.asBlob(html);
        const url = URL.createObjectURL(docxBlob);
        const a = document.createElement('a'); a.href = url; a.download = filename + '.docx'; document.body.appendChild(a); a.click(); setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); },200);
      } else {
        alert('DOCX export requires html-docx-js.');
      }
    }
    exportModal.style.display = 'none';
  });


  // --- Back Button ---
  backBtn.addEventListener('click', () => {
    window.close();
  });

  // Apply settings on load
  applySettingsToContent(getSettings());
});
