import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box as MuiBox,
    FormControl,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';
import { removeUser } from '../../../redux/app';
import { deconnected } from '../../../redux/user';

export default function DeconnectDialog () {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const inputRef = useRef();

    const handleDeconnecte = useCallback(() => {
        dispatch(deconnected());
       if(inputRef.current?.checked) 
            dispatch(removeUser());
       setOpen(false);
    },[dispatch]);

    useEffect(() => {
        const handleOpen = () => setOpen(true);
        document.getElementById('root')
        .addEventListener(
            '_deconnected', 
            handleOpen
        );

       return () => {
            document.getElementById('root')
            .removeEventListener(
                '_deconnected', 
                handleOpen
            );
       }
    }, []);

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                sx:{
                    border: theme => `1px solid ${theme.palette.divider}`
                }
            }}
            BackdropProps={{
                sx: {
                    bgcolor: theme => theme.palette.background.paper +
                    theme.customOptions.opacity,
                    backdropFilter: theme => `blur(${theme.customOptions.blur})`,
                }
            }}
        >
        <DialogTitle id="alert-dialog-deconnexion">
            Souhaitez-vous déconnecter le compte ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText 
            id="alert-dialog-description"
            component="div"
          >
            <Typography> 
                Lorsque vous vous déconnectez, vos données seront conservées sur 
                cet appareil afin qu'il se souvienne de vous lors de la prochaine 
                tentative de connexion jusqu'à la fin de votre session.
                vous pouvez le supprimer en cochant la boîte avant de vous déconnecter.
            </Typography> 
            <MuiBox mt={1}>
            <FormControl sx={{display: 'inline-block'}}>
                <FormControlLabel
                    value="left"
                    control={<Checkbox inputRef={inputRef} size="small" />}
                    label={
                        <Typography
                            variant="body2"
                            component="div"
                            color="text.primary"
                        >Supprimer toutes vos données</Typography>
                    }
                    labelPlacement="end"
                />
            </FormControl>
            </MuiBox>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button 
            variant='outlined'
            onClick={handleDeconnecte} autoFocus>
            Déconnexion
          </Button>
        </DialogActions>
        </Dialog>
    )
}