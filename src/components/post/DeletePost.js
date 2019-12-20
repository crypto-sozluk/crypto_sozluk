import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import CSButton from '../../util/CSButton';

//mui islevleri
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import {deletePost} from '../../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        top: '10%',
        left: '90%'
    }
}

class DeletePost extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    deletePost = () => {
        this.props.deletePost(this.props.postId);
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CSButton 
                tip="Post'u hemen sil"
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}
                >
                <DeleteOutline color="secondary"/>
                </CSButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                    >
                        <DialogTitle>
                            Bu postu silmek istediğine emin misin
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Iptal et
                            </Button>
                            <Button onClick={this.deletePost} color="secondary">
                                Sil
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>
        );
    }
}

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}


export default connect(null, {deletePost})(withStyles(styles)(DeletePost));
