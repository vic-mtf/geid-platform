import {
  Box,
  TextField,
  Typography,
  FormHelperText,
  Fade,
  Link,
  Alert,
} from "@mui/material";
import PropTypes from "prop-types";
import { useRef } from "react";

const EmailCheckStep = ({
  register,
  user,
  error,
  serverError,
  required,
  handleChange,
}) => {
  const messageRef = useRef(null);

  if (serverError)
    messageRef.current =
      serverError?.status === "404"
        ? `Cette adresse email ne semble pas être associée à un compte. Veuillez vérifier l’orthographe ou en utiliser une autre.`
        : "Une erreur est survenue lors de la vérification de l’adresse email. Veuillez réessayer plus tard.";

  return (
    <Box px={2} display='flex' flexDirection='column' gap={2}>
      <Typography>
        Veuillez renseigner votre adresse email afin de vérifier si un compte
        est associé à celle-ci.
      </Typography>
      <div>
        <TextField
          error={!!error}
          label='Adresse email'
          type='email'
          {...register("email", {
            required: required && "Veuillez renseigner votre adresse email",
          })}
          fullWidth
        />
        <Fade in={!!error} style={{ height: 20 }}>
          <FormHelperText error>{error?.message}</FormHelperText>
        </Fade>
      </div>
      {user && (
        <Typography>
          Reprendre votre session avec le compte{" "}
          <Link
            underline='none'
            href='#'
            onClick={(e) => {
              e.preventDefault();
              handleChange(-1);
            }}>
            {user?.email}
          </Link>{" "}
          détecté sur cet appareil.
        </Typography>
      )}
      <Fade in={Boolean(serverError)}>
        <Alert severity='error'>
          <Typography>{messageRef.current}</Typography>
        </Alert>
      </Fade>
    </Box>
  );
};

EmailCheckStep.propTypes = {
  register: PropTypes.func.isRequired,
  user: PropTypes.object,
  error: PropTypes.object,
  serverError: PropTypes.object,
  required: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

export default EmailCheckStep;
