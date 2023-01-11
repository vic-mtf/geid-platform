import {
    Box as MuiBox, 
    createTheme, 
    Grid, 
    Stack, 
    ThemeProvider,
} from '@mui/material';
import React from 'react';
import Box from '../../../components/Box';
import appConfig from '../../../configs/app-config.json';
import Typography from '../../../components/Typography';
import Logos from './Logos';
import ListRelatedLinks from './ListRelatedLinks';
import OtherLinks from './OtherLinks';
import _logo_dantic from '../../../assets/dantic_logo_white.webp';

export default function Footer () {
    return (
        <MuiBox
            
        >
            <Stack 
                mx={1} 
                height={5} 
                display="flex" 
                direction="row" 
                borderRadius={2} 
                overflow="hidden" 
            >
                <Box flex={1} bgcolor="#0095c9" />
                <Box flex={1} bgcolor="#fff24b" />
                <Box flex={1} bgcolor="#db3832" />
            </Stack>
            <ThemeProvider theme={createTheme({ palette: { mode: 'dark' }})} >   
                <MuiBox
                    minHeight={300}
                    bgcolor={appConfig.colors.main}
                    display="flex"
                >
                  <Grid container>
                    <Grid item md={3} flex={1} justifyContent="center" alignItems="center" display="flex" >
                        <Logos/>
                    </Grid> 
                    <Grid item md={3} flex={1}justifyContent="center" alignItems="center" display="flex">
                        <ListRelatedLinks/>
                    </Grid> 
                    <Grid item md={3} flex={1} justifyContent="center" alignItems="center" display="flex">
                        <OtherLinks/>
                    </Grid> 
                    <Grid item md={3} flex={1} justifyContent="center" alignItems="center" display="flex">
                        <Stack
                            flex={1} 
                            justifyContent="center" 
                            alignItems="center" 
                            display="flex" 
                            flexDirection="column"
                            spacing={2}
                        >
                            <MuiBox
                                component="img"
                                src={_logo_dantic}
                                height={100}
                                draggable={false}
                                sx={{ userSelect: 'none'}}
                            />
                            <Typography 
                                align="center" 
                                variant="caption" 
                                color="text.secondary"
                            >
                                Direction Archives et Nouvelles 
                                Technologie de l'Information et 
                                de la Communication &copy;2022
                            </Typography>
                        </Stack>
                    </Grid>
                  </Grid>  
                </MuiBox>  
            </ThemeProvider>
        </MuiBox>
    );
}