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
import { keyBy, merge } from 'lodash';
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

    const handleSendData = event => {
        event?.preventDefault();
        handleCleanErrorMessage();
        const email = emailRef.current?.value?.trim();
        const password = passwordRef.current?.value;

        if(email) emailValueRef.current = email;
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
                    const writeAuth = data?.auth?.readNWrite?.map(auth => ({
                            type: auth,
                            write: !!data?.auth?.readNWrite
                            ?.find(_auth => _auth === auth),
                    }));
                    const readAuth = data?.auth?.readOnly?.map(auth => ({
                            type: auth,
                            write: !!data?.auth?.readOnly
                            ?.find(_auth => _auth === auth),
                    }));

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
                        grade: data?.userGrade?.grade,
                        role: data?.userGrade?.role,
                        permissions: merge( 
                            keyBy(writeAuth, 'type'), 
                            keyBy(readAuth, 'type')
                        ),
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
                    setErrorMesssage(
                        `Impossible d'ouvrir une session 
                        en raison du mot de passe incorrect, 
                        vérifier et réessayer.`
                    );
                });

            } else refresh({
                url: '/api/auth/check',
                data: {type: 'email', email},
                method: 'post',
            })
            .then(({data}) => {
                    if(data?.found)
                        navigateTo('?' + queryString.stringify({email, password}));
                })
            .catch(error => {
                if(error?.response?.data?.found === false)
                    setErrorMesssage(
                        `Compte introuvable, 
                        cette adresse ne possède pas de compte à la Geid, 
                        vérifiez pour essayer à nouveau.`
                    );
                else
                    setErrorMesssage(
                        `Un problème est survenu, 
                        Nous avons des difficultés à charger vos données, 
                        vérifier que vous êtes connecté à l'internet.`
                    );
                });
        } 
        else setErrorMesssage(
            `Impossible de se connecter, 
            Merci de saisir une adresse e-mail valide.`
        );
    };

    return (
        <Box 
            flex={1} 
            flexDirection="column"
            component="form"
            onSubmit={handleSendData}
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
                        refresh={refresh}
                    />
                </TabLevel>
                <TabLevel show={defaultEmail === null}>
                    <CheckEmail 
                        email={emailValueRef.current}
                        emailRef={emailRef} 
                        errorMessage={errorMessage}
                        refresh={refresh}
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