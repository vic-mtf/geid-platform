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
import { relatedLinks, otherLinks } from "./links";
import _logo_dantic from '../../../assets/dantic_logo_white.webp';
import LinksGroup from './LinksGroup';

export default function Footer () {
    return (
        <MuiBox
            
        >
            <Stack 
                mx={1} 
                height={5} 
                display="flex" 
                direction="row" 
                borderRadius={.5} 
                overflow="hidden" 
            >
                <Box flex={1} bgcolor="#0095c9" />
                <Box flex={1} bgcolor="#fff24b" />
                <Box flex={1} bgcolor="#db3832" />
            </Stack>
            <ThemeProvider theme={createTheme({ palette: { mode: 'dark' }})} >   
                <MuiBox
                    minHeight={300}
                    backgroundColor={appConfig.colors.main}
                    display="flex"
                    py={5}
                >
                  <Grid container>
                    {gridsProps.map((props, index) => 
                        <Grid 
                            {...props}
                            item
                            display="flex" 
                            // alignItems="center" 
                            justifyContent="center" 
                            key={index}
                            padding={2}
                        />
                    )}
                  </Grid>  
                </MuiBox>  
            </ThemeProvider>
        </MuiBox>
    );
}

const gridsProps = [
    {
        xs: 12, 
        lg: 3,
        children: React.createElement(Logos),
    },
    {

        xs: 6,
        lg: 3,
        children: React.createElement(LinksGroup, {
            links: relatedLinks,
            title: 'Liens connexes',
        }),
    },
    {
        xs: 6,
        lg: 3,
        children: React.createElement(LinksGroup, {
            links: otherLinks,
            title: 'Autres liens',
        }),
    },
    {
        lg: 3,
        xs: 12,
        children: (
            <Stack
                alignItems="center" 
                display="flex" 
                flexDirection="column"
                spacing={1}
                sx={{
                    mt: {
                        xs: 4,
                        md: 0,
                    }
                }}
            >
                <MuiBox
                    component="img"
                    src={_logo_dantic}
                    height={100}
                    draggable={false}
                    sx={{ userSelect: 'none', mt: { xs: 5, lg: 0}}}
                />
                <Typography 
                    align="center" 
                    variant="caption" 
                    color="text.primary"
                    px={2}
                    pb={1}
                >
                    Direction Archives et Nouvelles Technologie de l'Information et 
                    de la Communication &copy;2022
                </Typography>
            </Stack>
        )
    }
];