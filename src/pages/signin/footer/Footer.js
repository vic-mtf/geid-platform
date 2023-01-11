import { 
    Stack,
    styled,
    Typography,
} from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";

export default function Footer () {
    return (
        <Stack
            display="flex"
            mt={1}
            justifyContent="center"
            alignItems="center"
            spacing={2}
            direction="row"
        >
         <Link>Conditions d'utilisation</Link>
         <Link>Aide</Link>
         <Link
            component="div"
            color="text.secondary"
         >DANTIC &copy;2021</Link>
        </Stack>
    )
}

const Link = styled(Typography)(({theme}) => ({
    textDecoration: 'none',
    color: theme.palette.text.primary,
}));

Link.defaultProps = {
    variant: 'caption',
    component: ReactRouterLink,
}