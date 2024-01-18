import { TextField, Box as MuiBox, Alert, Fade } from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';
import Box from '../../../components/Box';
import Link from '../../../components/Link';
import Typography from '../../../components/Typography';
import useCheckTokenAccount from './useCheckTokenAccount';

export default function CheckEmail({ email, errorMessage, refresh, emailRef, user }) {
    return (
        <MuiBox
            display="flex"
            flex={1}
            flexDirection="column"
        >
            <Box flex={1} >
                <Typography 
                    variant="body2" 
                    align="center" 
                    color="text.primary" paragraph
                >
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
                    email={email}
                    user={user}
                />
            </MuiBox>
        </MuiBox>
    )
}

const Account = ({ refresh, user }) => {
    const handleCheckAccount = useCheckTokenAccount({ user, refresh });
    return (
        <Fade 
            in={Boolean(user)}
            unmountOnExit
        >
            <Typography color="text.secondary" paragraph>
                Ouvrez une session en tant 
                que <Link 
                    component={ReactRouterLink} 
                    to="?&email"
                    onClick={handleCheckAccount}
                >{user?.email}</Link>
            </Typography>
        </Fade>
    )
}