import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CSButton from '../../util/CSButton';

//mui islevleri
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import MUIRichTextEditor from 'mui-rte';

//redux
import { connect } from 'react-redux';
import { postPost, clearErrors } from '../../redux/actions/dataActions';

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

class Posto extends Component {
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
    handleChange = name => (event) => {
        this.setState({ [name]: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postPost({ body: this.state.body })
    };

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;
        return (
            <Fragment>
                <CSButton onClick={this.handleOpen} tip="post a post">
                    <AddIcon />
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
                            <MUIRichTextEditor
                                label="Neler Oluyor?"
                                name="body"
                                type="text"
                                multiline
                                rows="3"
                                placeholder="Dilediğini yazabilirsin..."
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                onChange={this.handleChange}
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


Posto.propTypes = {
    postPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, { postPost, clearErrors })(withStyles(styles)(Posto));