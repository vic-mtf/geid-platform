import { 
    CardActionArea,
    CardContent, 
    CardMedia, 
    Grid, 
    Menu,
    Stack
} from '@mui/material';
import { useSelector } from 'react-redux';
import Typography from '../../../components/Typography';
import checkAuth from '../../../utils/checkAuth';
//import inArray from '../../../utils/inArray';
import appsList from './appsList';

export default function AppsMenu ({anchorEl, onClose}) {
    const auth = useSelector(store => store?.user?.auth);
    
    return (
        <Menu 
            id="_apps" 
            anchorEl={anchorEl} 
            keepMounted 
            open={Boolean(anchorEl)} 
            onClose={onClose}
            PaperProps={{
                sx: {
                    bgcolor: theme => theme.palette.background.paper + 
                    theme.customOptions.opacity,
                    border: theme => `1px solid ${theme.palette.divider}`,
                    height: 400,
                    width: 300,
                    backdropFilter: theme => `blur(${theme.customOptions.blur})`
                }
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
          <CardContent component="div">
            <Grid container spacing={1} component="div" >
                {appsList.map((app, index) => 
                    checkAuth(auth, app.permissions) && 
                    (
                    <Grid 
                        item 
                        xs={4} 
                        display="flex" 
                        justifyContent="center" 
                        key={index}
                        component="div"
                        position="relative" 
                        height={90}
                    >
                        <CardActionArea
                            sx={{borderRadius: 1, position: 'absolute'}}
                            LinkComponent={app.component || "a"}
                            href={app.href}
                            title={app.name}
                        >
                            <Stack
                                display="flex"
                                m={.25}
                                alignItems="center"
                                spacing={.2}
                                component="div"
                                sx={{
                                    "& .app-name": {
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        width: 60
                                    },
                                    "&: hover": {
                                        zIndex: theme => theme.zIndex.tooltip,
                                        "& .app-name": {
                                            whiteSpace: 'normal',
                                            overflow: 'visible',
                                            textOverflow: 'clip',
                                            width: 'auto'
                                        }
                                    }
                                }}
                            >
                                
                                    <CardMedia
                                            component="img"
                                            src={app.src}
                                            srcSet={app.src}
                                            draggable={false}
                                            sx={{
                                                height: 60,
                                                width: 60,
                                            }}
                                    />
                                    <Typography
                                        align="center"
                                        variant="caption"
                                        className='app-name'
                                    >{app.name}</Typography> 
                            </Stack>
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>
          </CardContent>
        </Menu>
    );
}