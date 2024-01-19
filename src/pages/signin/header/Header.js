import {
    Box as MuiBox,
    useTheme,
} from "@mui/material";
import _geid_logo_blue from "../../../assets/geid_logo_blue.webp";
import _geid_logo_white from "../../../assets/geid_logo_white.webp"
import Typography from "../../../components/Typography";
import { useMemo } from "react";

export default function Header() {
    const theme = useTheme();
    const srcLogo = useMemo(() => 
        theme.palette.mode === 'dark' ? 
        _geid_logo_white : _geid_logo_blue,
        [theme.palette.mode]
    );

    return (
        <MuiBox>
            <MuiBox
                component="img"
                src={srcLogo}
                srcSet={srcLogo}
                width="80%"
                draggable={false}
                sx={{ userSelect: 'none'}}

            />
            <Typography align="center" variant="h6" paragraph>
                Authentification
            </Typography>
        </MuiBox>
    );
}