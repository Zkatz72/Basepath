import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#142433",
    },
    secondary: {
      main: "#223e58",
    },
    tertiary: {
      main: "#4C7193",
    },
    quartenary: {
      main: "#e26b30",
    },
    quinary: {
      main: "#ffa06c",
    },
    error: {
      main: "#cb7b7b",
    },
    success: {
      main: "#7bcb7b",
    },
    sextary: {
      main: "#000",
    },
    text: {
      main: "#fff",
    },
    bar: {
      main: "#fff",
    },
    icon: {
      main: "#fff",
    },
    bord: {
      main: "#fff",
    },
    infor: {
      main: "#808080",
    },
  },
});

export const lightTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#e6e6e6",
    },
    tertiary: {
      main: "#4c7193",
    },
    quartenary: {
      main: "#45864a",
    },
    quinary: {
      main: "#56a85d",
    },

    sextary: {
      main: "#142433",
    },
    text: {
      main: "#000",
    },
    bar: {
      main: "#000",
    },
    icon: {
      main: "#808080",
    },
    bord: {
      main: "#000",
    },
    infor: {
      main: "#808080",
    },
  },
});
