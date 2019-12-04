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

//redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions'


const styles = (theme) => ({
    ...theme.spreadThis,
    paperHash: {
        marginTop: '25%',
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
                    <Grid item xs={12} md={6}></Grid>
                        <Typography variant="h6" className={classes.title}>
                            Hashtags
                         </Typography>
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
