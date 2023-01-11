import { Card, 
    CardContent, 
    Box as MuiBox, 
    CardActions, 
    Stack 
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "../../components/Box";
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import { changeValues } from "../../redux/user";
import { decrypt } from "../../utils/crypt";
import Books from "./books/Books";
import Carousel from "./carousel/Carouser";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Pubs from "./pubs/Pubs";

export default function HomePage () {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const connected = useSelector(store => store.user.connected);
    useEffect(() => {
        let timer;
        let handleAutoConnexion;
        (handleAutoConnexion = () => {
            if (!connected) {
                timer = window.setInterval(() => {
                   const data = localStorage.getItem('_auto_connexion_data');
                   if(data) {
                       window.clearInterval(timer);
                       localStorage.removeItem('_auto_connexion_data');
                       dispatch(changeValues(decrypt(data)));
                       navigateTo('/');
                   }
                }, 100);
           }
        })();
        document.getElementById('root')
        .addEventListener(
            '_deconnected', 
            handleAutoConnexion
            );
        return () => {
                window.clearInterval(timer);
                document.getElementById('root')
                    .removeEventListener(
                        '_deconnected', 
                        handleAutoConnexion
                    );
        }
    }, [connected, dispatch, navigateTo]);

    return (
        <Box sx={{overflow: 'auto'}}>
            <Header/>
            <Carousel/>
            <Stack mx={1} my={1} spacing={1} >
                <MuiBox position="relative" >
                    <Card 
                        elevation={0}
                        sx={{
                            display: 'block',
                            bgcolor: theme => theme.palette.background.paper + 
                            theme.customOptions.opacity,
                        }}
                    >
                        
                        <CardContent>
                            <Typography gutterBottom variant="body1" component="div">
                                Gestion Electronique de l'Information et des Documents (GEID)
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                La Gestion Electronique de l'Information et des Documents 
                                désigne l'ensemble des techniques et pratiques 
                                nécessaires pour la prise en charge du flux important des données, 
                                informations et documents au sein d'une organisation. 
                                Cette solution informatique gère le cycle de vie des fichiers textes, 
                                sons, images et vidéos. La GEID offre entre autres avantages : 
                                le gain de temps et d’espace considérable avec son archivage électronique, 
                                une bibliothèque virtuelle régulièrement à jour, 
                                une filmothèque et une photothèque bien fournie.
                            </Typography>
                        </CardContent>
                        <SignupAction/>
                    </Card>
                </MuiBox>
                <MuiBox position="relative" >
                    <Books/>
                </MuiBox>
                <MuiBox position="relative" >
                    <Pubs/>
                </MuiBox>
            </Stack>
            <Footer/>
        </Box>
    )
}

const SignupAction = () => {
    const notConnected = useSelector(store => !store.user?.connected);
    return notConnected && (
        <CardActions>
            <Button 
                //component={Link} 
                //to="/account/signup" 
                onClick={event => {
                    event.preventDefault();
                        const width = window.innerWidth * .75;
                        const height = window.innerHeight * .95;
                        const left = (window.innerWidth - width) / 2;
                        const top = (window.innerHeight - height) / 2;
                        const sizes = `top=${top}, left=${left}, width=${width}, height=${height}`;
                        window.open(
                            `/account/signup`,
                            '_blank',
                            sizes
                        );
                }}
                variant="outlined"
            >Créér un compte</Button>
        </CardActions>
    )
}