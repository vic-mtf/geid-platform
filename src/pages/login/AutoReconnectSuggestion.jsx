import {
  Box,
  ListItemAvatar,
  ListItemButton,
  Typography,
  ListItemText,
  Divider,
} from "@mui/material";
import ListAvatar from "../../components/ListAvatar";
import PropTypes from "prop-types";
import getFullName from "../../utils/getFullName";
import setLoginData from "./setLoginData";
import { useLocation, useNavigate } from "react-router-dom";

const AutoReconnectSuggestion = ({
  //register,
  user,
  serverError,
  checkSession,
  handleChange,
}) => {
  const { search } = useLocation();
  const navigateTo = useNavigate();

  return (
    <Box display='flex' flexDirection='column' gap={1}>
      <Typography px={2}>
        Ce profil a été utilisé précédemment sur cet appareil. Voulez-vous
        poursuivre avec ce compte ?
      </Typography>
      <Divider variant='middle' />
      <ListItemButton
        onClick={async () => {
          const isValid = await checkSession({
            type: "token",
            value: user?.token + 1,
          });
          console.log("isValid =>", isValid);
          if (isValid) setLoginData(user);
          else {
            handleChange(1);
            const params = new URLSearchParams(search);
            params.append("email", user?.email);
            navigateTo("/login?" + params.toString());
            handleChange(2);
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
