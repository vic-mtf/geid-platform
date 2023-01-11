import { styled, Typography as MuiTypography } from "@mui/material";

const Typography = styled(MuiTypography)(theme => ({}));
Typography.defaultProps = {
    variant: 'body2',
    component: 'div'
}
export default Typography;