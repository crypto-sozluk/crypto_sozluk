import React, { Component } from 'react'
import CSButton from '../../util/CSButton';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

//icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

//redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
    likedPost = () => {
        if (this.props.user.likes && this.props.user.likes.find((like) => like.postId === this.props.postId))
            return true;
        else return false;
    };
    likePost = () => {
        this.props.likePost(this.props.postId);
    }
    unlikePost = () => {
        this.props.unlikePost(this.props.postId);
    }
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <CSButton tip="Like">
                    <FavoriteBorder color="primary" />
                </CSButton>
            </Link>
        ) : this.likedPost() ? (
            <CSButton tip="Undo Like" onClick={this.unlikePost}>
                <FavoriteIcon color="primary" />
            </CSButton>
        ) : (
            <CSButton tip="Like" onClick={this.likePost}>
                <FavoriteBorder color="primary" />
            </CSButton>
        );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);