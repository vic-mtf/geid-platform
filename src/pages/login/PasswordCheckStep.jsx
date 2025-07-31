import {
  Alert,
  Avatar,
  Box,
  Checkbox,
  Chip,
  Fade,
  FormControlLabel,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import PropTypes from "prop-types";
import React, { useState } from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useRef } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

const PasswordCheckStep = ({
  register,
  //user,
  required,
  serverError,
  handleChange,
  watch,
  error,
}) => {
  const { search } = useLocation();
  const defaultEmail = useMemo(() => {
    try {
      const { email } = queryString.parse(search);
      return email;
    } catch (error) {
      console.error(error);
      return "";
    }
  }, [search]);
  const messageRef = useRef(null);

  const email = useMemo(() => {
    return defaultEmail || watch("email");
  }, [defaultEmail, watch]);

  if (serverError)
    messageRef.current = [400, 401].includes(serverError?.status)
      ? "Le mot de passe que vous avez saisi est incorrect. Veuillez le vérifier et réessayer"
      : "Une erreur est survenue. Veuillez réessayer plus tard";

  return (
    <Box px={2} display='flex' flexDirection='column' gap={2}>
      <div>
        <Typography align='center'>Bienvenue </Typography>
        <Typography align='center'>
          <Chip
            label={email}
            avatar={<Avatar />}
            onClick={() => handleChange(-1)}
            variant='filled'
            deleteIcon={<ExpandMoreOutlinedIcon />}
            onDelete={() => null}
          />
        </Typography>
        <Typography mt={2}>
          Pour continuer, veuillez confirmer votre identité
        </Typography>
      </div>

      <InputPassword
        label='Mot de passe'
        {...register("password", {
          required: required && "Le mot de passe est requis",
        })}
        error={error}
        fullWidth
      />
      <Fade in={!!serverError}>
        <Alert severity='error'>{messageRef.current}</Alert>
      </Fade>
    </Box>
  );
};

const InputPassword = React.forwardRef(({ error, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <div>
        <TextField
          ref={ref}
          {...props}
          type={showPassword ? "text" : "password"}
          autoComplete='off'
          error={!!error}
        />
        <Fade in={!!error} style={{ height: 20 }}>
          <FormHelperText error>{error?.message}</FormHelperText>
        </Fade>
      </div>

      <FormControlLabel
        control={
          <Checkbox
            checked={showPassword}
            icon={<VisibilityOffOutlinedIcon />}
            checkedIcon={<VisibilityOutlinedIcon />}
            onChange={() => setShowPassword(!showPassword)}
          />
        }
        label={"Afficher le mot de passe"}
      />
    </div>
  );
});

InputPassword.propTypes = {
  error: PropTypes.object,
};

InputPassword.displayName = "InputPassword";

PasswordCheckStep.propTypes = {
  register: PropTypes.func.isRequired,
  user: PropTypes.object,
  serverError: PropTypes.object,
  handleChange: PropTypes.func,
  watch: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.object,
};

export default PasswordCheckStep;
