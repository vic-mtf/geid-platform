import { Fade, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useRootRef } from "..";


export default function Footer ({numPages}) {
    const [show, setShow] = useState(true);
    const [isEnter, setIsEnter] = useState(false);
    const [num, setNum] = useState(1);
    const rootRef = useRootRef();
    let timer = useRef();

    useEffect(() => {
        const { current: root } = rootRef;
        if(show && !isEnter)
            timer.current = setTimeout(() => {
                setShow(false);
            }, 6000);
        const handleShowChangeInHeader = event => {
            const { detail: {show, num} } = event;
            if(show) 
                setShow(show);
            if(typeof num === 'number')
                setNum(num)
        };

        root.addEventListener('_change_show', handleShowChangeInHeader);

        return () => {
            //clearTimeout(timer);
            root.removeEventListener('_change_show', handleShowChangeInHeader)
        };

    }, [show, isEnter, rootRef]);

    return (
        <Stack
          position="fixed"
          display="flex"
          flex={1}
          bottom={0}
          alignItems="center"
          width="100%"
          py={4}
          onMouseEnter={() => {
            setShow(true);
            setIsEnter(true);
          }}
          onMouseLeave={() => {
            setShow(true);
            setIsEnter(false);
          }}
        >
            <Fade in={show}>
                <Paper
                    sx={{
                       // width: 300,
                        py: 1,
                        px: 2,
                        border: theme => `1px solid ${theme.palette.divider}`,
                        borderRadius: 10,
                        // background: theme => theme.palette.background.paper +
                        // theme.customOptions.opacity,
                    }}
                    elevation={0}
                >
                    <Stack
                        display="flex"
                        alignItems="center"
                        alignContent="center"
                    >
                        <Typography align="center" component="div" variant="body2">
                            {typeof numPages !== 'number' ? 'chargement...' : `page ${num} / ${numPages}`}
                        </Typography>
                    </Stack>
                </Paper>
            </Fade>
        </Stack>
    );
}