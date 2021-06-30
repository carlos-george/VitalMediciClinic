import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import './styles/global.css';
import { Routes } from './routes';
import { AuthContextProvider } from './context/AuthContext';
import { Router } from 'react-router-dom';
import history from './utils/history';


const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ED8130',
    },
    secondary: {
      main: '#02a898',
    },
  },
  typography: {
    button: {
      fontSize: 20,
    }
  },
  overrides: {
    MuiButton: {
      label: {
        color: "#f1f1f1",
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <AuthContextProvider>
          <Router history={history}>
            <Routes />
          </Router>
        </AuthContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
