import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
export const darkTheme = createTheme({
    
    palette: {
        mode: 'dark',
        primary: {
            main: '#142433',
        },
        secondary: {
            main: '#223e5b',
        },
        tertiary:{
            main:'#4C7193'
        },
        quartenary:{
            main:'#e26b30'
        },
        quinary:{
            main:'#ffa06c'
        },
        error: {
            main: red.A400,
        },
        sextary: {
            main: '#000',
        }
    },
});

export const lightTheme = createTheme({
    cssVariables: true,
    palette: {
        mode: 'light',
        primary: {
            main: '#142433',
        },
        secondary: {
            main: '#223e5b',
        },
        tertiary:{
            main:'#4c7193'
        },
        quartenary:{
            main:'#fff86e'
        },
        quinary:{
            main:'#fffabb'
        },
        error: {
            main: red.A400,
        },
        sextary: {
            main: '#142433',
        }
    },
});
