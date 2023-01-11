import {
    Slide,
    Stack
} from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import Button from '../../../components/Button';
import queryString from 'query-string';
import Account from './Account';
import { useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Box from '../../../components/Box';
import CheckEmail from './CheckEmail';
import CheckPassword from './CheckPassword';
import { validateEmail } from '../../../utils/validateFields';
import { decrypt, encrypt } from '../../../utils/crypt';

export default function Content ({loading, refresh}) {
    const user = useSelector(store => store.app.user && decrypt(store.app?.user));
    const [errorMessage, setErrorMesssage] = useState(null);
    const location = useLocation();
    const navigateTo = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const emailValueRef = useRef();

    const { 
        email: defaultEmail, 
        password: defaultPassword, 
        usersession  
    } = queryString.parse(location.search);
    
    const handleCleanErrorMessage = useCallback(() => {
        if(errorMessage) setErrorMesssage(null);
    }, [errorMessage])

    const handleSendData = () => {
        const [email, password] = [
            emailRef.current?.value?.trim(), 
            passwordRef.current?.value
        ];
        if(email) emailValueRef.current = email;
        handleCleanErrorMessage();
        if(validateEmail(defaultEmail || email)) {
            if(defaultEmail) {
                if(!password.trim())
                    setErrorMesssage(
                        `Impossible de se connecter, 
                        Merci de renseigner votre mot passe.`
                    );
                else refresh({
                    method: 'post',
                    url: '/api/auth/login',
                    data: { 
                        email: defaultEmail, 
                        password 
                    }
                })
                .then(result => {
                    const {data} = result;
                    const user = encrypt({
                        id: data.userId,
                        token: data.token,
                        email: data.userEmail,
                        firstname: data.userFname,
                        lastname: data.userLname,
                        middlename: data.userMname || null,
                        docTypes: data.docTypes,
                        number: data.phoneCell,
                        image: data.userImage || null,
                        func: data.userGrade,
                    });
                    const customEnvent = new CustomEvent('_connected', {
                        detail: {
                            user,
                            name: '_connected',
                        }
                    });
                    document.getElementById('root')
                    .dispatchEvent(customEnvent);
                })
                .catch(error => {
                    console.log(error);
                    setErrorMesssage(
                        `Impossible d'ouvrir une session 
                        en raison du mot de passe incorrect, 
                        vérifier et réessayer.`
                    );
                });

            } else refresh({})
            .then(result => {
                    navigateTo('?' + queryString.stringify({email, password}));
                })
            .catch(error => {
                    setErrorMesssage(
                        `Compte introuvable, 
                        cette adresse ne possède pas de compte à la Geid, 
                        vérifiez pour essayer à nouveau.`
                    )
                });

        } 
        else setErrorMesssage(
            `Impossible de se connecter, 
            Merci de saisir une adresse e-mail valide.`
        );
        // if(!defaultEmail && !!email)
        //     navigateTo('?' + queryString.stringify({email, password}));

    };

    return (
        <Box 
            flex={1} 
            flexDirection="column"
            component="form"
            onSubmit={event => {
                event.preventDefault();
                handleSendData();
            }}
        >
            {   ( 
                (usersession === undefined && defaultEmail === undefined) || 
                (usersession && !user)
                ) &&
            <Navigate to="?email"/>}
            <Box flex={1} position="relative" flexDirection="column">
                <TabLevel show={usersession && user} >
                    <Account
                        user={user}
                    />
                </TabLevel>
                <TabLevel show={defaultEmail === null}>
                    <CheckEmail 
                        email={emailValueRef.current}
                        emailRef={emailRef} 
                        errorMessage={errorMessage}
                        cleanErrorMessage={handleCleanErrorMessage}
                    />
                </TabLevel>
                <TabLevel show={!!defaultEmail} >
                    <CheckPassword 
                        email={defaultEmail} 
                        password={defaultPassword} 
                        passwordRef={passwordRef} 
                        errorMessage={errorMessage}
                        cleanErrorMessage={handleCleanErrorMessage}
                        
                    />
                </TabLevel>
            </Box>
            <Stack spacing={1} direction="row" display="flex">
                <Box flex={1} >
                    {!defaultEmail && 
                    <Button LinkComponent={Link} to="/account/signup">S'incrire</Button>}
                </Box>
                <Box flex={1} >
                    {(defaultEmail === null || !!defaultEmail ) &&
                    <Button type="submit" variant="contained">
                      {defaultEmail ?  'Connexion' : 'Suivant'}
                    </Button>} 
                </Box>
            </Stack> 
        </Box>
    )
}

const TabLevel = ({show, children}) => {

    return ( show &&
        <Slide 
            in 
            direction="right" 
            style={{
                position: 'absolute',
                top:0
            }}
        >
            <Box flex={1} sx={{ width: '100%'}}>
                {children}
            </Box>
        </Slide>
    )
}