import React from "react";
import { Box, Typography, createTheme } from "@mui/material";
import ListAvatar from "../components/ListAvatar";
import PropTypes from "prop-types";

const NoticeSnack = ({ name, id, message, src, inline }) => {
  const theme = createTheme({ palette: { mode: "light" } });
  return (
    <Box
      display='flex'
      flexDirection='row'
      gap={2}
      alignItems='flex-start'
      maxWidth={320}>
      <Box>
        <ListAvatar id={id} src={src}>
          {name?.charAt(0)}
        </ListAvatar>
      </Box>
      <Box>
        <Typography
          color={theme.palette.text.primary}
          variant='body1'
          component={inline ? "span" : "div"}>
          {name}
        </Typography>{" "}
        <Typography
          color={theme.palette.text.secondary}
          variant='body2'
          component={inline ? "span" : "div"}>
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

NoticeSnack.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  message: PropTypes.string,
  src: PropTypes.string,
  inline: PropTypes.bool,
};
export default React.memo(NoticeSnack);
