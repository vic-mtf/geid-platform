import React from 'react';
import { Box as MuiBox, Alert } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import Box from '../../components/Box';
import Typography from '../../components/Typography';
import ErrorFooter from './ErrorFooter';
import Header from './Header';

export default function ErrorBoundary (props) {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Header/>
            <MuiBox className={classes.messageBox}>
                <Alert severity="error">
                    <Typography>
                        <b>Geid</b> a cessé de fonctionner en raison 
                        d'une manipulation incorrecte ou d'un problème 
                        technique concernant l'application.
                    </Typography>
                    <Typography>
                        Un rapport est systématiquement remis au service 
                        technique afin de corriger ce problème.
                    </Typography>
                </Alert>
            </MuiBox>
            <ErrorFooter/>
        </Box>
    );
  
}

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10
    },
    link: {
        display: 'flex', 
        alignItems: 'center',
        textDecoration: 'none',
        color: theme.palette.text.secondary
    }
  }));