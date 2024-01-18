import { Avatar as MuiAvatar, styled } from "@mui/material";

const Avatar = styled(MuiAvatar)(({theme}) => ({
  borderRadius: 4,
  //  border: `2px solid ${theme.palette.background.paper}`
}));

Avatar.defaultProps = {
    variant: 'rounded',
}

export default Avatar;