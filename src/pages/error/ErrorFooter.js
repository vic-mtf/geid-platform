import { Stack } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import Typography from "../../components/Typography";

export default function ErrorFooter () {
    const classes = useStyles();
    return (
        <Stack className={classes.container} direction="row" spacing={3}>
            {
                links.map((link, index) => (
                    <Typography
                        color="inherit" 
                        variant="caption"
                        key={index}
                    >{link.title}</Typography>  
                ))
            }
            <Typography 
                color="text.secondary" 
                variant='caption'
            >Dantic &copy; 2021</Typography> 
        </Stack>
    );
}

const links = [
    {
        title: 'Accueil',
        href: '',
    },
    {
        title: 'Règle et confidentialité',
        href: '',
    },
    {
        title: 'Aide',
        href: '',
    }
];

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10
    },
  }));
