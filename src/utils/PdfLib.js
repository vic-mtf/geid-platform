import * as PdfLib from "pdfjs-dist";
import * as workerSrc from "pdfjs-dist/build/pdf.worker.min.js";
PdfLib.GlobalWorkerOptions.workerSrc = workerSrc;
export default PdfLib;
