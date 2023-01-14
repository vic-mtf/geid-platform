import { Stack } from "@mui/material";
import { useMemo, useState } from "react";
import Page from "./Page";

export default function PdfPages ({numPage, pdfDoc, zoom, rootRef}) {
    const [loadingPageNum, setLoadingPageNum] = useState(1);
    const pages = useMemo(() => {
        const _pages = [];
        if((typeof numPage === 'number') && pdfDoc)
            for (let item = 0; item < numPage; ++item )
                _pages.push({
                    num: item + 1, 
                    pdfDoc, 
                    loadingPageNum,
                    setLoadingPageNum
            });
        return _pages;
    }, [numPage, pdfDoc, loadingPageNum]);
    const scale = useMemo(() => zoom / 100, [zoom]);

    return( 
        <Stack
            spacing={scale}
            display="flex"
            //flex={1}
            alignItems="center"
            height="100%"
            width="100%"
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