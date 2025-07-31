import React, { useEffect, useState } from "react";
import { Box, alpha } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../redux/data/data";
import { useCallback } from "react";

const BlinkWrapper = ({ children, blinked = false, onBlinkEnd }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (blinked) {
      setActive(true);
      const timer = setTimeout(() => {
        setActive(false);
        if (typeof onBlinkEnd === "function") {
          onBlinkEnd();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [blinked, onBlinkEnd]);

  return (
    <Box
      component='div'
      sx={{
        "@keyframes blinkEffect": {
          "0%": {
            bgcolor: (t) => alpha(t.palette.primary.main, 0.5),
          },
          "100%": {
            bgcolor: (t) => alpha(t.palette.primary.main, 0),
          },
        },
        position: "relative",
        animation: active ? "blinkEffect 2s ease-out forwards" : "none",
      }}>
      {children}
    </Box>
  );
};

const ItemWrapper = ({ children, id, location: lc }) => {
  const blinked = useSelector((store) => store.data.app.actions[lc]?.blink[id]);
  const dispatch = useDispatch();
  const onBlinkEnd = useCallback(
    () =>
      dispatch(
        updateData({
          key: `app.actions.${lc}.blink.${id}`,
          data: false,
        })
      ),
    [id, lc, dispatch]
  );
  return (
    <BlinkWrapper blinked={blinked} onBlinkEnd={onBlinkEnd}>
      {children}
    </BlinkWrapper>
  );
};

export const ItemWrapperFocus = React.memo(ItemWrapper);

ItemWrapper.propTypes = {
  children: PropTypes.node,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  location: PropTypes.string,
};

BlinkWrapper.propTypes = {
  children: PropTypes.node,
  blinked: PropTypes.bool,
  onBlinkEnd: PropTypes.func,
};

export default React.memo(BlinkWrapper);
