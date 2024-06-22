import { createTheme } from "@mui/material/styles";
import { teal, cyan } from "@mui/material/colors";

export enum Colors {
    DIRTY_WHITE = "#D9D9D9",
    FADED_WHITE = "#6A737D",
    HIGHLIGHT_GREY = "#37373C",
    GREY = "#2A2A2A",
    DARK_GREY = "#1F1F1F",
    DARKER_GREY = "#181818",
    LIGHT_BLUE = "#94CFEF",
    LIGHT_PURPLE = "#C586C0",
    HIGHLIGHT_YELLOW = "#FFD602",
}

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: Colors.LIGHT_BLUE,
        },
        secondary: {
            main: Colors.LIGHT_PURPLE,
        },
        background: {
            default: Colors.DARK_GREY,
            paper: Colors.DARKER_GREY,
        },
        text: {
            primary: Colors.DIRTY_WHITE,
            secondary: Colors.FADED_WHITE,
        },
    },
    typography: {
        fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            color: Colors.LIGHT_BLUE,
            textShadow: `0 0 10px ${Colors.LIGHT_BLUE}`,
        },
        h2: {
            color: Colors.LIGHT_BLUE,
            textShadow: `0 0 8px ${Colors.LIGHT_BLUE}`,
        },
    },
});
