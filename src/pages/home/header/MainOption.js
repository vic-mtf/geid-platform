import { 
    Chip, 
    IconButton, 
    Tooltip,
    Avatar
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/Button";
import { decrypt } from '../../../utils/crypt';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import AppsMenu from "./AppsMenu";
import ProfileMenu from "./ProfileMenu";

export default function MainOption () {
    const connected = useSelector(store => store.user?.connected);
    const userSave = useSelector(store => store?.app?.user && 
        decrypt(store.app?.user)
        );
   
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
                        const width = window.innerWidth * .65;
                        const height = window.innerHeight * .85;
                        const left = (window.innerWidth - width) / 2;
                        const top = (window.innerHeight - height) / 2;
                        const sizes = `top=${top}, left=${left}, width=${width}, height=${height}`;
                        window.open(
                            `/account/signin?usersession=${!userSave}`,
                            '_blank',
                            sizes
                        );
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
    const fullname = `${user.lastname} ${user.firstname}`;

    return (
        <React.Fragment>
            <Tooltip title="Profil" arrow>
                    <Chip
                        label={fullname}
                        ref={anchorRef}
                        onClick={() => {
                            setAnchorEl(anchorEl ? null : anchorRef.current);
                        }}
                        sx={{ml: 1}}
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