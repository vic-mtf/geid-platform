import {
    Avatar,
    Box as MuiBox, 
    Divider, 
    ListItemAvatar, 
    ListItemButton, 
    ListItemText,
} from '@mui/material';
//import { useDispatch } from 'react-redux';
import { Link as ReactRouterLink } from 'react-router-dom';
import Link from '../../../components/Link';
import Typography from "../../../components/Typography";
import { encrypt } from '../../../utils/crypt';

export default function Account ({user}) {
    const fullname = `${user.lastname} ${user.middlename} ${user.firstname}`
    //const dispatch = useDispatch();
 
    return (
        <MuiBox
            sx={{width: '100%'}}
        >
            <Typography color="text.primary" paragraph >
                Un compte trouvé sur cet appareil, 
                souhaitez-vous ouvrir une session avec celui-ci ?
            </Typography>
            <ListItemButton
                onClick={() => {
                    const customEnvent = new CustomEvent('_connected', {
                        detail: {
                            user: encrypt(user),
                            name: '_connected',
                        }
                    });
                    document.getElementById('root')
                    .dispatchEvent(customEnvent);
                }}
            >
                <ListItemAvatar>
                    <Avatar sx={{width: 45, height: 45}} src={user.image} />
                </ListItemAvatar>
                <ListItemText
                    primary={fullname}
                    secondary={user.email}
                    primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: 'bold',
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