import {  
    Box as MuiBox, 
    createTheme, 
    Grid, 
    Hidden, 
    List, 
    ListItemButton, 
    ListItemText, 
    ThemeProvider 
} from "@mui/material";
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { makeStyles, createStyles } from "@mui/styles";
import appConfig from '../../../configs/app-config.json';
import _logo_ministere_budget from '../../../assets/logo_ministere_budget.webp';
import _logo_gied from '../../../assets/geid_logo_white.webp';

export default function MainHeader () {
    const classes = useStyles();

    return (
        <MuiBox className={classes.container} component={Grid} container>
            <MuiBox component={Grid} item className={classes.gridItem}  xs={12} md={4} >
                <MuiBox
                    component="img"
                    src={_logo_ministere_budget}
                    className={classes.logo}
                    draggable={false}
                    sx={{ userSelect: 'none'}}
                />
            </MuiBox>
            <MuiBox component={Grid} item className={classes.gridItem}  xs={12} md={4}>
            <MuiBox
                component="img"
                src={_logo_gied}
                className={[classes.gied]}
                draggable={false}
                sx={{ userSelect: 'none'}}
            />
            </MuiBox>
            <Hidden smDown>
                <MuiBox 
                    sx={{justifyContent: 'right'}} 
                    component={Grid} 
                    item 
                    className={classes.gridItem}  
                    xs={4} 
                    md={4}
                >
                    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' }})} >     
                        <List disablePadding> 
                            {links.map((link, index) => (
                                <ListItemButton 
                                    key={index} 
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
                            ))}
                        </List>
                    </ThemeProvider>
                </MuiBox>
            </Hidden>
        </MuiBox>
    );
}

const links = [
    {
        title: 'Ministère du budget',
        href: 'https://budget.gouv.cd/',
    },
    {
        title: 'Secretariat général',
        href: 'https://budget.gouv.cd/secretariat-general',
    },
];

const useStyles = makeStyles((theme) => 
    createStyles({
        container: {
            backgroundColor: appConfig.colors.main,
            display: 'flex',
            width: '100%',
            padding: '0 10px',
        },
        logo: {
            height: 100,
        },
        gied: {
            width: 320,
        },
        gridItem: {
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            flexGrow: 1,
        },
    })
);

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