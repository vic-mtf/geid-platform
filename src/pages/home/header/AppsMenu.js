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
import inArray from '../../../utils/inArray';
import appsList from './appsList';

export default function AppsMenu ({anchorEl, onClose}) {
    const permissions = useSelector(store => store?.user?.permissions || []);
  
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
            <Typography
                variant="h6"
                paragraph
                fontSize={15}
                fontWeight="bold"
            >Applications</Typography>
            <Grid container spacing={1} component="div" >
                {appsList.map((app, index) => 
                    inArray(
                       app.permissions,
                       permissions
                    ) && (
                    <Grid 
                        item 
                        xs={4} 
                        display="flex" 
                        justifyContent="center" 
                        key={index}
                        component="div"
                    >
                        <CardActionArea
                            sx={{borderRadius: 2}}
                            LinkComponent={app.component || "a"}
                            href={app.href}
                        >
                            <Stack
                                display="flex"
                                m={1}
                                alignItems="center"
                                spacing={.5}
                                component="div"
                            >
                                
                                    <CardMedia
                                            component="img"
                                            src={app.src}
                                            srcSet={app.src}
                                            draggable={false}
                                            sx={{
                                                height: 50,
                                                width: 50,
                                            }}
                                    />
                                    <Typography
                                        align="center"
                                        variant="caption"
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