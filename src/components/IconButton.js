import { styled, ToggleButton } from "@mui/material";

const IconButton = styled(ToggleButton)(() => ({
   // textTransform: 'none',
   border: 'none',
   '&:disabled': {
      border: 'none',
   }
}));

export default IconButton;
IconButton.defaultProps = {
   size: 'small',
   value: ''
};