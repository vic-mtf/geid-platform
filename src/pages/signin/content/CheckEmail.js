import {
    TextField, 
    Box as MuiBox,
    Alert,
} from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as ReactRouterLink } from 'react-router-dom';
import Box from '../../../components/Box';
import Link from '../../../components/Link';
import Typography from '../../../components/Typography';
import { decrypt, encrypt } from '../../../utils/crypt';

export default function CheckEmail({
    email, 
    emailRef, 
    errorMessage,
    cleanErrorMessage,
}) {
    
    useEffect(() => {
        cleanErrorMessage()
    }, [cleanErrorMessage]);

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
                <Account/>
            </MuiBox>
        </MuiBox>
    )
}

const Account = () => {
    const user = useSelector(store => store.app?.user && decrypt(store.app?.user)
        );
    // const dispatch = useDispatch();
    // const navigateTo = useNavigate();
    return ( !!user &&
        <Typography color="text.secondary" paragraph>
            Ouvrez une session en tant 
            que <Link 
                component={ReactRouterLink} 
                to="?&email"
                onClick={event => {
                    event.preventDefault();
                    const customEnvent = new CustomEvent('_connected', {
                        detail: {
                            user: encrypt(user),
                            name: '_connected',
                        }
                    });
                    document.getElementById('root')
                    .dispatchEvent(customEnvent);
                }}
            >{user?.email}</Link>
        </Typography>
    )
}