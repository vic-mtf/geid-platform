import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box as MuiBox
} from '@mui/material';
import useAxios from '../../utils/useAxios';
import { useEffect, useRef, useState } from 'react'
import Typography from '../../components/Typography'
import Button from '../../components/Button';
import { LoadingButton } from '@mui/lab';
import Editor from './Editor';
import canvasToImage from '../../utils/canvasToImage';
import { useDispatch, useSelector } from 'react-redux';
import { updateValue } from '../../redux/user';

export default function PictureEditor () {
    const user = useSelector(store => store.user);
    const [{loading}, refresh] = useAxios({
        url: '/api/auth/profil',
        headers: {
            'Authorization': `Bearer ${user?.token}`
        },
        method: 'post'
    },{manual: true});
    const [file, setFile] = useState(null);
    const imageRef = useRef ();
    const cropRef = useRef();
    const dispatch = useDispatch();

    const handleSenFile = async () => {
        const blob = await canvasToImage(
            imageRef.current,
            cropRef.current,
        );
        const file = new File([blob], 
            `${1E9 * Date.now()}.webp`, {
            type: 'image/webp'
          });
          const data = new FormData();
          data.append('file', file);
          refresh({data}).then(({data: {imageUrl}}) => {
            dispatch(updateValue({
                key: 'image', 
                value: imageUrl?.toString()}
            ));
            setFile(null);
          });
    }
    useEffect(() => {
        const handleSetImage = event => {
            const {file} = event.detail;
            if(file) setFile(file);
        };
        document.getElementById('root')
        .addEventListener(
            '_edite_profile_image', 
            handleSetImage
        );
        return () => {
            document.getElementById('root')
            .removeEventListener(
                '_edite_profile_image', 
                handleSetImage
            );
         };
    }, [setFile]);

    return (
        <Dialog 
            open={Boolean(file)}
            BackdropProps={{
                sx: {
                    background: theme => theme.palette.background.paper +
                    theme.customOptions.opacity,
                    backdropFilter: theme =>`blur(${theme.customOptions.blur})`
                }
            }}
        >
          <DialogTitle>
            <Typography fontSize={15} fontWeight="bold" variant="h6">Modifier l'image du profil</Typography>
          </DialogTitle>
          <DialogContent
            sx={{
                width: 500,
                px: 1,
                overflow: "hidden"
            }}
          >
            <MuiBox
                sx={{
                    background: theme => theme.palette.divider,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }}
            >
                <Editor
                    src={file && URL.createObjectURL(file)}
                    onclose={() => setFile(null)}
                    imageRef={imageRef}
                    cropRef={cropRef}
                />
            </MuiBox>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setFile(null)}
              children="Annuler"
            />
            <LoadingButton
              onClick={handleSenFile}
              variant="contained"
              children="Modifier"
              size="small"
              loading={loading}
            />
          </DialogActions>
        </Dialog>
    )
}
