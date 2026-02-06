// Export Settings Modal logic (replicating reader.js modal)
document.addEventListener('DOMContentLoaded', () => {
  const exportSettingsBtn = document.getElementById('exportSettingsBtn');
  const exportSettingsModal = document.getElementById('exportSettingsModal');
  const closeExportSettingsBtn = document.getElementById('closeExportSettings');
  // Controls
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

  // Populate controls from exportSettings
  function populateExportControls() {
    if (ctlFont) ctlFont.value = exportSettings.font || 'inherit';
    if (ctlFontSize) ctlFontSize.value = (exportSettings.fontSize ? exportSettings.fontSize + 'px' : '18px');
    if (ctlBold) ctlBold.classList.toggle('active', !!exportSettings.bold);
    if (ctlItalic) ctlItalic.classList.toggle('active', !!exportSettings.italic);
    if (ctlUnderline) ctlUnderline.classList.toggle('active', exportSettings.underlineStyle === 'solid');
    if (ctlUnderlineDotted) ctlUnderlineDotted.classList.toggle('active', exportSettings.underlineStyle === 'dotted');
    if (ctlUnderlineDashed) ctlUnderlineDashed.classList.toggle('active', exportSettings.underlineStyle === 'dashed');
    if (ctlHighlight) ctlHighlight.classList.toggle('active', !!exportSettings.highlight);
    if (ctlStrength) { ctlStrength.value = exportSettings.strength; ctlStrengthVal.textContent = exportSettings.strength + '%'; }
    if (ctlOpacity) { ctlOpacity.value = exportSettings.opacity; ctlOpacityVal.textContent = exportSettings.opacity + '%'; }
    if (ctlLineHeight) { ctlLineHeight.value = exportSettings.lineSpacing || 1.7; ctlLineHeightVal.textContent = (exportSettings.lineSpacing || 1.7) + 'x'; }
    if (ctlWeight) { ctlWeight.value = exportSettings.weight || 400; ctlWeightVal.textContent = (exportSettings.weight || 400); }
    if (ctlSkipValue) ctlSkipValue.textContent = (exportSettings.skip || 0);
    if (ctlInkColor) ctlInkColor.value = exportSettings.inkColor || '#d32f2f';
    if (ctlFadeColor) ctlFadeColor.value = exportSettings.fadeColor || '#f44336';
    if (ctlBackgroundColor) ctlBackgroundColor.value = exportSettings.backgroundColor || '#fffbe6';
    if (ctlHighlightColor) ctlHighlightColor.value = exportSettings.highlightColor || '#fff176';
    if (ctlInk) ctlInk.classList.toggle('active', exportSettings.mode === 'ink');
    if (ctlFade) ctlFade.classList.toggle('active', exportSettings.mode === 'fade');
    if (ctlBackground) ctlBackground.checked = !!exportSettings.background;
  }

  // Open modal: populate controls
  if (exportSettingsBtn && exportSettingsModal) {
    exportSettingsBtn.addEventListener('click', () => {
      populateExportControls();
      exportSettingsModal.style.display = 'flex';
    });
  }
  if (closeExportSettingsBtn && exportSettingsModal) {
    closeExportSettingsBtn.addEventListener('click', () => {
      exportSettingsModal.style.display = 'none';
    });
  }
  // Click outside modal content closes modal
  if (exportSettingsModal) {
    exportSettingsModal.addEventListener('mousedown', (e) => {
      if (e.target === exportSettingsModal) {
        exportSettingsModal.style.display = 'none';
      }
    });
  }

  // Control events (mirroring reader.js)
  if (ctlFont) ctlFont.addEventListener('change', () => {
    exportSettings.font = ctlFont.value;
  });
  if (ctlFontSize) ctlFontSize.addEventListener('change', () => {
    exportSettings.fontSize = parseInt(ctlFontSize.value, 10) || 18;
  });
  if (ctlBold) ctlBold.addEventListener('click', () => {
    ctlBold.classList.toggle('active');
    exportSettings.bold = ctlBold.classList.contains('active');
  });
  if (ctlItalic) ctlItalic.addEventListener('click', () => {
    ctlItalic.classList.toggle('active');
    exportSettings.italic = ctlItalic.classList.contains('active');
  });
  if (ctlUnderline) ctlUnderline.addEventListener('click', () => {
    ctlUnderline.classList.add('active');
    ctlUnderlineDotted.classList.remove('active');
    ctlUnderlineDashed.classList.remove('active');
    exportSettings.underlineStyle = 'solid';
  });
  if (ctlUnderlineDotted) ctlUnderlineDotted.addEventListener('click', () => {
    ctlUnderline.classList.remove('active');
    ctlUnderlineDotted.classList.add('active');
    ctlUnderlineDashed.classList.remove('active');
    exportSettings.underlineStyle = 'dotted';
  });
  if (ctlUnderlineDashed) ctlUnderlineDashed.addEventListener('click', () => {
    ctlUnderline.classList.remove('active');
    ctlUnderlineDotted.classList.remove('active');
    ctlUnderlineDashed.classList.add('active');
    exportSettings.underlineStyle = 'dashed';
  });
  if (ctlHighlight) ctlHighlight.addEventListener('click', () => {
    ctlHighlight.classList.toggle('active');
    exportSettings.highlight = ctlHighlight.classList.contains('active');
  });
  if (ctlStrength) ctlStrength.addEventListener('input', () => {
    ctlStrengthVal.textContent = ctlStrength.value + '%';
    exportSettings.strength = parseInt(ctlStrength.value, 10);
  });
  if (ctlOpacity) ctlOpacity.addEventListener('input', () => {
    ctlOpacityVal.textContent = ctlOpacity.value + '%';
    exportSettings.opacity = parseInt(ctlOpacity.value, 10);
  });
  if (ctlLineHeight) ctlLineHeight.addEventListener('input', () => {
    ctlLineHeightVal.textContent = ctlLineHeight.value + 'x';
    exportSettings.lineSpacing = parseFloat(ctlLineHeight.value);
  });
  if (ctlWeight) ctlWeight.addEventListener('input', () => {
    ctlWeightVal.textContent = ctlWeight.value;
    exportSettings.weight = parseInt(ctlWeight.value, 10);
  });
  if (ctlSkipMinus) ctlSkipMinus.addEventListener('click', () => {
    const v = Math.max(0, parseInt(ctlSkipValue.textContent,10)-1);
    ctlSkipValue.textContent = v;
    exportSettings.skip = v;
  });
  if (ctlSkipPlus) ctlSkipPlus.addEventListener('click', () => {
    const v = Math.min(30, parseInt(ctlSkipValue.textContent,10)+1);
    ctlSkipValue.textContent = v;
    exportSettings.skip = v;
  });
  if (ctlInkColor) ctlInkColor.addEventListener('input', () => {
    exportSettings.inkColor = ctlInkColor.value;
  });
  if (ctlFadeColor) ctlFadeColor.addEventListener('input', () => {
    exportSettings.fadeColor = ctlFadeColor.value;
  });
  if (ctlBackgroundColor) ctlBackgroundColor.addEventListener('input', () => {
    exportSettings.backgroundColor = ctlBackgroundColor.value;
  });
  if (ctlHighlightColor) ctlHighlightColor.addEventListener('input', () => {
    exportSettings.highlightColor = ctlHighlightColor.value;
  });
  if (ctlInk) ctlInk.addEventListener('click', () => {
    ctlInk.classList.add('active');
    ctlFade.classList.remove('active');
    exportSettings.mode = 'ink';
  });
  if (ctlFade) ctlFade.addEventListener('click', () => {
    ctlFade.classList.add('active');
    ctlInk.classList.remove('active');
    exportSettings.mode = 'fade';
  });
  if (ctlBackground) ctlBackground.addEventListener('change', () => {
    exportSettings.background = ctlBackground.checked;
  });
  if (ctlDone) ctlDone.addEventListener('click', () => {
    if (exportSettingsModal) exportSettingsModal.style.display = 'none';
  });
});
// Popup.js - Extension popup logic

// DOM elements
// Converter tab elements
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const currentFileCard = document.getElementById('currentFileCard');
const fileTypeIcon = document.getElementById('fileTypeIcon');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const openInReaderBtn = document.getElementById('openInReaderBtn');
const downloadDropdownBtn = document.getElementById('downloadDropdownBtn');
const downloadDropdown = document.getElementById('downloadDropdown');
const downloadHtmlBtn = document.getElementById('downloadHtmlBtn');
const downloadEpubBtn = document.getElementById('downloadEpubBtn');
const downloadDocxBtn = document.getElementById('downloadDocxBtn');
let uploadedFile = null;
let parsedFileHtml = null; // Cache parsed HTML for DOCX/EPUB

// Drag & drop logic
if (dropArea && fileInput) {
  dropArea.addEventListener('click', () => fileInput.click());
  dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('dragover');
  });
  dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');
  });
  dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  });
  fileInput.addEventListener('change', (e) => {
    if (fileInput.files && fileInput.files[0]) {
      handleFileUpload(fileInput.files[0]);
    }
  });
}


function handleFileUpload(file) {
  uploadedFile = file;
  parsedFileHtml = null;
  // Show 'Current File' label
  const currentFileLabel = document.getElementById('currentFileLabel');
  if (currentFileLabel) currentFileLabel.style.display = 'block';
  if (currentFileCard) {
    currentFileCard.style.display = 'flex';
    // Set large icon
    if (fileTypeIcon) {
      let iconSvg = '';
      if (file.name.endsWith('.docx')) {
        iconSvg = '<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-file-type-doc"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4"></path><path d="M5 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1"></path><path d="M20 16.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0"></path><path d="M12.5 15a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1 -3 0v-3a1.5 1.5 0 0 1 1.5 -1.5"></path></svg>';
      } else if (file.name.endsWith('.epub')) {
        iconSvg = '<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10M7 11h10M7 15h10"/></svg>';
      } else {
        iconSvg = '<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10M7 11h10M7 15h10"/></svg>';
      }
      fileTypeIcon.innerHTML = iconSvg;
    }
    if (fileName) fileName.textContent = file.name;
    if (fileSize) fileSize.textContent = `${(file.size/1024).toFixed(1)} KB`;
  }
  // Parse DOCX/EPUB immediately for export
  if (file.name.endsWith('.docx')) {
    const reader = new FileReader();
    reader.onload = async function(e) {
      if (window.parseDocx) {
        parsedFileHtml = await window.parseDocx(e.target.result);
      } else {
        parsedFileHtml = null;
      }
    };
    reader.readAsArrayBuffer(file);
  } else if (file.name.endsWith('.epub')) {
    const reader = new FileReader();
    reader.onload = async function(e) {
      if (window.parseEpub) {
        parsedFileHtml = await window.parseEpub(e.target.result);
      } else {
        parsedFileHtml = null;
      }
    };
    reader.readAsArrayBuffer(file);
  }
}

// Dropdown logic
if (downloadDropdownBtn && downloadDropdown) {
  downloadDropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    downloadDropdown.style.display = downloadDropdown.style.display === 'block' ? 'none' : 'block';
  });
  document.addEventListener('click', (e) => {
    if (downloadDropdown.style.display === 'block') {
      downloadDropdown.style.display = 'none';
    }
  });
}

// Open in Reader button
if (openInReaderBtn) {
  openInReaderBtn.addEventListener('click', async () => {
    if (!uploadedFile) return;
    // Read file as ArrayBuffer and store in chrome.storage.local
    const reader = new FileReader();
    reader.onload = async function(e) {
      const arrayBuffer = e.target.result;
      await chrome.storage.local.set({ readerFile: {
        name: uploadedFile.name,
        type: uploadedFile.type,
        data: Array.from(new Uint8Array(arrayBuffer))
      }});
      window.open('reader.html', '_blank');
      // Do NOT reset Converter tab UI or file state
    };
    reader.readAsArrayBuffer(uploadedFile);
  });
}


// --- Export Settings State (mirroring reader.js advanced settings) ---
let exportSettings = {
  font: 'inherit',
  fontSize: 18,
  bold: false,
  italic: false,
  underline: false,
  underlineStyle: 'solid',
  highlight: false,
  strength: 100,
  opacity: 100,
  weight: 400,
  skip: 0,
  inkColor: '#d32f2f',
  fadeColor: '#f44336',
  background: false,
  backgroundColor: '#fffbe6',
  highlightColor: '#fff176',
  mode: 'ink',
  lineSpacing: 1.7
};

// --- Export Settings Drawer Logic (mirroring reader.js) ---
document.addEventListener('DOMContentLoaded', () => {
  // Controls
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

  // Populate controls from exportSettings
  function populateExportControls() {
    if (ctlFont) ctlFont.value = exportSettings.font || 'inherit';
    if (ctlFontSize) ctlFontSize.value = (exportSettings.fontSize ? exportSettings.fontSize + 'px' : '18px');
    if (ctlBold) ctlBold.classList.toggle('active', !!exportSettings.bold);
    if (ctlItalic) ctlItalic.classList.toggle('active', !!exportSettings.italic);
    if (ctlUnderline) ctlUnderline.classList.toggle('active', exportSettings.underlineStyle === 'solid');
    if (ctlUnderlineDotted) ctlUnderlineDotted.classList.toggle('active', exportSettings.underlineStyle === 'dotted');
    if (ctlUnderlineDashed) ctlUnderlineDashed.classList.toggle('active', exportSettings.underlineStyle === 'dashed');
    if (ctlHighlight) ctlHighlight.classList.toggle('active', !!exportSettings.highlight);
    if (ctlStrength) { ctlStrength.value = exportSettings.strength; ctlStrengthVal.textContent = exportSettings.strength + '%'; }
    if (ctlOpacity) { ctlOpacity.value = exportSettings.opacity; ctlOpacityVal.textContent = exportSettings.opacity + '%'; }
    if (ctlLineHeight) { ctlLineHeight.value = exportSettings.lineSpacing || 1.7; ctlLineHeightVal.textContent = (exportSettings.lineSpacing || 1.7) + 'x'; }
    if (ctlWeight) { ctlWeight.value = exportSettings.weight || 400; ctlWeightVal.textContent = (exportSettings.weight || 400); }
    if (ctlSkipValue) ctlSkipValue.textContent = (exportSettings.skip || 0);
    if (ctlInkColor) ctlInkColor.value = exportSettings.inkColor || '#d32f2f';
    if (ctlFadeColor) ctlFadeColor.value = exportSettings.fadeColor || '#f44336';
    if (ctlBackgroundColor) ctlBackgroundColor.value = exportSettings.backgroundColor || '#fffbe6';
    if (ctlHighlightColor) ctlHighlightColor.value = exportSettings.highlightColor || '#fff176';
    if (ctlInk) ctlInk.classList.toggle('active', exportSettings.mode === 'ink');
    if (ctlFade) ctlFade.classList.toggle('active', exportSettings.mode === 'fade');
    if (ctlBackground) ctlBackground.checked = !!exportSettings.background;
  }

  // Open drawer: populate controls
  const exportSettingsBtn = document.getElementById('exportSettingsBtn');
  const exportSettingsDrawer = document.getElementById('exportSettingsDrawer');
  if (exportSettingsBtn && exportSettingsDrawer) {
    exportSettingsBtn.addEventListener('click', () => {
      populateExportControls();
    });
  }

  // Control events (mirroring reader.js)
  if (ctlFont) ctlFont.addEventListener('change', () => {
    exportSettings.font = ctlFont.value;
  });
  if (ctlFontSize) ctlFontSize.addEventListener('change', () => {
    exportSettings.fontSize = parseInt(ctlFontSize.value, 10) || 18;
  });
  if (ctlBold) ctlBold.addEventListener('click', () => {
    ctlBold.classList.toggle('active');
    exportSettings.bold = ctlBold.classList.contains('active');
  });
  if (ctlItalic) ctlItalic.addEventListener('click', () => {
    ctlItalic.classList.toggle('active');
    exportSettings.italic = ctlItalic.classList.contains('active');
  });
  if (ctlUnderline) ctlUnderline.addEventListener('click', () => {
    ctlUnderline.classList.add('active');
    ctlUnderlineDotted.classList.remove('active');
    ctlUnderlineDashed.classList.remove('active');
    exportSettings.underlineStyle = 'solid';
  });
  if (ctlUnderlineDotted) ctlUnderlineDotted.addEventListener('click', () => {
    ctlUnderline.classList.remove('active');
    ctlUnderlineDotted.classList.add('active');
    ctlUnderlineDashed.classList.remove('active');
    exportSettings.underlineStyle = 'dotted';
  });
  if (ctlUnderlineDashed) ctlUnderlineDashed.addEventListener('click', () => {
    ctlUnderline.classList.remove('active');
    ctlUnderlineDotted.classList.remove('active');
    ctlUnderlineDashed.classList.add('active');
    exportSettings.underlineStyle = 'dashed';
  });
  if (ctlHighlight) ctlHighlight.addEventListener('click', () => {
    ctlHighlight.classList.toggle('active');
    exportSettings.highlight = ctlHighlight.classList.contains('active');
  });
  if (ctlStrength) ctlStrength.addEventListener('input', () => {
    ctlStrengthVal.textContent = ctlStrength.value + '%';
    exportSettings.strength = parseInt(ctlStrength.value, 10);
  });
  if (ctlOpacity) ctlOpacity.addEventListener('input', () => {
    ctlOpacityVal.textContent = ctlOpacity.value + '%';
    exportSettings.opacity = parseInt(ctlOpacity.value, 10);
  });
  if (ctlLineHeight) ctlLineHeight.addEventListener('input', () => {
    ctlLineHeightVal.textContent = ctlLineHeight.value + 'x';
    exportSettings.lineSpacing = parseFloat(ctlLineHeight.value);
  });
  if (ctlWeight) ctlWeight.addEventListener('input', () => {
    ctlWeightVal.textContent = ctlWeight.value;
    exportSettings.weight = parseInt(ctlWeight.value, 10);
  });
  if (ctlSkipMinus) ctlSkipMinus.addEventListener('click', () => {
    const v = Math.max(0, parseInt(ctlSkipValue.textContent,10)-1);
    ctlSkipValue.textContent = v;
    exportSettings.skip = v;
  });
  if (ctlSkipPlus) ctlSkipPlus.addEventListener('click', () => {
    const v = Math.min(30, parseInt(ctlSkipValue.textContent,10)+1);
    ctlSkipValue.textContent = v;
    exportSettings.skip = v;
  });
  if (ctlInkColor) ctlInkColor.addEventListener('input', () => {
    exportSettings.inkColor = ctlInkColor.value;
  });
  if (ctlFadeColor) ctlFadeColor.addEventListener('input', () => {
    exportSettings.fadeColor = ctlFadeColor.value;
  });
  if (ctlBackgroundColor) ctlBackgroundColor.addEventListener('input', () => {
    exportSettings.backgroundColor = ctlBackgroundColor.value;
  });
  if (ctlHighlightColor) ctlHighlightColor.addEventListener('input', () => {
    exportSettings.highlightColor = ctlHighlightColor.value;
  });
  if (ctlInk) ctlInk.addEventListener('click', () => {
    ctlInk.classList.add('active');
    ctlFade.classList.remove('active');
    exportSettings.mode = 'ink';
  });
  if (ctlFade) ctlFade.addEventListener('click', () => {
    ctlFade.classList.add('active');
    ctlInk.classList.remove('active');
    exportSettings.mode = 'fade';
  });
  if (ctlBackground) ctlBackground.addEventListener('change', () => {
    exportSettings.background = ctlBackground.checked;
  });
  if (ctlDone) ctlDone.addEventListener('click', () => {
    if (exportSettingsDrawer) exportSettingsDrawer.style.display = 'none';
  });
});

// --- Unified Export/Download Logic ---
function unifiedExport(format, content, filename) {
  if (format === 'html') {
    const html = `<!doctype html><html><head><meta charset='utf-8'><title>${filename}</title></head><body>${content}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    triggerDownload(blob, filename + '.html');
  } else if (format === 'txt') {
    const blob = new Blob([content], { type: 'text/plain' });
    triggerDownload(blob, filename + '.txt');
  } else if (format === 'epub') {
    if (!window.JSZip && typeof JSZip !== 'undefined') window.JSZip = JSZip;
    if (window.JSZip) {
      const html = `<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml"><head><title>${filename}</title><meta charset="utf-8"/></head><body>${content}</body></html>`;
      const containerXml = `<?xml version='1.0' encoding='utf-8'?>\n<container version='1.0' xmlns='urn:oasis:names:tc:opendocument:xmlns:container'>\n<rootfiles>\n<rootfile full-path='OEBPS/content.xhtml' media-type='application/xhtml+xml'/></rootfiles>\n</container>`;
      const zip = new window.JSZip();
      zip.file("mimetype", "application/epub+zip");
      zip.folder("META-INF").file("container.xml", containerXml);
      const oebps = zip.folder("OEBPS");
      oebps.file("content.xhtml", html);
      oebps.file("content.opf", `<?xml version='1.0' encoding='utf-8'?>\n<package xmlns='http://www.idpf.org/2007/opf' unique-identifier='BookId' version='2.0'><metadata xmlns:dc='http://purl.org/dc/elements/1.1/'><dc:title>${filename}</dc:title></metadata><manifest><item id='content' href='content.xhtml' media-type='application/xhtml+xml'/></manifest><spine toc='ncx'><itemref idref='content'/></spine></package>`);
      zip.generateAsync({ type: "blob" }).then(function (epubBlob) {
        triggerDownload(epubBlob, filename + '.epub');
      });
    } else {
      alert('EPUB export requires JSZip.');
    }
  } else if (format === 'docx') {
    if (!window.htmlDocx && typeof htmlDocx !== 'undefined') window.htmlDocx = htmlDocx;
    if (window.htmlDocx) {
      // Sanitize and wrap content as in reader.js
      let safeContent = content;
      // Remove any stray percent-encoded or malformed URI sequences
      try {
        // decodeURIComponent will throw on malformed, so we catch and skip
        decodeURIComponent(escape(safeContent));
      } catch (e) {
        // fallback: replace lone % with &#37;
        safeContent = safeContent.replace(/%(?![0-9A-Fa-f]{2})/g, '&#37;');
      }
      // Always wrap in a valid HTML document
      const html = `<!doctype html><html><head><meta charset='utf-8'><title>${filename}</title></head><body>${safeContent}</body></html>`;
      const docxBlob = window.htmlDocx.asBlob(html);
      triggerDownload(docxBlob, filename + '.docx');
    } else {
      alert('DOCX export requires html-docx-js.');
    }
  }
}

// --- Export/download buttons ---
if (downloadHtmlBtn) downloadHtmlBtn.addEventListener('click', () => {
  if (!uploadedFile) return alert('No file loaded.');
  extractExportContent(uploadedFile, function({text, html}) {
    let exportBody = '';
    if (html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      const targets = div.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, div');
      if (targets.length > 0) {
        targets.forEach(el => {
          el.innerHTML = getExportedHtml(el.textContent, exportSettings);
        });
        exportBody = div.innerHTML;
      } else {
        exportBody = getExportedHtml(div.textContent || '', exportSettings);
      }
    } else if (text) {
      exportBody = getExportedHtml(text, exportSettings);
    }
    if (!exportBody.trim()) exportBody = '<div style="color:red">(No content to export)</div>';
    unifiedExport('html', exportBody, uploadedFile.name.replace(/\.[^/.]+$/, ''));
  });
});
if (downloadEpubBtn) downloadEpubBtn.addEventListener('click', () => {
  if (!uploadedFile) return alert('No file loaded.');
  extractExportContent(uploadedFile, function({text, html}) {
    let exportBody = '';
    if (html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      Array.from(div.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, div')).forEach(el => {
        el.innerHTML = getExportedHtml(el.textContent, exportSettings);
      });
      exportBody = div.innerHTML;
    } else if (text) {
      exportBody = getExportedHtml(text, exportSettings);
    }
    if (!exportBody.trim()) exportBody = '<div style="color:red">(No content to export)</div>';
    unifiedExport('epub', exportBody, uploadedFile.name.replace(/\.[^/.]+$/, ''));
  });
});

if (downloadDocxBtn) downloadDocxBtn.addEventListener('click', () => {
  if (!uploadedFile) return alert('No file loaded.');
  extractExportContent(uploadedFile, function({text, html}) {
    // Create a hidden content element to match reader.js logic
    let contentDiv = document.getElementById('popupExportContent');
    if (!contentDiv) {
      contentDiv = document.createElement('div');
      contentDiv.id = 'popupExportContent';
      contentDiv.style.display = 'none';
      document.body.appendChild(contentDiv);
    }
    if (html) {
      contentDiv.innerHTML = html;
      // Apply getExportedHtml to each element's textContent (like reader.js advanced visuals)
      const targets = contentDiv.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, div');
      if (targets.length > 0) {
        targets.forEach(el => {
          el.innerHTML = getExportedHtml(el.textContent, exportSettings);
        });
      } else {
        contentDiv.innerHTML = getExportedHtml(contentDiv.textContent || '', exportSettings);
      }
    } else if (text) {
      contentDiv.innerHTML = getExportedHtml(text, exportSettings);
    } else {
      contentDiv.innerHTML = '<div style="color:red">(No content to export)</div>';
    }
    // Use innerHTML as export source, just like reader.js
    if (!window.htmlDocx && typeof htmlDocx !== 'undefined') window.htmlDocx = htmlDocx;
    if (window.htmlDocx) {
      const filename = uploadedFile.name.replace(/\.[^/.]+$/, '');
      const htmlDoc = `<!doctype html><html><head><meta charset='utf-8'><title>${filename}</title></head><body>${contentDiv.innerHTML}</body></html>`;
      const docxBlob = window.htmlDocx.asBlob(htmlDoc);
      const url = URL.createObjectURL(docxBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename + '.docx';
      document.body.appendChild(a);
      a.click();
      setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); },200);
    } else {
      alert('DOCX export requires html-docx-js.');
    }
  });
});

// Tab navigation
const tabButtons = [
  document.getElementById('tab-features'),
  document.getElementById('tab-converter'),
  document.getElementById('tab-settings')
];
const tabPanels = [
  document.getElementById('panel-features'),
  document.getElementById('panel-converter'),
  document.getElementById('panel-settings')
];

// Set Features as default active
tabButtons.forEach((btn, idx) => {
  if (btn) {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b, i) => {
        if (b) {
          b.classList.toggle('active', i === idx);
          b.setAttribute('aria-selected', i === idx ? 'true' : 'false');
        }
      });
      tabPanels.forEach((panel, i) => {
        if (panel) {
          panel.style.display = i === idx ? 'block' : 'none';
        }
      });
    });
  }
});
const jargonToggle = document.getElementById('jargonToggle');
const sensoryToggle = document.getElementById('sensoryToggle');
const dyslexiaToggle = document.getElementById('dyslexiaToggle');
const dyslexiaOptions = document.getElementById('dyslexiaOptions');
const dyslexiaFont = document.getElementById('dyslexiaFont');
const letterSpacing = document.getElementById('letterSpacing');
const letterSpacingValue = document.getElementById('letterSpacingValue');
const lineHeight = document.getElementById('lineHeight');
const lineHeightValue = document.getElementById('lineHeightValue');
const wordSpacing = document.getElementById('wordSpacing');
const wordSpacingValue = document.getElementById('wordSpacingValue');
const overlayColor = document.getElementById('overlayColor');

const bionicReading = document.getElementById('bionicReading');
const ttsToggle = document.getElementById('ttsToggle');
const ttsOptions = document.getElementById('ttsOptions');
const ttsPlay = document.getElementById('ttsPlay');
const ttsPause = document.getElementById('ttsPause');
const ttsStop = document.getElementById('ttsStop');
const ttsSpeed = document.getElementById('ttsSpeed');
const ttsPauseOnPunctuation = document.getElementById('ttsPauseOnPunctuation');
const ttsWordHighlight = document.getElementById('ttsWordHighlight');
const ttsVolume = document.getElementById('ttsVolume');
const ttsVolumeValue = document.getElementById('ttsVolumeValue');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const apiKeyInput = document.getElementById('apiKey');
const toggleKeyBtn = document.getElementById('toggleKey');
const saveKeyBtn = document.getElementById('saveKey');
const apiStatus = document.getElementById('apiStatus');
const statusText = document.getElementById('statusText');
const apiProvider = document.getElementById('apiProvider');
const geminiKeyInput = document.getElementById('geminiKey');
const toggleGeminiKeyBtn = document.getElementById('toggleGeminiKey');
const ttsVoiceSelect = document.getElementById('ttsVoice');
const apiProviderBadge = document.getElementById('apiProviderBadge');

// Theme & Size Controls
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const sizeButtons = document.querySelectorAll('.size-btn');

// Load saved settings
chrome.storage.sync.get([
  'jargonEnabled',
  'sensoryEnabled',
  'dyslexiaEnabled',
  'dyslexiaFont',
  'letterSpacing',
  'lineHeight',
  'wordSpacing',
  'overlayColor',

  'bionicReading',
  'ttsEnabled',
  'ttsSpeed',
  'ttsPauseOnPunctuation',
  'ttsWordHighlight',
  'ttsVolume',
  'theme',
  'popupSize',
  'apiProvider',
  'ttsVoice',
  'tourCompleted'
], (result) => {
  jargonToggle.checked = result.jargonEnabled || false;
  sensoryToggle.checked = result.sensoryEnabled || false;
  dyslexiaToggle.checked = result.dyslexiaEnabled || false;

  // Dyslexia settings
  dyslexiaFont.value = result.dyslexiaFont || 'opendyslexic';
  letterSpacing.value = result.letterSpacing || 1;
  lineHeight.value = result.lineHeight || 1.6;
  wordSpacing.value = result.wordSpacing || 3;
  overlayColor.value = result.overlayColor || 'none';
  bionicReading.checked = result.bionicReading || false;

  // TTS settings
  ttsToggle.checked = result.ttsEnabled || false;
  ttsSpeed.value = result.ttsSpeed || 1;
  ttsPauseOnPunctuation.checked = result.ttsPauseOnPunctuation !== false;
  ttsWordHighlight.checked = result.ttsWordHighlight !== false;
  ttsVolume.value = result.ttsVolume !== undefined ? result.ttsVolume : 70;
  ttsVolumeValue.textContent = (result.ttsVolume !== undefined ? result.ttsVolume : 70) + '%';

  // API Provider - Default to Gemini for new users
  const selectedProvider = result.apiProvider || 'gemini';
  apiProvider.value = selectedProvider;

  // Update badge directly
  if (apiProviderBadge) {
    apiProviderBadge.textContent = selectedProvider === 'gemini' ? 'Gemini' : 'OpenRouter';
    apiProviderBadge.className = 'api-provider-badge ' + selectedProvider;
  }

  // Show/hide correct key sections
  const openrouterSection = document.getElementById('openrouterSection');
  const geminiSection = document.getElementById('geminiSection');
  if (geminiSection) geminiSection.style.display = selectedProvider === 'gemini' ? 'block' : 'none';
  if (openrouterSection) openrouterSection.style.display = selectedProvider === 'openrouter' ? 'block' : 'none';

  updateRangeValues();

  // Show/hide options
  dyslexiaOptions.style.display = dyslexiaToggle.checked ? 'flex' : 'none';
  ttsOptions.style.display = ttsToggle.checked ? 'flex' : 'none';

  // Apply theme and size
  applyTheme(result.theme || 'dark');
  applySize(result.popupSize || 'normal');

  // Populate TTS voices
  populateTTSVoices(result.ttsVoice);

  // Check if tour should be shown (first time users)
  if (!result.tourCompleted) {
    setTimeout(() => startTour(), 500);
  }
});

// Load API keys separately from LOCAL storage (privacy-first)
chrome.storage.local.get(['apiKey', 'geminiKey'], (result) => {
  if (result.apiKey) {
    apiKeyInput.value = result.apiKey;
  }
  if (result.geminiKey) {
    geminiKeyInput.value = result.geminiKey;
  }
  if (result.apiKey || result.geminiKey) {
    showApiStatus('API key configured (local only)', 'success');
  }
});

// Jargon toggle
jargonToggle.addEventListener('change', async (e) => {
  const enabled = e.target.checked;
  await chrome.storage.sync.set({ jargonEnabled: enabled });
  await sendMessageToActiveTab({ action: 'toggleJargon', enabled });
  updateMainStatus();
});

// Sensory toggle
sensoryToggle.addEventListener('change', async (e) => {
  const enabled = e.target.checked;
  await chrome.storage.sync.set({ sensoryEnabled: enabled });
  await sendMessageToActiveTab({ action: 'toggleSensory', enabled });
  updateMainStatus();
});

// Dyslexia toggle
dyslexiaToggle.addEventListener('change', async (e) => {
  const enabled = e.target.checked;
  await chrome.storage.sync.set({ dyslexiaEnabled: enabled });
  dyslexiaOptions.style.display = enabled ? 'flex' : 'none';

  await sendMessageToActiveTab({
    action: 'toggleDyslexia',
    enabled,
    settings: getDyslexiaSettings()
  });
  updateMainStatus();
});

// Dyslexia font change
dyslexiaFont.addEventListener('change', async (e) => {
  await chrome.storage.sync.set({ dyslexiaFont: e.target.value });
  await sendMessageToActiveTab({
    action: 'updateDyslexia',
    settings: getDyslexiaSettings()
  });
});

// Letter spacing
letterSpacing.addEventListener('input', (e) => {
  updateRangeValues();
});

letterSpacing.addEventListener('change', async (e) => {
  await chrome.storage.sync.set({ letterSpacing: parseFloat(e.target.value) });
  await sendMessageToActiveTab({
    action: 'updateDyslexia',
    settings: getDyslexiaSettings()
  });
});

// Line height
lineHeight.addEventListener('input', (e) => {
  updateRangeValues();
});

lineHeight.addEventListener('change', async (e) => {
  await chrome.storage.sync.set({ lineHeight: parseFloat(e.target.value) });
  await sendMessageToActiveTab({
    action: 'updateDyslexia',
    settings: getDyslexiaSettings()
  });
});

// Word spacing
wordSpacing.addEventListener('input', (e) => {
  updateRangeValues();
});

wordSpacing.addEventListener('change', async (e) => {
  await chrome.storage.sync.set({ wordSpacing: parseInt(e.target.value) });
  await sendMessageToActiveTab({
    action: 'updateDyslexia',
    settings: getDyslexiaSettings()
  });
});

// Overlay color
overlayColor.addEventListener('change', async (e) => {
  await chrome.storage.sync.set({ overlayColor: e.target.value });
  await sendMessageToActiveTab({
    action: 'updateDyslexia',
    settings: getDyslexiaSettings()
  });
});



// Bionic reading
bionicReading.addEventListener('change', async (e) => {
  await chrome.storage.sync.set({ bionicReading: e.target.checked });
  await sendMessageToActiveTab({
    action: 'updateDyslexia',
    settings: getDyslexiaSettings()
  });
});

// TTS toggle
ttsToggle.addEventListener('change', async (e) => {
  const enabled = e.target.checked;
  await chrome.storage.sync.set({ ttsEnabled: enabled });
  ttsOptions.style.display = enabled ? 'flex' : 'none';

  await sendMessageToActiveTab({
    action: 'toggleTTS',
    enabled,
    settings: getTTSSettings()
  });
  updateMainStatus();
});

// TTS Play
ttsPlay.addEventListener('click', async () => {
  await sendMessageToActiveTab({ action: 'ttsPlay' });
});

// TTS Pause
ttsPause.addEventListener('click', async () => {
  await sendMessageToActiveTab({ action: 'ttsPause' });
});

// TTS Stop
ttsStop.addEventListener('click', async () => {
  await sendMessageToActiveTab({ action: 'ttsStop' });
});

// TTS Speed
ttsSpeed.addEventListener('change', async (e) => {
  await chrome.storage.sync.set({ ttsSpeed: parseFloat(e.target.value) });
  await sendMessageToActiveTab({
    action: 'updateTTS',
    settings: getTTSSettings()
  });
});

// TTS Pause on Punctuation
ttsPauseOnPunctuation.addEventListener('change', async (e) => {
  await chrome.storage.sync.set({ ttsPauseOnPunctuation: e.target.checked });
  await sendMessageToActiveTab({
    action: 'updateTTS',
    settings: getTTSSettings()
  });
});

// TTS Word Highlight
ttsWordHighlight.addEventListener('change', async (e) => {
  await chrome.storage.sync.set({ ttsWordHighlight: e.target.checked });
  await sendMessageToActiveTab({
    action: 'updateTTS',
    settings: getTTSSettings()
  });
});

// TTS Volume
ttsVolume.addEventListener('input', (e) => {
  const volume = parseInt(e.target.value);
  ttsVolumeValue.textContent = volume + '%';
});

ttsVolume.addEventListener('change', async (e) => {
  const volume = parseInt(e.target.value);
  await chrome.storage.sync.set({ ttsVolume: volume });
  // Volume applies to next playback - don't interrupt current TTS
});

// Settings panel toggle
settingsBtn.addEventListener('click', () => {
  const isOpen = settingsPanel.style.display === 'block';
  settingsPanel.style.display = isOpen ? 'none' : 'block';
  settingsBtn.classList.toggle('active', !isOpen);
});

// Toggle API key visibility
toggleKeyBtn.addEventListener('click', () => {
  const isPassword = apiKeyInput.type === 'password';
  apiKeyInput.type = isPassword ? 'text' : 'password';
  const eyeIcon = toggleKeyBtn.querySelector('svg');
  if (isPassword) {
    eyeIcon.innerHTML = '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>';
  } else {
    eyeIcon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';
  }
});

// Save API key
saveKeyBtn.addEventListener('click', async () => {
  const provider = apiProvider.value;
  const key = provider === 'gemini' ? geminiKeyInput.value.trim() : apiKeyInput.value.trim();

  if (!key) {
    showApiStatus('Please enter an API key', 'error');
    return;
  }

  // Validate API key format (basic check)
  if (key.length < 10) {
    showApiStatus('API key looks too short', 'error');
    return;
  }

  // Save to LOCAL storage (device-only, never syncs)
  const storageKey = provider === 'gemini' ? 'geminiKey' : 'apiKey';
  await chrome.storage.local.set({ [storageKey]: key });
  showApiStatus(`${provider === 'gemini' ? 'Gemini' : 'OpenRouter'} API key saved locally (device-only) ✓`, 'success');
  updateMainStatus();

  // Test the API key with the appropriate provider
  try {
    showApiStatus('Validating API key...', 'info');
    const response = await chrome.runtime.sendMessage({
      action: 'testApiKey',
      apiKey: key,
      provider: provider
    });

    if (response.success) {
      showApiStatus(`${provider === 'gemini' ? 'Gemini' : 'OpenRouter'} API key validated successfully`, 'success');
    } else {
      showApiStatus(`API key error: ${response.error}`, 'error');
    }
  } catch (error) {
    showApiStatus('Could not validate API key', 'error');
  }
});

// Helper: Send message to active tab
async function sendMessageToActiveTab(message) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Check if we can inject scripts or if it's a restricted URL
    if (!tab?.id || tab.url.startsWith('chrome://') || tab.url.startsWith('edge://')) {
      console.log('Cannot inject into this page');
      showApiStatus('Cannot run on this page (system page)', 'error');
      return;
    }

    try {
      await chrome.tabs.sendMessage(tab.id, message);
    } catch (error) {
      // If content script not loaded, inject it first
      if (error.message.includes('Receiving end does not exist')) {
        try {
          // Inject content script
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
          });

          // Inject content CSS
          await chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['content.css']
          });

          // Wait a bit for script to initialize
          await new Promise(resolve => setTimeout(resolve, 500));

          // Try sending message again
          await chrome.tabs.sendMessage(tab.id, message);
          showApiStatus('Extension loaded successfully', 'success');
        } catch (injectError) {
          console.error('Error injecting content script:', injectError);
          showApiStatus('Could not load extension on this page', 'error');
        }
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error sending message to tab:', error);
    showApiStatus('Error communicating with page', 'error');
  }
}

// Helper: Show API status message
function showApiStatus(message, type) {
  // Always reset display to ensure visibility
  apiStatus.style.display = 'block';
  apiStatus.textContent = message;
  apiStatus.className = `status-message ${type}`;

  if (type === 'success') {
    setTimeout(() => {
      apiStatus.style.display = 'none';
    }, 3000);
  }
}

// Helper: Update main status
function updateMainStatus() {
  const anyEnabled = jargonToggle.checked || sensoryToggle.checked || dyslexiaToggle.checked || ttsToggle.checked;

  if (anyEnabled) {
    const features = [];
    if (jargonToggle.checked) features.push('Jargon');
    if (sensoryToggle.checked) features.push('Sensory');
    if (dyslexiaToggle.checked) features.push('Dyslexia');
    if (ttsToggle.checked) features.push('TTS');
    statusText.textContent = `Active: ${features.join(', ')}`;
  } else {
    statusText.textContent = 'Ready to simplify';
  }
}

// Helper: Get dyslexia settings
function getDyslexiaSettings() {
  return {
    font: dyslexiaFont.value,
    letterSpacing: parseFloat(letterSpacing.value),
    lineHeight: parseFloat(lineHeight.value),
    wordSpacing: parseInt(wordSpacing.value),
    overlayColor: overlayColor.value,
    bionicReading: bionicReading.checked
  };
}

// Helper: Get TTS settings
function getTTSSettings() {
  return {
    speed: parseFloat(ttsSpeed.value),
    pauseOnPunctuation: ttsPauseOnPunctuation.checked,
    wordHighlight: ttsWordHighlight.checked,
    volume: parseInt(ttsVolume.value),
    voice: ttsVoiceSelect.value
  };
}

// Helper: Update range value displays
function updateRangeValues() {
  const letterValue = parseFloat(letterSpacing.value);
  letterSpacingValue.textContent = letterValue === 0 ? 'None' :
    letterValue < 2 ? 'Normal' :
      letterValue < 4 ? 'Wide' : 'Extra Wide';

  lineHeightValue.textContent = lineHeight.value;

  const wordValue = parseInt(wordSpacing.value);
  wordSpacingValue.textContent = wordValue === 0 ? 'None' :
    wordValue < 4 ? 'Normal' :
      wordValue < 7 ? 'Wide' : 'Extra Wide';
}

// Theme Toggle
themeToggle.addEventListener('click', async () => {
  const currentTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
  applyTheme(currentTheme);
  await chrome.storage.sync.set({ theme: currentTheme });
});

// Size Controls
sizeButtons.forEach(btn => {
  btn.addEventListener('click', async () => {
    const size = btn.dataset.size;
    applySize(size);
    await chrome.storage.sync.set({ popupSize: size });
  });
});

// Helper: Apply theme
function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    themeLabel.textContent = 'Dark';
    document.querySelector('.theme-icon-dark').style.display = 'none';
    document.querySelector('.theme-icon-light').style.display = 'block';
  } else {
    document.body.classList.remove('light-theme');
    themeLabel.textContent = 'Light';
    document.querySelector('.theme-icon-dark').style.display = 'block';
    document.querySelector('.theme-icon-light').style.display = 'none';
  }
}

// Helper: Apply size
function applySize(size) {
  // Remove all size classes
  document.body.classList.remove('size-compact', 'size-expanded');

  // Add the selected size class
  if (size === 'compact') {
    document.body.classList.add('size-compact');
  } else if (size === 'expanded') {
    document.body.classList.add('size-expanded');
  }

  // Update active button
  sizeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.size === size);
  });
}

// API Provider Selection
apiProvider.addEventListener('change', async (e) => {
  const provider = e.target.value;
  await chrome.storage.sync.set({ apiProvider: provider });
  updateProviderUI(provider);
});

// Update provider badge and key fields
function updateProviderUI(provider) {
  // Update badge
  if (apiProviderBadge) {
    apiProviderBadge.textContent = provider === 'gemini' ? 'Gemini' : 'OpenRouter';
    apiProviderBadge.className = 'api-provider-badge ' + provider;
  }

  // Show/hide correct key field sections
  const openrouterSection = document.getElementById('openrouterSection');
  const geminiSection = document.getElementById('geminiSection');

  if (openrouterSection) {
    openrouterSection.style.display = provider === 'openrouter' ? 'block' : 'none';
  }
  if (geminiSection) {
    geminiSection.style.display = provider === 'gemini' ? 'block' : 'none';
  }
}

// Toggle Gemini Key Visibility
toggleGeminiKeyBtn.addEventListener('click', () => {
  const isPassword = geminiKeyInput.type === 'password';
  geminiKeyInput.type = isPassword ? 'text' : 'password';
  const eyeIcon = toggleGeminiKeyBtn.querySelector('svg');
  if (isPassword) {
    eyeIcon.innerHTML = '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>';
  } else {
    eyeIcon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';
  }
});

// Voice Selection
ttsVoiceSelect.addEventListener('change', async (e) => {
  await chrome.storage.sync.set({ ttsVoice: e.target.value });
  // Notify content script of voice change
  await sendMessageToActiveTab({
    action: 'updateTTS',
    settings: { ...getTTSSettings(), voice: e.target.value }
  });
});

// Helper: Populate TTS Voices
function populateTTSVoices(selectedVoice) {
  // Get available voices
  const voices = window.speechSynthesis.getVoices();

  if (voices.length === 0) {
    // Voices not loaded yet, wait for them
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      populateTTSVoices(selectedVoice);
    }, { once: true });
    return;
  }

  // Clear existing options except the first "Auto" option
  ttsVoiceSelect.innerHTML = '<option value="auto">Auto (Best Quality)</option>';

  // Filter for English voices and rank by quality
  const englishVoices = voices.filter(v => v.lang.startsWith('en'));

  // Rank voices by quality indicators
  const rankedVoices = englishVoices.sort((a, b) => {
    const getScore = (voice) => {
      let score = 0;
      const name = voice.name.toLowerCase();

      // Premium indicators
      if (name.includes('neural') || name.includes('natural')) score += 100;
      if (name.includes('premium') || name.includes('enhanced')) score += 80;
      if (name.includes('google')) score += 60;
      if (name.includes('microsoft')) score += 50;
      if (voice.lang === 'en-US') score += 30;
      if (voice.localService) score -= 10; // Prefer server voices

      return score;
    };

    return getScore(b) - getScore(a);
  });

  // Add voices to dropdown
  rankedVoices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    if (voice.name === selectedVoice) {
      option.selected = true;
    }
    ttsVoiceSelect.appendChild(option);
  });
}

// --- Extract Export Content ---
function extractExportContent(file, callback) {
  // Use cached parsed HTML if available
  if (file.name.endsWith('.docx') || file.name.endsWith('.epub')) {
    if (typeof parsedFileHtml !== 'undefined' && parsedFileHtml) {
      callback({ text: null, html: parsedFileHtml });
      return;
    }
    // Fallback: try to parse now
    const reader = new FileReader();
    reader.onload = async function(e) {
      let html = '';
      if (file.name.endsWith('.docx') && window.parseDocx) {
        html = await window.parseDocx(e.target.result);
      } else if (file.name.endsWith('.epub') && window.parseEpub) {
        html = await window.parseEpub(e.target.result);
      } else {
        html = '';
      }
      parsedFileHtml = html;
      callback({ text: null, html });
    };
    reader.readAsArrayBuffer(file);
  } else if (file.name.endsWith('.txt')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const text = typeof e.target.result === 'string' ? e.target.result : new TextDecoder().decode(e.target.result);
      callback({ text, html: null });
    };
    reader.readAsText(file);
  } else {
    // Fallback for other file types
    const reader = new FileReader();
    reader.onload = function(e) {
      const text = typeof e.target.result === 'string' ? e.target.result : new TextDecoder().decode(e.target.result);
      callback({ text, html: null });
    };
    reader.readAsText(file);
  }
}

// --- Export HTML with Effects ---

// --- Advanced Visuals Application (from reader.js, adapted for popup) ---
function getExportedHtml(text, settings) {
  // Normalize settings for compatibility with reader.js logic
  const s = Object.assign({
    bold: settings.style && settings.style.includes('bold'),
    italic: settings.style && settings.style.includes('italic'),
    underline: settings.style && settings.style.includes('underline'),
    highlight: settings.style && settings.style.includes('highlight'),
    strength: settings.strength || 100,
    opacity: settings.opacity || 100,
    weight: settings.style && settings.style.includes('bold') ? 700 : 400,
    skip: settings.skip || 0,
    highlightColor: settings.inkColor || '#fff176',
    mode: settings.style && settings.style.includes('fade') ? 'fade' : 'ink',
    inkColor: settings.inkColor || '#222222',
    fadeColor: settings.fadeColor || '#888888',
    underlineStyle: settings.style && settings.style.includes('dotted') ? 'dotted' : 'solid',
    fontFamily: settings.fontFamily,
    fontSize: settings.fontSize,
    lineSpacing: settings.lineHeight,
  }, settings);

  // Helper: hex to rgb
  function hexToRgb(hex) {
    const h = hex.replace('#','');
    const bigint = parseInt(h.length===3? h.split('').map(c=>c+c).join(''):h,16);
    return [(bigint>>16)&255, (bigint>>8)&255, bigint&255];
  }

  // Per-word highlighting and feature logic with skip
  const words = text.split(/(\s+)/);
  let wordIndex = 0;
  return words.map((word, i) => {
    if (/^\s+$/.test(word)) return word;
    // If word is only emoji, don't count for skip
    const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;
    const isEmoji = emojiRegex.test(word) && word.replace(emojiRegex, '').length === 0;
    const isWord = !/^\s+$/.test(word) && !isEmoji;
    let applyFeatures = false;
    if (s.skip === 0) {
      applyFeatures = isWord;
    } else {
      applyFeatures = isWord && (wordIndex % s.skip === 0);
    }
    let result = '';
    if (applyFeatures) {
      // Split word by strength
      const strength = Math.max(0, Math.min(100, s.strength || 100));
      const splitAt = Math.ceil(word.length * (strength / 100));
      const mainPart = word.slice(0, splitAt);
      const restPart = word.slice(splitAt);
      // Main part: all effects
      let styleMain = '';
      styleMain += `font-family:${s.fontFamily};font-size:${s.fontSize};line-height:${s.lineSpacing};`;
      if (s.mode === 'ink') styleMain += `color:${s.inkColor};`;
      if (s.mode === 'fade') styleMain += `color:${s.fadeColor};opacity:0.5;`;
      if (s.highlight) {
        const rgb = hexToRgb(s.highlightColor);
        const baseAlpha = s.mode === 'fade' ? 0.25 : 0.6;
        const alpha = Math.max(0.05, baseAlpha * ((s.strength||100)/100) * ((s.opacity||100)/100));
        const rgba = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
        styleMain += `background:${rgba};padding:2px 4px;border-radius:4px;`;
      }
      styleMain += `font-weight:${s.bold ? 'bold' : (s.weight||400)};`;
      if (s.italic) styleMain += 'font-style:italic;';
      if (s.underlineStyle) styleMain += `text-decoration:underline; text-decoration-style:${s.underlineStyle};`;
      styleMain += `word-spacing:${s.skip||0}px;`;
      // Rest part: only opacity if set
      let styleRest = '';
      if (restPart && (s.opacity !== undefined && s.opacity !== 100)) {
        styleRest += `opacity:${s.opacity/100};`;
      }
      styleRest += `font-weight:normal;font-style:normal;word-spacing:${s.skip||0}px;`;
      result = `<span style="${styleMain}">${mainPart}</span>`;
      if (restPart) result += `<span style="${styleRest}">${restPart}</span>`;
    } else {
      // Non-targeted or emoji: normal style
      let style = 'font-weight:normal;font-style:normal;';
      style += `word-spacing:${s.skip||0}px;`;
      result = `<span style=\"${style}\">${word}</span>`;
    }
    if (isWord) wordIndex++;
    return result;
  }).join('');
}

// ==========================================
// ONBOARDING TOUR SYSTEM
// ==========================================

const tourSteps = [
  {
    target: '.logo',
    title: 'Welcome to EasyPage! 👋',
    content: 'Your AI-powered cognitive bridge for easier web reading. Let\'s take a quick tour of the features.',
    position: 'bottom'
  },
  {
    target: '.feature-card:nth-child(1)',
    title: 'Jargon Decoder 📖',
    content: 'Simplifies complex terminology on any webpage.',
    position: 'bottom'
  },
  {
    target: '.feature-card:nth-child(2)',
    title: 'Sensory Shield 🛡️',
    content: 'Freezes distracting GIFs and animations.',
    position: 'bottom'
  },
  {
    target: '.feature-card:nth-child(3)',
    title: 'Dyslexia Reading Mode 📚',
    content: 'Optimized fonts and spacing for easier reading.',
    position: 'bottom'
  },
  {
    target: '.feature-card:nth-child(4)',
    title: 'Text-to-Speech 🔊',
    content: 'Listen to any webpage with word highlighting.',
    position: 'bottom'
  },
  {
    target: '.settings-btn',
    title: 'API Configuration ⚙️',
    content: 'Set up your free Gemini API key here.',
    position: 'top'
  }
];

let currentTourStep = 0;
const tourOverlay = document.getElementById('tourOverlay');
const tourSpotlight = document.getElementById('tourSpotlight');
const tourTooltip = document.getElementById('tourTooltip');
const tourArrow = document.getElementById('tourArrow');
const restartTourBtn = document.getElementById('restartTour');

function startTour() {
  currentTourStep = 0;
  tourOverlay.classList.add('active');
  showTourStep(currentTourStep);
}

function showTourStep(stepIndex) {
  const step = tourSteps[stepIndex];
  const targetElement = document.querySelector(step.target);

  if (!targetElement) {
    nextTourStep();
    return;
  }

  // Position spotlight
  const rect = targetElement.getBoundingClientRect();
  const padding = 8;

  tourSpotlight.style.display = 'block';
  tourSpotlight.style.left = `${rect.left - padding}px`;
  tourSpotlight.style.top = `${rect.top - padding}px`;
  tourSpotlight.style.width = `${rect.width + padding * 2}px`;
  tourSpotlight.style.height = `${rect.height + padding * 2}px`;

  // Create tooltip content
  const isLastStep = stepIndex === tourSteps.length - 1;
  const dotsHtml = tourSteps.map((_, i) =>
    `<div class="tour-dot ${i === stepIndex ? 'active' : ''}"></div>`
  ).join('');

  tourTooltip.innerHTML = `
    <div class="tour-step-counter">Step ${stepIndex + 1} of ${tourSteps.length}</div>
    <h4>${step.title}</h4>
    <p>${step.content}</p>
    <div class="tour-nav">
      <button class="tour-btn skip" data-action="skip">Skip</button>
      <div class="tour-dots">${dotsHtml}</div>
      ${isLastStep
      ? '<button class="tour-btn finish" data-action="finish">Get Started!</button>'
      : '<button class="tour-btn next" data-action="next">Next</button>'
    }
    </div>
  `;

  // Attach event listeners (CSP-compliant - no inline onclick)
  tourTooltip.querySelector('[data-action="skip"]')?.addEventListener('click', () => endTour());
  tourTooltip.querySelector('[data-action="next"]')?.addEventListener('click', () => nextTourStep());
  tourTooltip.querySelector('[data-action="finish"]')?.addEventListener('click', () => endTour(true));

  // Position tooltip
  tourTooltip.style.display = 'block';
  positionTooltip(rect, step.position);
}

function positionTooltip(targetRect, position) {
  const tooltipRect = tourTooltip.getBoundingClientRect();
  const gap = 16;
  let left, top;

  switch (position) {
    case 'bottom':
      left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
      top = targetRect.bottom + gap;
      break;
    case 'top':
      left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
      top = targetRect.top - tooltipRect.height - gap;
      break;
    case 'right':
      left = targetRect.right + gap;
      top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
      break;
    case 'left':
      left = targetRect.left - tooltipRect.width - gap;
      top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
      break;
    default:
      left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
      top = targetRect.bottom + gap;
  }

  // Keep within viewport
  const viewportPadding = 10;
  left = Math.max(viewportPadding, Math.min(left, window.innerWidth - tooltipRect.width - viewportPadding));
  top = Math.max(viewportPadding, Math.min(top, window.innerHeight - tooltipRect.height - viewportPadding));

  tourTooltip.style.left = `${left}px`;
  tourTooltip.style.top = `${top}px`;
}

function nextTourStep() {
  currentTourStep++;
  if (currentTourStep < tourSteps.length) {
    showTourStep(currentTourStep);
  } else {
    endTour(true);
  }
}

function endTour(completed = false) {
  tourOverlay.classList.remove('active');
  tourSpotlight.style.display = 'none';
  tourTooltip.style.display = 'none';
  if (tourArrow) tourArrow.style.display = 'none';

  if (completed) {
    chrome.storage.sync.set({ tourCompleted: true });
  }
}

// Make tour functions globally accessible for onclick handlers
window.nextTourStep = nextTourStep;
window.endTour = endTour;

// Restart tour button
if (restartTourBtn) {
  restartTourBtn.addEventListener('click', () => {
    startTour();
  });
}

// Close tour on overlay click (outside spotlight)
tourOverlay.addEventListener('click', (e) => {
  if (e.target === tourOverlay) {
    endTour();
  }
});

// --- Trigger Download Helper ---
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 200);
}
