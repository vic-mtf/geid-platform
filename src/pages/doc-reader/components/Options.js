import React, { useMemo, useRef, useState } from "react";
import { 
    IconButton,
    Menu, 
    MenuItem, 
    ListItemIcon, 
    ListItemText,
    createTheme,
    ThemeProvider
} from '@mui/material';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

export default function Options({
    handleDrawerOpen, 
    url, 
    handleDrawerClose, 
    open: openNav
}) {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef();
    const anchorEl = useMemo(() => open ? buttonRef.current : null, [open]);
    const moreOptions = [
        {
            icon: InfoRoundedIcon,
            lebel: 'Détail',
            handleClick: openNav === 'detail' ? handleDrawerClose : handleDrawerOpen('detail'),
        },
        {
            icon: CalendarViewDayRoundedIcon,
            lebel: 'Vue rapide des pages',
            handleClick: openNav === 'pages' ? handleDrawerClose : handleDrawerOpen('pages'),
        },
        {
            icon: OpenInNewRoundedIcon,
            lebel: 'Ouvrir dans une nouvelle fenêtre',
            handleClick: () => window.open(url)
        },
    ];

    return (
        <React.Fragment>
            <Menu id="more" 
                anchorEl={anchorEl} 
                keepMounted 
                open={open} 
                onClose={() => setOpen(false)}
            >
                {moreOptions.map((item, index) => (
                    <MenuItem 
                        key={index}
                        onClick={() => {
                            item.handleClick();
                            setOpen(false);
                        }}
                    >
                         <ListItemIcon>
                            <item.icon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                variant: 'body2'
                            }}
                        >{item.lebel}</ListItemText>
                    </MenuItem>
                ))}
            
            </Menu>
            <DarkThemeProvider>
                <IconButton 
                    size='small' 
                    ref={buttonRef}
                    onClick={() => setOpen(true)}
                >
                    <MoreVertRoundedIcon fontSize='small'/>
                </IconButton>
            </DarkThemeProvider>
        </React.Fragment>
    );
};

export const DarkThemeProvider = ({children}) => {
    const theme = createTheme({palette: { mode: 'dark'}});
    return (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    )
}