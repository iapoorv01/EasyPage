// docx-epub-parse.js
// Utility for parsing DOCX and EPUB files in the browser (for Chrome extension)
// Uses mammoth (for DOCX) and epub.js (for EPUB)

// DOCX parsing (mammoth)
async function parseDocx(arrayBuffer) {
  if (typeof mammoth === 'undefined') throw new Error('mammoth.js not loaded');
  const { value } = await mammoth.convertToHtml({ arrayBuffer });
  return value; // HTML string
}

// EPUB parsing (epub.js)
async function parseEpub(arrayBuffer) {
  if (typeof ePub === 'undefined') throw new Error('epub.js not loaded');
  return new Promise((resolve, reject) => {
    try {
      const book = ePub(arrayBuffer);
      book.ready.then(() => {
        book.loaded.spine.then(() => {
          book.spine.get(0).load(book.load.bind(book)).then((section) => {
            resolve(section); // HTML string of first section
          });
        });
      });
    } catch (e) {
      reject(e);
    }
  });
}

// TXT parsing (just decode)
function parseTxt(arrayBuffer) {
  return new TextDecoder().decode(new Uint8Array(arrayBuffer));
}

// Export for use in reader.js
window.parseDocx = parseDocx;
window.parseEpub = parseEpub;
window.parseTxt = parseTxt;
