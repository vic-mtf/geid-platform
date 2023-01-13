import { useEffect, useMemo, useState } from "react";

export default function usePDFreader (_url) {
    const [PDFLib, setPDFLib] = useState(null);
    const [pdfValues, setPdfValues] = useState({
        doc: null,
        url: _url,
    });
    const docId = useMemo(() => pdfValues.doc?._pdfInfo.fingerprints || null, [pdfValues]);
    useEffect(() => {
        if(PDFLib) {
            const { url } = pdfValues;
            PDFLib.getDocument(url).promise.then(doc => {
                if(docId === null)
                    setPdfValues({...pdfValues, doc});
            });
        }
    },[pdfValues, docId, PDFLib]);

    useEffect(() => {
        (async () => {
            await import('https://mozilla.github.io/pdf.js/build/pdf.js');
            const lib = window['pdfjs-dist/build/pdf']
            lib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
            setPDFLib(lib);
        })();
    });

    return {
        pdfDoc: pdfValues.doc,
        setURL(_url) {
            const {url} = pdfValues;
            if(url !== _url) {
                setPdfValues({url: _url, doc: null});
            }
        }
    };
}