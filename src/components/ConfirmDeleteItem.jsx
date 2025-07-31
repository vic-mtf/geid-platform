import React, { useEffect, useMemo } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../redux/data/data";
import ListAvatar from "./ListAvatar";
import getFullName from "../utils/getFullName";
import PropTypes from "prop-types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useCallback } from "react";

const ConfirmDeleteItem = ({ description, title, location, deleteButton }) => {
  const { open, user } = useSelector(
    (store) => store.data.app.actions[location]?.confirmDelete
  );
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(
      updateData({
        key: `app.actions.${location}.confirmDelete.open`,
        data: false,
      })
    );
  }, [dispatch, location]);

  const item = useMemo(
    () => ({
      data: { name: getFullName(user), ...user },
      onClose: handleClose,
    }),
    [user, handleClose]
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={`alert-dialog-delete-${location}`}
      aria-describedby={`alert-dialog-confirm-delete-${location}`}>
      <Toolbar>
        <ListAvatar src={user?.image} alt={name} id={user?.id}>
          {item.data.name?.charAt(0)}
        </ListAvatar>
        <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
          {(typeof title === "function" ? title(item) : title) || "Suppression"}
        </Typography>
        <IconButton
          edge='end'
          color='inherit'
          aria-label='close'
          onClick={handleClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </Toolbar>
      <DialogContent sx={{ p: 2 }}>
        <DialogContentText id={`alert-dialog-confirm-delete-${location}`}>
          {typeof description === "function" ? description(item) : description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {typeof deleteButton === "function" ? deleteButton(item) : deleteButton}
      </DialogActions>
    </Dialog>
  );
};

ConfirmDeleteItem.propTypes = {
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  location: PropTypes.string,
  deleteButton: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
};

export default React.memo(ConfirmDeleteItem);
