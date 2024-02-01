import {
    Box as MuiBox
} from '@mui/material';
import _geid_logo from '../../assets/geid_logo_blue.webp';
import Typography from '../../components/Typography';

export default function Header() {
    return (
        <MuiBox>
            <MuiBox
                component="img"
                src={_geid_logo}
                srcSet={_geid_logo}
                width="50%"
                draggable={false}
                sx={{ userSelect: 'none'}}

            />
            <Typography 
                align="center" 
                variant="h6" 
                paragraph 
                color="text.primary"
            >
                Un problème est survenu.
            </Typography>
        </MuiBox>
    );
}