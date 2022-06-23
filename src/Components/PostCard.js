import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 100,
    paddingTop: '65%', // 16:9
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PostCard({
  displayName,
  postDate,
  coverURL,
  postText,
  likesCount,
  dislikesCount,
  cmtCount,
  postID,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {displayName.charAt(0)}
          </Avatar>
        }
        title={displayName}
        subheader={`${moment(postDate).fromNow(true)} ago`}
      />
      <CardMedia
        className={classes.media}
        image={coverURL}
        // title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {postText}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <ThumbUpIcon />
        </IconButton>
        {likesCount}
        <IconButton aria-label="unlike">
          <ThumbDownIcon />
        </IconButton>
        {dislikesCount}
      </CardActions>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          component={Link}
          to={`/post/${postID}`}
        >
          {`view all ${cmtCount} comments`}
        </Typography>
      </CardContent>
    </Card>
  );
}
