import { Stack } from "@mui/material";
import { useMemo } from "react";
import Page from "./Page";

export default function PdfPages ({numPage, pdfDoc, zoom, rootRef}) {
    const pages = useMemo(() => {
        const _pages = [];
        if((typeof numPage === 'number') && pdfDoc)
            for (let item = 0; item < numPage; ++item )
                _pages.push({num: item + 1, pdfDoc});
        return _pages;
    }, [numPage, pdfDoc]);
    const scale = useMemo(() => zoom / 100, [zoom]);

    return( 
        <Stack
            spacing={scale}
        >
            {pages.map((pageProps, index) => (
                <Page
                    {...pageProps}
                    key={index}
                    scale={scale}
                    rootRef={rootRef}
                /> 
            ))}
        </Stack>
    )
}