import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Comments({ comments }) {
  const classes = useStyles();

  const [commentsList, setCommentsList] = useState(<h3>Loading</h3>);

  useEffect(() => {
    setCommentsList(
      comments &&
        comments.map((comment, key) => {
          const {
            displayName,
            cmtText,
            cmtDate,
            cmtLikesCount,
            cmtDislikesCount,
          } = comment;
          return (
            // <ListItem alignItems="flex-start">
            //   <ListItemAvatar>
            //     <Avatar aria-label="recipe">{displayName.charAt(0)}</Avatar>
            //   </ListItemAvatar>

            //   <ListItemText
            //     primary={displayName}
            //     secondary={<React.Fragment>{cmtText}</React.Fragment>}
            //   />
            //   <br />
            //   <ListItemSecondaryAction>
            //     <IconButton aria-label="like">
            //       <ThumbUpIcon fontSize="small" />
            //     </IconButton>
            //     {cmtLikesCount}
            //     <IconButton aria-label="unlike">
            //       <ThumbDownIcon fontSize="small" />
            //     </IconButton>
            //     {cmtDislikesCount}
            //   </ListItemSecondaryAction>
            //   {'\n'}
            //   <ListItemText primary="reply" />
            // </ListItem>
            <Grid container wrap="nowrap" spacing={2} key={key}>
              <Grid item>
                <Avatar aria-label="recipe">{displayName.charAt(0)}</Avatar>
              </Grid>
              <Grid item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: 'left' }}>{displayName}</h4>
                <p style={{ textAlign: 'left' }}>{cmtText}</p>
                <p style={{ textAlign: 'left', color: 'gray' }}>
                  {`${moment(cmtDate).fromNow(true)} ago`}
                </p>
                <p style={{ textAlign: 'left', color: 'gray' }}>
                  <IconButton aria-label="like">
                    <ThumbUpIcon fontSize="small" />
                  </IconButton>
                  {cmtLikesCount}
                  <IconButton aria-label="unlike">
                    <ThumbDownIcon fontSize="small" />
                  </IconButton>
                  {cmtDislikesCount}

                  {'\tReply'}
                </p>
              </Grid>
            </Grid>
          );
        })
    );
  }, []);

  return (
    <List className={classes.root}>
      {commentsList}
      <Divider variant="inset" component="li" />
    </List>
  );
}
