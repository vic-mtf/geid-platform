import { styled, Box as MuiBox } from "@mui/material";

const Box = styled(MuiBox)(() => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
}));

export default Box;