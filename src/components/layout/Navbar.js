import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CSButton from '../../util/CSButton';
import PostPost from '../post/PostPost';

// material-ui islevleri
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostPost />
                            <Link to="/">
                                <CSButton tip="home">
                                    <HomeIcon />
                                </CSButton>
                            </Link>
                            <CSButton tip="Notifications">
                                <Notifications />
                            </CSButton>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/login">Giris</Button>
                                <Button color="inherit" component={Link} to="/">Anasayfa</Button>
                                <Button color="inherit" component={Link} to="/signup">Uye ol</Button>
                            </Fragment>
                        )}
                </Toolbar>
            </AppBar>
        );
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);