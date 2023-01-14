import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = process.env.PUBLIC_URL + '/scripts/pdf.worker.min.js';
const PDFLib = pdfjs
export const drawerWidth = 300;
export default PDFLib;