import React, { useMemo, useEffect } from 'react';
import { Slide, Stack } from '@mui/material';
import Button from '../../../components/Button';
import Account from './Account';
import { useSelector } from 'react-redux';
import Box from '../../../components/Box';
import CheckEmail from './CheckEmail';
import CheckPassword from './CheckPassword';
import { decrypt } from '../../../utils/crypt';
import useSignInSendData from './useSignInSendData';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import getPathnames from '../../../utils/getPathnames';

export default function Content ({loading, refresh}) {
    const appStoreUser = useSelector(store => store.app.user);
    const location = useLocation();
    const navigateTo = useNavigate();
    const user = useMemo(() => decrypt(appStoreUser), 
        [appStoreUser]
    );
    const [
        {
            errorMessage,
            defaultEmail,
            emailRef,
            passwordRef,
            email
        }, 
        {
            handleSendData,
            handleCleanErrorMessage
        }
    ] = useSignInSendData({ refresh });

    const pathNames = useMemo(() => getPathnames(location?.pathname), [location?.pathname]);

    useEffect(() => {
        const paths = ['userfound', 'useremail', 'password'];
        const notFound = !pathNames.some(path => paths.includes(path));
        if(notFound) {
            if(user && !email) navigateTo('userfound');
            if(!user) navigateTo('useremail');
        }
    }, [email, navigateTo, pathNames, user]);

    return (
        <Box 
            flex={1} 
            flexDirection="column"
            component="form"
            onSubmit={handleSendData}
        >
            <Box flex={1} position="relative" flexDirection="column">
                <TabLevel show={pathNames.includes('userfound')} >
                    <Account
                        user={user}
                        refresh={refresh}
                    />
                </TabLevel>
                <TabLevel show={pathNames.includes('useremail')}>
                    <CheckEmail 
                        email={email}
                        errorMessage={errorMessage}
                        refresh={refresh}
                        user={user}
                        emailRef={emailRef}
                    />
                </TabLevel>
                <TabLevel show={pathNames.includes('password')} >
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

const TabLevel = ({show, children}) => (
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
);