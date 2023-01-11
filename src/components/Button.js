import { styled, Button as MuiButton } from "@mui/material";

const Button = styled(MuiButton)(() => ({
    textTransform: 'none',
    borderRadius: 4,
}));

export default Button;
Button.defaultProps = {
 size: 'small',
}