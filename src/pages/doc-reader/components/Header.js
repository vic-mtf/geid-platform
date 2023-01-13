import React, { useEffect, useRef, useState } from 'react';
import { 
    IconButton,
    Toolbar,
    Typography, 
    Slide,
    Box,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import CustomAppBar from './CustomAppBar';
import { useRootRef } from '..';
import { Link } from 'react-router-dom';
import printJS from 'print-js';
import Options, { DarkThemeProvider } from './Options';

export default function Header ({
    name, 
    open, 
    handleDrawerOpen, 
    handleDrawerClose,
    onClose,
    url,
}) {
    const [show, setShow] = useState(true);
    const [isEnter, setIsEnter] = useState(false);
    const oldValueShow = useRef(show);
    const rootRef = useRootRef();
    let timer = useRef();

    useEffect(() => {
        const { current: root} = rootRef;
        if(show && !isEnter)
            timer.current = window.setTimeout(() => {
                setShow(false);
            }, 3000);
        const customEventOnShow = new CustomEvent('_change_show', {
            detail: {
                name: '_change_show',
                show,
            }
        });
        if(root)
            root.onmousemove = event => {
                if(event.y <= 70 && (!show ||  !isEnter)) {
                    setShow(true);
                    setIsEnter(true);
                } 
                if(event.y > 70 && (show ||  isEnter)) {
                    setShow(true);
                    setIsEnter(false);
                }
        }
        if(oldValueShow.current !== show)
            root?.dispatchEvent(customEventOnShow);
        oldValueShow.current = show;
        return () => {
            clearTimeout(timer.current);
            root?.removeEventListener('_change_show', customEventOnShow)
        };
    }, [show, isEnter, rootRef]);

    return (
        <Box
            onMouseEnter={() => {
                setShow(true);
                setIsEnter(true);
              }}
            onMouseLeave={() => {
                setShow(true);
                setIsEnter(false);
            }}
        >     
            <Slide direction='down' in={show}>
                <CustomAppBar 
                position="fixed"
                open={!!open}
                sx={{
                    background: theme => `linear-gradient(
                        ${theme.palette.primary.main} 10%, 
                        transparent)`
                }}
                >
                <Toolbar>
                    <DarkThemeProvider>
                        <IconButton size='small' LinkComponent={Link} to="/" onClick={onClose}>
                            <ArrowBackRoundedIcon fontSize='small'/>
                        </IconButton>
                        <Typography variant="body2" sx={{mx:1, flexGrow: 1}}>{name}</Typography>
                        <IconButton 
                            size='small' 
                            sx={{mr:1}} 
                            onClick={() => printJS({ printable: url, type: 'pdf'})}
                        >
                            <LocalPrintshopRoundedIcon fontSize='small'/>
                        </IconButton>
                        <IconButton size='small' sx={{mr:1}}
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = name?.toString().toLowerCase().replace(/\s/,'_') + '.pdf';
                                link.click();
                            }}
                        >
                            <GetAppRoundedIcon fontSize='small'/>
                        </IconButton>
                    </DarkThemeProvider>
                    <Options
                        handleDrawerOpen={handleDrawerOpen}
                        handleDrawerClose={handleDrawerClose}
                        open={open}
                        url={url}
                    />
                </Toolbar>
                </CustomAppBar>
            </Slide>
        </Box>
    )
}