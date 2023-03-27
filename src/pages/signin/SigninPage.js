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
import { setUser } from '../../redux/app';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Link from '../../components/Link';

export default function SigninPage() {
    const [{loading}, refresh] = useAxios({},{manual: true});
    const [finished, setFinished] = useState(false);
    const dispatch = useDispatch();
    const maches = useMediaQuery('@media (min-width:0px) and (max-width: 410px)');

    useEffect(() => {
        let handleAutoConnexion = event => {
            const { user } = event.detail;
            dispatch(setUser(user));
            setFinished(true);
            localStorage.setItem(
                '_auto_connexion_data', user
            );
           window.close();
        };
        document.getElementById('root')
        .addEventListener(
            '_connected', 
            handleAutoConnexion
            );
        return () => {
            document.getElementById('root')
            .removeEventListener(
                '_connected', 
                handleAutoConnexion
            );
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
                    width: maches ? 'auto' : 400,
                    mx: maches ? 1 : 0,
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
                open={finished}
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
                        component="a" 
                        href="/?autoconnexion=true" 
                        target="_blank"
                    >continuer la navigation</Link>.
                </Alert>
            </Dialog>
        </Box>
    )
}
