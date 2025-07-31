import { useMediaQuery, useTheme } from "@mui/material";

const useSmallScreen = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return matches;
};

export default useSmallScreen;
