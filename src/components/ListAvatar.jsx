import { Avatar } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { colorFromId } from "../utils/color";
import SignalBadge from "./SignalBadge";
import { useLayoutEffect } from "react";
import { axios } from "../hooks/useAxios";

const ListAvatar = ({
  src,
  id,
  active,
  status,
  invisible = true,
  SignalBadgeProps,
  sx,
  ...otherProps
}) => {
  const style = useMemo(() => colorFromId(id), [id]);
  const key = `app.downloads.images.${id}`;
  const [url, setUrl] = useState(() => getData(key));

  useLayoutEffect(() => {
    const downloadImage = async () => {
      const response = await axios.get(src, { responseType: "blob" });
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const uri = URL.createObjectURL(blob);
      setUrl(uri);
      setData(key, uri);
    };
    if (src && !url) downloadImage();
  }, [src, url, key]);

  return (
    <SignalBadge
      variant='dot'
      active={active}
      status={status}
      invisible={active ? false : invisible}
      sx={{ position: "relative", ...SignalBadgeProps?.sx }}
      {...SignalBadgeProps}>
      {!url && <Avatar sx={{ ...style, ...sx }} {...otherProps} key={id} />}
      {src && (
        <Avatar
          src={url}
          sx={{
            opacity: url ? 1 : 0,
            ...(!url && {
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: "100%",
              height: "100%",
              zIndex: -10,
            }),
            transition: (theme) =>
              theme.transitions.create("opacity", {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.enteringScreen,
              }),
            ...sx,
          }}
          slotProps={{ img: { loading: "lazy" } }}
          {...otherProps}
        />
      )}
    </SignalBadge>
  );
};

ListAvatar.propTypes = {
  src: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  active: PropTypes.bool,
  status: PropTypes.oneOf(["online", "offline", "away"]),
  invisible: PropTypes.bool,
  SignalBadgeProps: PropTypes.object,
  sx: PropTypes.object,
};

const data = {};
const getData = (key) => data?.[key];
const setData = (key, value) => {
  data[key] = value;
};

export default ListAvatar;
