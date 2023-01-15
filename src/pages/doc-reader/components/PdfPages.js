import { CircularProgress, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
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
    const loading = useMemo(() => typeof numPage !== 'number', [numPage]);

    return( 
        <Stack
            spacing={scale}
            display="flex"
            alignItems="center"
            height="100%"
            width="100%"
        >
            <LoadingWrapper loading={loading}>
            {pages.map((pageProps, index) => (
                <Page
                    {...pageProps}
                    key={index}
                    scale={scale}
                    rootRef={rootRef}
                /> 
            ))}
            </LoadingWrapper>
        </Stack>
    )
}

const LoadingWrapper = ({loading, children}) => {
    return (
        <React.Fragment>
            {loading ? 
            (
            <Stack
                display="flex"
                flex={1}
                alignItems="center"
                justifyContent="center"
            >
                <CircularProgress size={25} color="inherit"/>
            </Stack>
            ): children
            }
        </React.Fragment>
    )   
}
