import {
    TextField, 
    Box as MuiBox,
    Alert,
} from '@mui/material';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import Box from '../../../components/Box';
import Link from '../../../components/Link';
import Typography from '../../../components/Typography';
import { decrypt, encrypt } from '../../../utils/crypt';

export default function CheckEmail({
    email, 
    emailRef, 
    errorMessage,
    refresh,
    //cleanErrorMessage,
}) {

    return (
        <MuiBox
            display="flex"
            flex={1}
            flexDirection="column"
        >
            <Box
                flex={1}
            >
                <Typography variant="body2" align="center" color="text.primary" paragraph>
                    Connectez-vous pour accéder à la Geid.
                    Saisissez l'adresse e-mail correspondant à votre compte
                </Typography>
                <TextField
                    label="Adresse électronique"
                    defaultValue={email}
                    fullWidth
                    margin="dense"
                    inputRef={emailRef}
                    error={!!errorMessage}
                    autoFocus
                /> 
                {!!errorMessage &&
                <Alert severity="error">
                    <Typography variant="caption">
                        {errorMessage}
                    </Typography>
                </Alert>}
            </Box>
            <MuiBox my={1}>
                <Account
                    refresh={refresh}
                />
            </MuiBox>
        </MuiBox>
    )
}

const Account = ({refresh}) => {
    const user = useSelector(store => store.app?.user && decrypt(store.app?.user)
        );
    // const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const handleCheckAccount = useCallback(() => {
        const { token, email } = user;
        refresh({
            url: '/api/auth/check',
            method: 'post',
            data: {type: "token", token},
        }).then(({data}) => {
            if(data?.found) {
                const customEnvent = new CustomEvent('_connected', {
                    detail: {
                        user: encrypt(user),
                        name: '_connected',
                    }
                });
                document.getElementById('root')
                .dispatchEvent(customEnvent);
            }
        }).catch((error) => {
            if(error?.response.data?.found === false) 
                navigateTo(`/account/signin?email=${email}`);
        })
    }, [user, navigateTo, refresh]);

    return ( !!user &&
        <Typography color="text.secondary" paragraph>
            Ouvrez une session en tant 
            que <Link 
                component={ReactRouterLink} 
                to="?&email"
                onClick={handleCheckAccount}
            >{user?.email}</Link>
        </Typography>
    )
}