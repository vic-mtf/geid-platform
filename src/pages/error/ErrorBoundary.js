import React from 'react';
import { Box as MuiBox, Alert, AlertTitle } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import Box from '../../components/Box';
import Typography from '../../components/Typography';
import ErrorFooter from './ErrorFooter';
//import { Link } from 'react-router-dom';

export default function ErrorBoundary (props) {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <MuiBox className={classes.messageBox}>
                <Alert severity="error">
                    <AlertTitle>Une erreur est survenue </AlertTitle>
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
    messageBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 50,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 5,
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper + theme.customOptions.opacity,
        backdropFilter: `blur(${theme.customOptions.blur})`,
        boxShadow: theme.shadows[1],
        maxWidth: 500,
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