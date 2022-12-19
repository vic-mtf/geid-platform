import { styled, IconButton as MuiIconButton } from "@mui/material";

const IconButton = styled(MuiIconButton)(() => ({
   // textTransform: 'none',
}));

export default IconButton;
IconButton.defaultProps = {
 size: 'small',
}