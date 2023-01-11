import { 
    List, 
    ListItemButton, 
    ListItemText,
    Box as MuiBox,
    Divider
} from "@mui/material";
import React from "react";
import Typography from "../../../components/Typography";
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { relatedLinks } from "./links";

export default function ListRelatedLinks () {
    return (
        <List
        disablePadding
        subheader={
            <Typography
                variant="h6" 
                color="text.primary"
                component="div"
                paragraph
            >
                Liens connexes
            </Typography>
            }
        sx={{width: 200}}
    > 
        {relatedLinks.map((link, index, links) => (
            <React.Fragment key={index} >
                <ListItemButton
                    sx={styles.listItemButton} 
                    LinkComponent="a" 
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
                {index < (links.length - 1) && <Divider variant='middle' component="li" />}
            </React.Fragment>
        ))}
    </List>  
    )
}

const styles = {
    listItemButton: {
        width:'auto',  
        px: 1, 
        py: 0, 
        minHeight: 32, 
        color: '#ffffff', 
        borderRadius: 4 
    },
}