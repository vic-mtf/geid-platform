import { styled, Button as MuiButton } from "@mui/material";

const Button = styled(MuiButton)(() => ({
    textTransform: 'none',
}));

export default Button;
Button.defaultProps = {
 size: 'small',
}