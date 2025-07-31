import { Box, useTheme, CardHeader, Typography } from "@mui/material";
import logo_blue from "../../assets/geid_logo_blue.webp";
import logo_white from "../../assets/geid_logo_white.webp";
import React, { useMemo } from "react";

const LoginHeader = () => {
  const {
    palette: { mode },
  } = useTheme();
  const srcLogo = useMemo(
    () => (mode === "dark" ? logo_white : logo_blue),
    [mode]
  );

  return (
    <CardHeader
      sx={{ userSelect: "none", pointerEvents: "none" }}
      title={
        <Box>
          <Box component='img' src={srcLogo} srcSet={srcLogo} width='75%' />
          <Typography align='center' variant='h5'>
            Connexion
          </Typography>
        </Box>
      }></CardHeader>
  );
};

export default React.memo(LoginHeader);
