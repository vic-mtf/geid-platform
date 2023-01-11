import {
    AppBar,
    Toolbar,
} from '@mui/material';
import React from 'react';
import MainTab from './MainTab';
import MainOption from './MainOption';

export default function MainAppBar () {
    return (
        <AppBar 
            position="sticky" 
            sx={{
                bgcolor: theme => theme.palette.background.paper + 
                theme.customOptions.opacity,
                backdropFilter: theme => `blur(${theme.customOptions.blur})`
            }}
        >
            <Toolbar>
                <MainTab/>
                <MainOption/>
            </Toolbar>
        </AppBar>
    )
}
