import {
    Box as MuiBox, 
    Divider, 
    ListItemAvatar, 
    ListItemButton, 
    ListItemText,
} from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';
import Link from '../../../components/Link';
import Typography from "../../../components/Typography";
import Avatar from '../../../components/Avatar';
import useCheckTokenAccount from './useCheckTokenAccount';
import getFullName from '../../../utils/getFullName';

export default function Account ({ user, refresh }) {
    const handleCheckAccount = useCheckTokenAccount({ refresh, user });
 
    return (
        <MuiBox 
            sx={{width: '100%'}}
        >
            <Typography 
                color="text.primary" 
                paragraph 
            >
                Un compte trouvé sur cet appareil, 
                souhaitez-vous ouvrir une session avec celui-ci ?
            </Typography>
            <ListItemButton
                onClick={handleCheckAccount}
            >
                <ListItemAvatar>
                    <Avatar src={user.image} />
                </ListItemAvatar>
                <ListItemText
                    primary={getFullName(user)}
                    secondary={user.email}
                    secondaryTypographyProps={{
                        variant: 'body2',
                        color: 'text.secondary',
                    }}
                />
            </ListItemButton>
            <Divider variant="inset" />
            <MuiBox
                justifyContent="right"
                display="flex"
                mt={1}
            >
                <Link
                    component={ReactRouterLink}
                    to="?&email"
                > Se connecter avec un notre compte</Link>
            </MuiBox>
        </MuiBox>
    )
}