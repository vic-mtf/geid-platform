import { 
    Chip,
    Tooltip,
    useMediaQuery,
    useTheme
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/Button";
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import AppsMenu from "./AppsMenu";
import ProfileMenu from "./ProfileMenu";
import openSignIn from "./openSignIn";
import Avatar from "../../../components/Avatar";
import getFullName from "../../../utils/getFullName";
import IconButton from "../../../components/IconButton";

export default function MainOption () {
    const connected = useSelector(store => store.user?.connected);
   
    return (
        <React.Fragment>
            {connected ? 
            (<React.Fragment>
                <AppsMenuButton/>
                <ProfileMenuButton/>
            </React.Fragment>) : 
            (<React.Fragment>
                <Button
                    variant="outlined"
                    onClick={event => {
                        event.preventDefault();
                        openSignIn();
                    }} 
                >Connexion</Button>
            </React.Fragment>)
        }
        </React.Fragment>
    )
}

const AppsMenuButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const anchorRef = useRef();

    return (
        <React.Fragment>
            <Tooltip title="Applications" arrow>
                <IconButton 
                    size="small" 
                    sx={{mx: 1}} 
                    ref={anchorRef}
                    onClick={() => {
                        setAnchorEl(anchorEl ? null : anchorRef.current);
                    }}
                >
                    <AppsRoundedIcon fontSize="small"/>
                </IconButton>
            </Tooltip>
            <AppsMenu
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
            />
        </React.Fragment> 
    )
}

const ProfileMenuButton  = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const anchorRef = useRef();
    const user = useSelector(store => store.user);
    const fullname = getFullName(user);
    const shotname = `${user.lastname?.charAt(0)}${user.firstname?.charAt(0)}`;
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.only('xs'));

    return (
        <React.Fragment>
            <Tooltip title="Profil" arrow>
                    <Chip
                        label={matches ? shotname :fullname}
                        ref={anchorRef}
                        onClick={() => {
                            setAnchorEl(anchorEl ? null : anchorRef.current);
                        }}
                        sx={{ml: 1, borderRadius: 1}}
                        avatar={
                            <Avatar
                                alt={fullname}
                                src={user.image}
                            />
                        }
                    />
                </Tooltip>
            <ProfileMenu
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
            />
        </React.Fragment> 
    )
}