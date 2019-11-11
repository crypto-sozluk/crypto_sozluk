import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// material-ui islevleri
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/login">Giris</Button>
                    <Button color="inherit" component={Link} to="/">Anasayfa</Button>
                    <Button color="inherit" component={Link} to="/signup">Uye ol</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navbar;