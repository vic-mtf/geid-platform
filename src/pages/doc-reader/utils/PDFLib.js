import 'https://mozilla.github.io/pdf.js/build/pdf.js';
const PDFLib = window['pdfjs-dist/build/pdf'];
PDFLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
export const drawerWidth = 300;
export default PDFLib;