import Box from "../../components/Box";
import { Divider, Box as MuiBox, Stack } from '@mui/material';
import { makeStyles, createStyles } from "@mui/styles";
import Typography from "../../components/Typography";
import ErrorFooter from "./ErrorFooter";
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function Error404 () {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <MuiBox className={classes.messageBox}>
                <Stack className={classes.messageTitle} spacing={1} direction="row">
                    <Typography >404</Typography>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Typography>Page introuvable</Typography>
                </Stack>
                <Stack>
                    <Typography>
                        Geid ne trouve pas d'adresse <em className={classes.link}>{window.location.toString()}</em>, vérifiez et réessayez.
                    </Typography>
                    <Typography>
                        Vous serez redirigé vers vers l'accueil au bout de <RedirectTimer/>s.
                    </Typography>
                </Stack>
            </MuiBox>
            <ErrorFooter/>
        </Box>
    );
};

const RedirectTimer = () => {
    const navigateTo = useNavigate();
    const timer = useMemo(() => {
        const timer = new Date();
        return timer.setSeconds(timer.getSeconds() + 60);
    } , []);
    
    const { seconds } = useTimer({
        expiryTimestamp: timer,
        onExpire() {
           navigateTo('/')
        }
    });
    
    return (seconds || 60).toString().padStart(2, '0') ;
};

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
        padding: 20,
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper + theme.customOptions.opacity,
        backdropFilter: `blur(${theme.customOptions.blur})`,
        boxShadow: theme.shadows[1],
        maxWidth: 500,
        margin: '0 10px',
    },
    messageTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        color: theme.palette.text.secondary,
        marginBottom: 10,
    },
    link: {
        color: '#4169E1'
    }
  }));