import { useEffect, useMemo, useState } from "react";
import PDFLib from "./PDFLib";

export default function usePDFreader (_url) {
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
    },[pdfValues, docId]);


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