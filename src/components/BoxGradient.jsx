import { Box, styled } from "@mui/material";

const BoxGradient = styled(Box, {
  shouldForwardProp: (prop) => prop !== "colors",
})(({ colors = ["#0095c940", "#fff24b40", "#db383240"] }) => ({
  display: "flex",
  flex: 1,
  overflow: "hidden",
  flexDirection: "column",
  background: colors
    .map(
      (color, index) =>
        `linear-gradient(${
          (360 / colors.length) * index
        }deg, ${color}, transparent 70.71%)`
    )
    .join(","),
}));

export default BoxGradient;
