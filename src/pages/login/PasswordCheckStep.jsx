import {
  Alert,
  Avatar,
  Box,
  Chip,
  Fade,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import PropTypes from "prop-types";
import React, { useState } from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useRef } from "react";

const PasswordCheckStep = ({
  register,
  //user,
  required,
  serverError,
  handleChange,
  watch,
  error,
}) => {
  const messageRef = useRef(null);
  // const matches = useSmallScreen();
  const email = watch("email");

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

const InputPassword = React.forwardRef(
  ({ error, label, fullWidth, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMousePassword = (event) => event.preventDefault();

    return (
      <div>
        <FormControl
          // sx={{ m: 1 }}
          variant='outlined'
          fullWidth={fullWidth}
          error={!!error}>
          <InputLabel htmlFor='input-adornment-password'>{label}</InputLabel>
          <OutlinedInput
            error={!!error}
            {...props}
            slotProps={
              {
                //input: {  },
              }
            }
            ref={ref}
            id='input-adornment-password'
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMousePassword}
                  onMouseUp={handleMousePassword}
                  edge='end'>
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label={label}
          />
        </FormControl>
        <Fade in={!!error} style={{ height: 20 }}>
          <FormHelperText error>{error?.message}</FormHelperText>
        </Fade>
      </div>
    );
  }
);

InputPassword.propTypes = {
  error: PropTypes.object,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
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
