import useTheme from "../hooks/useTheme";
import { useSelector } from "react-redux";
import { useLayoutEffect, useMemo } from "react";
import { ThemeProvider } from "@mui/material";
import PropTypes from "prop-types";
export default function ConfigAppProvider({ children }) {
  const lang = useSelector((store) => store.app.lang);
  const theme = useTheme();
  const bgcolor = useMemo(() => theme.palette.background.default, [theme]);

  useLayoutEffect(() => {
    document.head.parentElement.lang = lang;
    document.head.parentElement.style.backgroundColor = bgcolor;
    document.body.style.backgroundColor = bgcolor;
  }, [lang, bgcolor]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

ConfigAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
