import PropTypes from "prop-types";
import { Box, List } from "@mui/material";
import useScrollTop from "../hooks/useScrollTop";

const BoxScrollShadow = ({ children, sx, ...otherProps }) => {
  const [scrollTop, scrollProps] = useScrollTop();

  return (
    <Box
      {...scrollProps}
      {...otherProps}
      component={List}
      sx={{
        boxShadow: (theme) =>
          scrollTop > 0
            ? `inset 0 3px 5px -2.5px ${theme.palette.divider}`
            : "none",
        transition: "box-shadow 0.2s",
        overflow: "auto",
        ...sx,
      }}>
      {children}
    </Box>
  );
};

BoxScrollShadow.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
export default BoxScrollShadow;
