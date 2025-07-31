import React from "react";
import ListAvatar from "./ListAvatar";
import useListenRemoteUserStatus from "../hooks/events/useListenRemoteUserStatus";
import PropTypes from "prop-types";

const AvatarStatus = React.memo(({ id, ...otherProps }) => {
  const status = useListenRemoteUserStatus(id);

  return (
    <ListAvatar
      {...otherProps}
      status={status === "online" ? status : "offline"}
      id={id}
    />
  );
});

AvatarStatus.displayName = "AvatarStatus";
AvatarStatus.propTypes = {
  src: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  active: PropTypes.bool,
  invisible: PropTypes.bool,
  SignalBadgeProps: PropTypes.object,
  sx: PropTypes.object,
};
export default AvatarStatus;
