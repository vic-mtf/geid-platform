import { 
    List, 
    ListItemButton, 
    ListItemText,
    Box as MuiBox,
} from "@mui/material";
import React from "react";
import Typography from "../../../components/Typography";
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';

export default function LinksGroup ({ title, links }) {
    return (
        <List
        disablePadding
        subheader={
            <Typography
                variant="h6" 
                color="text.primary"
                component="div"
                paragraph
            >{title}
            </Typography>
            }
        sx={{width: { xs: 170, lg: 200 }}}
    > 
        {links.map((link, index, links) => (
            <React.Fragment key={index} >
                <ListItemButton
                    sx={{
                        width:'auto', 
                        px: 1, 
                        py: .25, 
                        // minHeight: 32, 
                        color: 'text.primary', 
                        borderRadius: 1
                    }} 
                    LinkComponent="a" 
                    target="_blank"
                    href={link.href}
                >
                    <ListItemText
                        primary={link.title}
                        primaryTypographyProps={{ fontSize: 14 }}
                    />
                    <MuiBox 
                        color="inherit" 
                        ml={1} 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center"
                    >
                        <LaunchRoundedIcon
                            sx={{fontSize: 15}}
                        />
                    </MuiBox>
                </ListItemButton>
            </React.Fragment>
        ))}
    </List>  
    )
}