import {createTheme} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#339caa', // Цвет кнопок и форм
    },
    secondary: {
      main: '#d6c9b3',
    },
    text: {
      primary: '#b49b75', // Цвет текста
    },
    background: {
      default: '#ededed', // Цвет фона
    },
  },
  typography: {
    fontFamily: 'Playfair Display , sans-serif',
    fontSize: 16,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          marginBottom: '5px',
        },
      },
    },
    // MuiButton: {
    //   styleOverrides: {
    //     contained: {
    //       margin: '2px',
    //       color: '#fff',
    //       '&:hover': {
    //         backgroundColor: '#424242',
    //       },
    //     },
    //   },
    // },
  },
});

export default theme;