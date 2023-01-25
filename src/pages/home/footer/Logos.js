import { 
    Box as MuiBox,
    Stack 
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import _logo_ministere_budget from '../../../assets/logo_ministere_budget.webp';
import _logo_geid from '../../../assets/geid_logo_white_middle.webp';
//import _logo_dantic from '../../../assets/dantic_logo_white.webp';

export default function Logos() {
    const classes = useStyles();
    return (
        <Stack
            flex={1} 
            justifyContent="center" 
            alignItems="center" 
            display="flex" 
            flexDirection="column"
            spacing={2}
            sx={{
                mb: {
                    xs: 5,
                    lg: 0,
                }
            }}
        >
            <MuiBox
                component="img"
                src={_logo_ministere_budget}
                className={classes.logo}
                draggable={false}
                sx={{ userSelect: 'none'}}
            />
            <MuiBox
                component="img"
                src={_logo_geid}
                className={classes.gied}
                draggable={false}
                sx={{ userSelect: 'none'}}
            />
        </Stack>
    );
}

const useStyles = makeStyles((theme) => 
    createStyles({
        logo: {
            height: 130,
        },
        dnatic: {
            height: 100,
        },
        gied: {
            width: 150,
        },
    })
);