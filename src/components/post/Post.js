import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/tr'
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import CSButton from '../../util/CSButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';

//mui islevleri
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//icons
import ChatIcon from '@material-ui/icons/InsertComment';

//redyx
import { connect } from 'react-redux';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 100,
        width: 100,
        height: 100,
        maxWidth: '100%',
        objectFit: 'cover',
        borderRadius: '50%',
        margin:'2%'
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class Post extends Component {

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            post: {
                body,
                createdAt,
                userImage,
                userHandle,
                postId,
                likeCount,
                commentCount
            },
            user: {
                authenticated,
                credentials: { handle }
            }
        } = this.props;

        const deleteButton = authenticated && userHandle === handle ? (
            <DeletePost postId={postId} />
        ) : null

        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="profile fotografi"
                    className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).locale('tr').fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton postId={postId} />
                    <span>{likeCount} Begeniler</span>
                    <CSButton tip="yorumlar" >
                        <ChatIcon color="primary" />
                    </CSButton>
                    <span>{commentCount} yorumlar</span>
                    <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
            </Card>
        );
    }
}

Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}


const mapStateToProps = (state) =>  ({
    user: state.user
})
export default connect(mapStateToProps)(withStyles(styles)(Post));