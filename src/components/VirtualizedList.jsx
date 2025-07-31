import { Box, List as MUIList, Stack, Zoom, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import { useState } from "react";
import scrollBarSx from "../utils/scrollBarSx";

const VirtualizedList = React.memo(
  ({ data, itemContent, rowHeight, emptyMessage, containerStyle }) => {
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
        }}>
        {data.length === 0 ? (
          <Zoom
            unmountOnExit
            in
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: 0,
              left: 0,
            }}>
            <Stack>
              <Typography color='text.secondary'>{emptyMessage}</Typography>
            </Stack>
          </Zoom>
        ) : (
          <AutoSizer>
            {({ width, height }) => (
              <List
                height={height}
                width={width}
                rowCount={data.length}
                rowHeight={rowHeight}
                rowRenderer={itemContent}
                scrollToIndex={0}
                noContentRenderer={MUIList}
                style={{ overflowX: "hidden" }}
                containerStyle={containerStyle}
                onScroll={({ scrollTop }) => {
                  if (showBoxShadow && scrollTop <= 0) setShowBoxShadow(false);
                  if (!showBoxShadow && scrollTop > 0) setShowBoxShadow(true);
                }}
              />
            )}
          </AutoSizer>
        )}
      </Box>
    );
  }
);

VirtualizedList.displayName = "VirtualizedList";
VirtualizedList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  itemContent: PropTypes.func,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  containerStyle: PropTypes.object,
  emptyMessage: PropTypes.string,
};

export default VirtualizedList;
