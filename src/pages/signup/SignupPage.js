import { 
    Card, 
    Box as MuiBox, 
    CardContent,
    LinearProgress,
    Fade,
    Backdrop,
    Dialog,
    Alert
} from '@mui/material';
import Box from '../../components/Box';
import Content from './content/Content';
import Header from './header/Header';
import useAxios from '../../utils/useAxios';
import ErrorNetwork from '../error/ErrorNetwork';
//import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Link from '../../components/Link';

export default function SignupPage() {
    const [{loading, error}, refresh] = useAxios({method:'post'},{manual: true});
    const [finished, /*setFinished*/] = useState(false);
    //const dispatch = useDispatch();
    
    return (
        <Box justifyContent="center" alignItems="center" >
            <MuiBox minHeight={500} width={750} display="flex"> 
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
                        <LinearProgress  sx={{position: 'absolute', width: "100%"}}/>
                    </Fade>
                    <CardContent
                        sx={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'column',
                        }}
                    >
                        <Header/>
                        <Content loading={loading} refresh={refresh}/>
                    </CardContent>
                </Card>
            </MuiBox>
            {/* <Footer/> */}
            <Backdrop
                open={loading}
                sx={{
                    bgcolor: theme => theme.palette.background.paper + '88',
                    zIndex: theme => theme.zIndex.drawer + 100
                }}
            />
            <ErrorNetwork/>
            <Dialog
                open={finished || !!error}
                PaperProps={{
                    sx:{
                        border: theme => `1px solid ${theme.palette.divider}`
                    }
                }}
                BackdropProps={{
                    sx: {
                        bgcolor: theme => theme.palette.background.paper +
                        theme.customOptions.opacity,
                        backdropFilter: theme => `blur(${theme.customOptions.blur})`,
                    }
                }}
            >
                <Alert severity={error ? "error" : "success"}>
                    {error ?
                    <>
                        Il est impossible de vous inscrire à la plateforme en raison d'une erreur, 
                        veuillez signaler le service technique.
                    </>:
                    <>
                        Vous avez réussi à vous connecter à votre compte et pouvez 
                        accéder à la plate-forme 
                        pour <Link 
                            component="a" 
                            href="/?autoconnexion=true" 
                            target="_blank"
                        >continuer la navigation</Link>.
                    </>}
                </Alert>
            </Dialog>
        </Box>
    )
}
