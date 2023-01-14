import { useMemo, useRef } from "react";
import usePDFreader from "../utils/usePDFreader";
//import url_pdf from "../../home/books/docs/circulaire_elabo_budget2022.pdf";
import PdfPages from "./PdfPages";
import { Box } from "@mui/material";
import Footer from "./Footer";

export default function Reader ({url}) {
    const { pdfDoc, /*setURL*/ } = usePDFreader(url);
    const numPages = useMemo(() => pdfDoc?._pdfInfo.numPages, [pdfDoc]);
    const rootRef = useRef();

    return (
        <Box
            sx={{
                height: '98vh',
                overflow: 'auto',
                width: '100%',
                scrollBehavior: 'smooth',
                position: "relative",
                display: 'flex',
            }}
            ref={rootRef}
        >
            <PdfPages
                numPage={numPages}
                pdfDoc={pdfDoc}
                zoom={100}
                rootRef={rootRef}
            /> 
            <Footer
                numPages={numPages}
            />
        </Box>
    ) ;
}  