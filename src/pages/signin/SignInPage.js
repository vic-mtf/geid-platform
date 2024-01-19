import { 
    Card, 
    Box as MuiBox, 
    CardContent,
    LinearProgress,
    Fade,
    Backdrop,
    Dialog,
    Alert,
    useMediaQuery
} from '@mui/material';
import Box from '../../components/Box';
import Content from './content/Content';
import Header from './header/Header';
import useAxios from '../../utils/useAxios';
import ErrorNetwork from '../error/ErrorNetwork';
import Footer from './footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Link from '../../components/Link';
import channels from "../../utils/channels";

export default function SignInPage() {
    const [{loading}, refresh] = useAxios(null, { manual: true });
    const connected = useSelector(store => store.user.connected);
    const dispatch = useDispatch();
    const match = useMediaQuery('@media (min-width:0px) and (max-width: 410px)');

    useEffect(() => {
        let handleAutoConnection = event => {
            if(window.origin === event.origin) 
                window.close();
        };
        SIGN_IN_CHANNEL.addEventListener('message', handleAutoConnection);
        return () => {
            SIGN_IN_CHANNEL.removeEventListener('message', handleAutoConnection);
        }
    }, [dispatch]);

    return (
        <Box
            justifyContent="center"
            alignItems="center"
        >
            <MuiBox
                height={460}
                display="flex"
                sx={{
                    width: match ? 'auto' : 400,
                    mx: match ? 1 : 0,
                }}
            > 
                <Card
                    sx={{
                        bgcolor: theme => theme.palette.background.paper +
                        theme.customOptions.opacity,
                        display: 'flex',
                        border: theme => `1px solid ${theme.palette.divider}`,
                        flex: 1,
                        flexDirection: 'column',
                        position: 'relative',
                    }}
                >
                    <Fade in={loading}>
                        <LinearProgress  
                            sx={{
                                position: 'absolute',
                                width: "100%",
                                zIndex: theme => theme.zIndex.drawer + 300,
                            }}
                        />
                    </Fade>
                    <CardContent
                        sx={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'column'
                        }}
                    >
                        <Header/>
                        <Content loading={loading} refresh={refresh} />
                    </CardContent>
                </Card>
            </MuiBox>
            <Footer/>
            <Backdrop
                open={loading}
                sx={{
                    bgcolor: theme => theme.palette.background.paper + '88',
                    zIndex: theme => theme.zIndex.drawer + 100
                }}
            />
            <ErrorNetwork/>
            <Dialog
                open={connected}
                PaperProps={{
                    sx:{ border: theme => `1px solid ${theme.palette.divider}` }
                }}
                BackdropProps={{
                    sx: {
                        bgcolor: theme => theme.palette.background.paper +
                        theme.customOptions.opacity,
                        backdropFilter: theme => `blur(${theme.customOptions.blur})`,
                    }
                }}
            >
                <Alert>
                    Vous avez réussi à vous connecter à votre compte et pouvez 
                    accéder à la plate-forme 
                    pour <Link 
                            href={window.opener?.location || '/'} 
                            target={window.opener ? "_blank" : "_self"}
                    >continuer la navigation</Link>.
                </Alert>
            </Dialog>
        </Box>
    )
}

const SIGN_IN_CHANNEL = new BroadcastChannel(channels.signin);