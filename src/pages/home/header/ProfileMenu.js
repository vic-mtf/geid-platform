import React from 'react';
import { 
    Avatar,
    Badge,
    Box as MuiBox,
    CardContent, 
    Divider, 
    Menu,
    Stack
} from '@mui/material';
import Box from '../../../components/Box';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import Typography from '../../../components/Typography';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '../../../components/IconButton';

export default function ProfileMenu ({anchorEl, onClose}) {
    const user = useSelector(store => store.user);
    const fullname = `${user.lastname} ${user.middlename} ${user.firstname}`;

    return (
        <Menu 
            id="_apps" 
            anchorEl={anchorEl} 
            keepMounted 
            open={Boolean(anchorEl)} 
            onClose={onClose}
            PaperProps={{
                sx: {
                    bgcolor: theme => theme.palette.background.paper + 
                    theme.customOptions.opacity,
                    border: theme => `1px solid ${theme.palette.divider}`,
                    // min: 350,
                    width: 300,
                    backdropFilter: theme => `blur(${theme.customOptions.blur})`
                }
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
          <CardContent
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column'
            }}
          >
            <Stack
                divider={<Divider/>}
                spacing={1}
                display="flex"
                flex={1}
            >
                <Box justifyContent="center" alignItems="center">
                    <Badge
                        overlap="rectangular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        sx={{my:3}}
                        badgeContent={
                            <IconButton
                                size="small"
                                onClick={async() => {
                                    const file = await new Promise((resolve, reject) => {
                                        const inputFile = document.createElement('input')
                                        inputFile.setAttribute('type', 'file');
                                        inputFile.setAttribute('accept', 'image/*');
                                        inputFile.addEventListener('change', event => {
                                            const [file] = event.target.files;
                                            if(file)
                                                resolve (file);
                                            else reject('Error file');
                                        })
                                        inputFile.click();
                                    });
                                    if(file) {const _eventName = '_edite_profile_image';
                                        const customEvent = new CustomEvent(_eventName, {
                                            detail: {file, name: _eventName}
                                        });
                                        document.getElementById('root').dispatchEvent(customEvent);
                                    }
                                    onClose();
                                }}  
                                sx={{
                                    backdropFilter: theme => `blur(${theme.customOptions.blur})`,
                                    border: theme => `1px solid ${theme.palette.background.paper + '30'}`

                                }}
                            >
                                <AddAPhotoRoundedIcon fontSize="small"/>
                            </IconButton>
                        }
                    >
                        <Avatar
                            sx={{width: 100, height: 100, fontSize: 50,}}
                            alt={fullname}
                            src={user.image}
                            variant="rounded"
                        />
                    </Badge>
                    <Typography fontWeight="bold" variant='body1'>{fullname}</Typography>
                    <Typography paragraph>{user.email}</Typography>
                </Box>
                <Box>
                    <MuiBox 
                        alignItems="center" 
                        display="flex" 
                        width="100%" 
                        justifyContent="center"
                        my={1}
                    >
                        <Button
                            variant="contained"
                            color="error"
                            fullWidth={false}
                            // size="medium"
                            endIcon={React.createElement(LogoutIcon)}
                            onClick={() => {
                                const customEvent = new CustomEvent(
                                    '_deconnected',
                                    { detail: { name: '_deconnected' }}
                                );
                                document.getElementById('root')
                                .dispatchEvent(customEvent);
                            }}
                        >Déconnexion</Button>  
                    </MuiBox>
                </Box>
                <Box> </Box>
            </Stack>
            <Stack display="flex" direction="row" spacing={1}>
                    <Button
                        color="inherit"
                    >Politique de confidentialité</Button>
                    <Button
                        color="inherit"
                    >Conditions d'utilisation</Button>
            </Stack>
          </CardContent>
        </Menu>
    )
}