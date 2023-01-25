import {
    Box as MuiBox, useMediaQuery, useTheme
} from '@mui/material';
import _geid_logo from '../../../assets/geid_logo_blue.webp';
import Typography from '../../../components/Typography';

export default function Header() {
    const theme = useTheme();
    const maches = useMediaQuery(theme.breakpoints.only('xs'));

    return (
        <MuiBox
            sx={{px: {xs: 2, sm: 0}}}
        >
            <MuiBox
                component="img"
                src={_geid_logo}
                srcSet={_geid_logo}
                draggable={false}
                sx={{ 
                    userSelect: 'none',
                    width: maches ? '65%' : '40%'
                }}

            />
            <Typography align="center" variant="h6" paragraph>
                Créer un compte
            </Typography>
        </MuiBox>
    );
}