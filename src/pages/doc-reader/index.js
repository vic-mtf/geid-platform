import { createContext, useContext, useRef, useState } from 'react';
import {
    Backdrop,
    Box,
    CssBaseline,
} from '@mui/material';
import Header from './components/Header';
import Main from './components/Main';
import Reader from './components/Reader';
import NavRight from './components/NavRight';
import { RefProvider } from './utils/useRefDocs';

const RootRef = createContext(null);
export const useRootRef = () => useContext(RootRef);

export default function DocReader ({
    url, 
    open: openDoc, 
    name, 
    onClose
}) {
    const [open, setOpen] = useState(false);
    const backdropRef = useRef();
   // const docs = useRef(null);

    const handleDrawerOpen = (mode) => () => {
      setOpen(mode);
    };
  
    const handleDrawerClose = () => {
      setOpen(null);
    };

    return (
        <Backdrop
            sx={{ 
                backdropFilter: theme => `blur(${theme.customOptions.blur})`,
                background: theme => theme.palette.background.paper +
                theme.customOptions.opacity,
                zIndex: theme => theme.zIndex.drawer + 100,
            }}
            open={openDoc}
            ref={backdropRef}
        >
            <RootRef.Provider value={backdropRef}>
                <RefProvider>
                    <Box display="flex">
                        <CssBaseline />
                        <Header 
                            name={name || "doc_name"}
                            open={open}
                            handleDrawerOpen={handleDrawerOpen}
                            handleDrawerClose={handleDrawerClose}
                            onClose={onClose}
                            url={url}
                        /> 
                    </Box>
                    <Main open={!!open}>
                        <Reader url={url}/>
                    </Main>
                    <NavRight 
                        open={open} 
                        handleDrawerClose={handleDrawerClose}
                    />
                </RefProvider> 
            </RootRef.Provider>
        </Backdrop>
    )
}