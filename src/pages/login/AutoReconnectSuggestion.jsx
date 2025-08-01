import {
  Box,
  ListItemAvatar,
  ListItemButton,
  Typography,
  ListItemText,
  Divider,
  Fade,
  Alert,
} from "@mui/material";
import ListAvatar from "../../components/ListAvatar";
import PropTypes from "prop-types";
import getFullName from "../../utils/getFullName";
import setLoginData from "./setLoginData";
import { useState } from "react";
import { useRef } from "react";

const AutoReconnectSuggestion = ({
  //register,
  user,
  serverError,
  checkSession,
  handleChange,
}) => {
  const [isError, setIsError] = useState(false);
  const messageRef = useRef(null);

  if (isError)
    messageRef.current =
      serverError?.status === 404
        ? "Ce profil n'existe plus. Veuillez vous reconnecter avec un autre compte."
        : "Une erreur est survenue. Veuillez réessayer.";

  return (
    <Box display='flex' flexDirection='column'>
      <Typography p={2}>
        Ce profil a été utilisé précédemment sur cet appareil. Voulez-vous
        poursuivre avec ce compte ?
      </Typography>
      <Divider variant='middle' />
      <ListItemButton
        onClick={async () => {
          if (isError) setIsError(false);
          let isValid = await checkSession({
            type: "token",
            value: user?.token,
          });
          if (isValid) setLoginData(user);
          else {
            isValid = await checkSession({
              type: "email",
              value: user?.email,
            });
            if (isValid) handleChange(2);
            else setIsError(true);
          }
        }}>
        <ListItemAvatar>
          <ListAvatar src={user?.image} id={user?.id}>
            {user?.firstName?.charAt(0)}
          </ListAvatar>
        </ListItemAvatar>
        <ListItemText
          primary={getFullName(user)}
          secondary={user?.email}
          slotProps={{
            secondary: {
              color: "text.secondary",
            },
          }}
        />
      </ListItemButton>

      <Fade in={serverError && isError} appear={false} unmountOnExit>
        <Alert severity='error' sx={{ m: 1 }}>
          {messageRef.current}
        </Alert>
      </Fade>
    </Box>
  );
};

AutoReconnectSuggestion.propTypes = {
  register: PropTypes.func.isRequired,
  user: PropTypes.object,
  serverError: PropTypes.object,
  checkSession: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AutoReconnectSuggestion;
