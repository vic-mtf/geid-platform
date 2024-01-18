import { Slide, Stack } from '@mui/material';
import React, { useMemo, useState } from 'react';
import Button from '../../../components/Button';
import Account from './Account';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Box from '../../../components/Box';
import CheckEmail from './CheckEmail';
import CheckPassword from './CheckPassword';
import { decrypt } from '../../../utils/crypt';
import useSignInSendData from './useSignInSendData';

export default function Content ({loading, refresh}) {
    const appStoreUser = useSelector(store => store.app.user);
    const user = useMemo(() => decrypt(appStoreUser), 
        [appStoreUser]
    );
    const [
        {
            errorMessage,
            defaultEmail,
            emailRef,
            userSession,
            passwordRef,
            email
        }, 
        {
            handleSendData,
            handleCleanErrorMessage
        }
    ] = useSignInSendData({ refresh })

    return (
        <Box 
            flex={1} 
            flexDirection="column"
            component="form"
            onSubmit={handleSendData}
        >
            {!user && !email && <Navigate to="?email"/>}
            <Box flex={1} position="relative" flexDirection="column">
                <TabLevel show={user} >
                    <Account
                        user={user}
                        refresh={refresh}
                    />
                </TabLevel>
                <TabLevel show={defaultEmail === null}>
                    <CheckEmail 
                        email={email}
                        errorMessage={errorMessage}
                        refresh={refresh}
                        user={user}
                        emailRef={emailRef}
                    />
                </TabLevel>
                <TabLevel show={!!defaultEmail} >
                    <CheckPassword 
                        email={defaultEmail} 
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
                    <Button type="submit" variant="outlined">
                      {defaultEmail ?  'Connexion' : 'Suivant'}
                    </Button>} 
                </Box>
            </Stack> 
        </Box>
    )
}

const TabLevel = ({show, children}) => {

    return (
        <Slide 
            in={Boolean(show)}
            direction="right" 
            style={{
                position: 'absolute',
                top:0
            }}
            unmountOnExit
        >
            <Box flex={1} sx={{ width: '100%'}}>
                {children}
            </Box>
        </Slide>
    )
}