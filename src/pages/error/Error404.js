import Box from "../../components/Box";
import { Divider, Stack, CardContent } from '@mui/material';
import { makeStyles, createStyles } from "@mui/styles";
import Typography from "../../components/Typography";
import ErrorFooter from "./ErrorFooter";
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Header from "./Header";

export default function Error404 () {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <CardContent>
                <Header/>
                <Stack className={classes.messageTitle} spacing={1} direction="row">
                    <Typography variant="body1" color="text.primary" >404</Typography>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Typography variant="body1" color="text.primary" >Page introuvable</Typography>
                </Stack>
                <Stack spacing={1}>
                    <Typography>
                        Geid ne trouve pas d'adresse <em className={classes.link}>{window.location.toString()}</em>, vérifiez et réessayez.
                    </Typography>
                    <Typography color="text.secondary">
                        Vous serez redirigé vers vers l'accueil au bout de <RedirectTimer/>s.
                    </Typography>
                </Stack>
            </CardContent>
            <ErrorFooter/>
        </Box>
    );
};

const RedirectTimer = () => {
    const navigateTo = useNavigate();
    const timer = useMemo(() => {
        const timer = new Date();
        return timer.setSeconds(timer.getSeconds() + 30);
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