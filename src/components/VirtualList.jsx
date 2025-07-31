import { Box, List, Stack, Zoom, Typography, Fade } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import scrollBarSx from "../utils/scrollBarSx";
import { VList } from "virtua";

const VirtualList = ({ data, emptyMessage }) => {
  const [showBoxShadow, setShowBoxShadow] = useState(false);

  return (
    <Box
      overflow='hidden'
      height='100%'
      sx={{
        position: "relative",
        boxShadow: (theme) =>
          `inset 0 5px 5px -5px ${
            showBoxShadow ? theme.palette.divider : "transparent"
          }`,
        "& *": { ...scrollBarSx, scrollbarGutter: "unset" },
        "& > div": {
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          left: 0,
        },
      }}>
      <Zoom unmountOnExit in={data.length === 0} appear={false}>
        <Stack>
          <Typography color='text.secondary'>{emptyMessage}</Typography>
        </Stack>
      </Zoom>
      <Fade in={data.length > 0} unmountOnExit appear={false}>
        <div style={{ height: "100%" }}>
          <List
            component={VList}
            onScroll={(scrollTop) => {
              if (showBoxShadow && scrollTop <= 0) setShowBoxShadow(false);
              if (!showBoxShadow && scrollTop > 0) setShowBoxShadow(true);
            }}>
            {data}
          </List>
        </div>
      </Fade>
    </Box>
  );
};

VirtualList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.node),
  emptyMessage: PropTypes.string,
};

export default React.memo(VirtualList);
