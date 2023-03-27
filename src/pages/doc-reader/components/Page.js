import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRootRef } from "..";
import PDFLib from "../utils/PDFLib";
import useRefDocs from "../utils/useRefDocs";

export default function Page ({
    num, 
    pdfDoc, 
    scale, 
    rootRef,
    setLoadingPageNum,
    loadingPageNum
}) {
    const canvasRef = useRef();
    const layerRef = useRef();
    const [page, setPage] = useState(null);
    const docs = useRefDocs();
    const globalRootRef = useRootRef();
    const pageRef = useRef(null);
    const loading = useMemo(() => loadingPageNum === num, [loadingPageNum, num]);
    
    useEffect(() => {
        const [{current: canvas}, {current: layer}] = [canvasRef, layerRef];
        if(loadingPageNum === num) 
            (async () => {
                if(page === null)
                    setPage(await pdfDoc.getPage(num));
                else {
                    if(pageRef.current === null) {
                        const id = `${pdfDoc?._pdfInfo.fingerprints}_page_${num}`;
                        pageRef.current = page;
                        const context  = canvas.getContext('2d');
                        const viewport = page.getViewport({scale});
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        canvas.id = id;
                        const renderContext = {canvasContext: context, viewport};
                        page.render(renderContext).promise.then(() => {
                            const pageData = { num, canvas, pdfDoc, id };
                            if(docs.current) {
                                    docs.current[num - 1] = {...pageData};
                            } else docs.current = [pageData];
                        });
                        PDFLib.renderTextLayer({
                            textContent: await page.getTextContent(),
                            container: layer,
                            viewport,
                        });
                        setLoadingPageNum(num => num + 1);
                    }
                }
            })();
     }, [
        pdfDoc, 
        num, 
        page, 
        scale, 
        docs, 
        loadingPageNum, 
        setLoadingPageNum
    ]);

     useEffect(() => {
        if(page) {
            const {current: root} = rootRef;
            const {current: globalRoot} = globalRootRef;
            const options = {
                root,
                rootMargin: '0px',
                threshold: .51
            };
            const customEventOnShow = new CustomEvent('_change_show', {
                detail: {name: '_change_show', show: true, num}
            });
            const handleVisiblePage = (entries, observer) => {
                entries.forEach((entry) => {
                    if(entry.intersectionRatio >= options.threshold )
                        globalRoot?.dispatchEvent(customEventOnShow);
                   
                });
            };
            const observer = new IntersectionObserver(handleVisiblePage, options)
            observer.observe(canvasRef.current);
            return () => {
                globalRoot?.removeEventListener('_change_show', customEventOnShow)
            };
        }
     }, [page, docs, globalRootRef, num, rootRef]);
    
    return (
        <Box 
            sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            {loading &&
            (<Typography
                align="center"
                mt={35}
                color="text.secondary"
            >Chargement...</Typography>)}
            <Box 
                sx={{
                    display: loading ? 'none' : 'inline-block', 
                    position: 'relative'
                }}
            >
            <Box 
                position="absolute"
                display="flex"
                lineHeight={1}
                height="100%"
                width="100%"
                opacity={.2}
                transform={`scale(${scale})`}
                sx={{
                    "& > span": {
                        color: 'transparent',
                        position: 'absolute',
                        whiteSpace: 'pre',
                        cursor: 'text',
                        transformOrigin: '0 0',
                    }
                }}
                ref={layerRef}
            />
                <Box component="canvas" ref={canvasRef}/>
           </Box>
        </Box>
    )
}