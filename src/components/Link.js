import { styled, Typography as MuiTypography } from "@mui/material";

const Link = styled(MuiTypography)(({theme}) => ({
    textDecoration: 'none', 
    color: theme.palette.primary.main,
}));

Link.defaultProps = {
    variant: 'body2',
    component: 'a',
   // fontSize:13,
    fontWeight: 'bold',
}

export default Link;