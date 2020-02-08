import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CSButton from '../../util/CSButton';

//mui islevleri
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';

//redux
import { connect } from 'react-redux';
import { postPost, postSubPost, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        positions: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
})

class PostPost extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        };
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', open: false, errors: {} });
        }
    };

    handleOpen = () => {
        this.setState({ open: true })
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} })
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postPost({ body: this.state.body })
        this.props.postSubPost({ body: this.state.body })
    };

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;
        return (
            <Fragment>
                <CSButton onClick={this.handleOpen} tip="bir şey paylaş!">
                    <CreateIcon />
                </CSButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <CSButton tip="kapat" onClick={this.handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon />
                    </CSButton>
                        <DialogTitle>Birşeyler yaz...</DialogTitle>
                        <DialogContent>
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    name="body"
                                    type="text"
                                    label="Neler Oluyor?"
                                    multiline
                                    rows="3"
                                    placeholder="Dilediğini yazabilirsin..."
                                    error={errors.body ? true : false}
                                    helperText={errors.body}
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                                <TextField
                                    name="body"
                                    type="text"
                                    label="hangi coin?"
                                    multiline
                                    rows="3"
                                    placeholder="Dilediğini yazabilirsin..."
                                    error={errors.body ? true : false}
                                    helperText={errors.body}
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                                <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                    Gonder
                                        {loading && (
                                        <CircularProgress size={30} className={classes.progressSpinner} />
                                    )}
                                </Button>
                            </form>
                        </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostPost.propTypes = {
    postPost: PropTypes.func.isRequired,
    postSubPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, { postPost, postSubPost, clearErrors })(withStyles(styles)(PostPost));