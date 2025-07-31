import { useTheme } from "@mui/material";

export default function useShadow () {
    const theme = useTheme();
    return `inset 0 5px 5px -5px ${theme.palette.divider}`;
}