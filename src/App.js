import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'; bu eskisi
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'; //bu olmazsa eskisini kullan
import createTheme from '@material-ui/core/styles/createMuiTheme';

//components
import Navbar from './components/Navbar';

//sayfalar
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }

});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <div className="App">
      <Router>
      <Navbar />
        <div className="container">
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/giris" component={login} />
          <Route exact path="/uyeol" component={signup} />
        </Switch>
        </div>
      </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
