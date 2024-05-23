import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Color primario
    },
    secondary: {
      main: '#673ab7', // Color secundario
    },
  },
  typography: {
    fontFamily: 'Roboto', // Tipografía base
  },
});

export default theme;
