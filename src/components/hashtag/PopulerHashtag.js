import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import ProfileSkeleton from '../../util/ProfileSkeleton';

// mui islevleri
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';


//redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions'


const styles = (theme) => ({
    ...theme.spreadThis,
    paperHash: {
        marginTop: '25%',
    },
    someHash: {
        padding: '5%',
        margin: '10%',
        maxWidth: '65%',
        minWidth: '65%'
    },
    hashTitle: {
        marginLeft: '65%'
    }
});

export class PopularHashtag extends Component {
    handleLogout = () => {
        this.props.logoutUser();
    };
    render() {
        const { classes, user: { loading, authenticated } } = this.props;
        let profileMarkup = !loading ? (authenticated ? (
            <div className={classes.paperHash}>
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" className={classes.hashTitle} gutterBottom> Hashtags </Typography>
                        <div className="chipsHash">
                        <Chip label="BTC" component="a" className={classes.someHash} href="#chip" clickable />
                        <Chip label="ETH" component="a" className={classes.someHash} href="#chip" clickable />
                        <Chip label="QKC" component="a" className={classes.someHash} href="#chip" clickable />
                        <Chip label="TRX" component="a" className={classes.someHash} href="#chip" clickable />
                        <Chip label="BNB" component="a" className={classes.someHash} href="#chip" clickable />
                        <Chip label="BTC/USDT" component="a" className={classes.someHash} href="#chip" clickable />
                        <Chip label="TETHERS" component="a" className={classes.someHash} href="#chip" clickable />
                        </div>
                    </Grid>
                </Paper>
            </div>
        ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        Sadece giriş yaptıktan sonra görebilirsin.
                    </Typography>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Giriş Yap
                    </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">
                            Kayıt Ol
                    </Button>
                    </div>
                </Paper>
            )) : (<ProfileSkeleton />)
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

PopularHashtag.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PopularHashtag))
