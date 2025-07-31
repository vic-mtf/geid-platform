import { alpha } from "@mui/material";

const scrollBarSx = {
  [`&::-webkit-scrollbar`]: {
    width: 6,
    height: 6,
  },
  [`&::-webkit-scrollbar-thumb`]: { backgroundColor: "transparent" },
  // [`&::-webkit-scrollbar-button`]: {
  //     bgcolor: 'red',
  //     cursor: 'pointer',
  // },
  [`&:hover`]: {
    [`&::-webkit-scrollbar-thumb`]: {
      backgroundColor: (theme) =>
        alpha(
          theme.palette.common[
            theme.palette.mode === "light" ? "black" : "white"
          ],
          0.2
        ),
      borderRadius: 0.5,
    },
    [`&::-webkit-scrollbar-thumb:hover`]: {
      backgroundColor: (theme) =>
        alpha(
          theme.palette.common[
            theme.palette.mode === "light" ? "black" : "white"
          ],
          0.4
        ),
    },
  },
};

export default scrollBarSx;
