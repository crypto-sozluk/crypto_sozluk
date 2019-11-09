import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//components
import Navbar from './components/Navbar';

//sayfalar
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

function App() {
  return (
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
  );
}

export default App;
