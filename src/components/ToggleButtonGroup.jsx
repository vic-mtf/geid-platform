import { styled } from "@mui/material/styles";
import MuiToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: "1px solid transparent",
    borderRadius: theme.shape.borderRadius,

    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: "1px solid transparent",
      [`&.${toggleButtonGroupClasses.selected}`]: {
        background: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
      },
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
    },
}));

export default ToggleButtonGroup;
