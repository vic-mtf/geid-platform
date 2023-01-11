import { 
    Alert, 
    AlertTitle, 
    Dialog, 
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export default function ErrorNetwork () {
    const [open, setOpen] = useState(!navigator.onLine);

    const handleChangeState = useCallback(() => {
        setOpen(!navigator.onLine)
    }, []);

    useEffect(() => {
        window.addEventListener('online', handleChangeState);
        window.addEventListener('offline', handleChangeState);
        return () => {
            window.removeEventListener('online', handleChangeState);
            window.removeEventListener('offline', handleChangeState);
        }
    }, [handleChangeState]);
 
    return (
        <Dialog
            open={open}
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
                <Alert 
                    severity="warning"
                >
                    <AlertTitle
                        sx={{fontWeight: 'bold'}}
                    >Problème de réseau</AlertTitle>
                    Impossible de poursuivre cette opération votre appareil 
                    n'est plus connecté à Internet ou un problème réseau s'est produit.
                </Alert>
        </Dialog>
    )
}