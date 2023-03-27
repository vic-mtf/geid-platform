import { useMemo, useRef } from "react";
import usePDFreader from "../utils/usePDFreader";
//import url_pdf from "../../home/books/docs/circulaire_elabo_budget2022.pdf";
import PdfPages from "./PdfPages";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Footer from "./Footer";

export default function Reader ({url}) {
    const { pdfDoc, /*setURL*/ } = usePDFreader(url);
    const numPages = useMemo(() => pdfDoc?._pdfInfo.numPages, [pdfDoc]);
    const rootRef = useRef();
    const theme = useTheme();
    const matchesSmall = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const matchesMedium = useMediaQuery(theme.breakpoints.only('md'));

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
                zoom={ matchesSmall ? 65 : matchesMedium ? 80 : 150}
                rootRef={rootRef}
            /> 
            <Footer
                numPages={numPages}
            />
        </Box>
    ) ;
}  