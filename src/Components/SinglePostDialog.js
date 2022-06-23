import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import moment from 'moment';
import Comments from './Comments';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  paper: {
    height: 600,
  },
  cover: {
    width: 615,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SinglePostDialog({
  displayName,
  postDate,
  coverURL,
  postText,
  likesCount,
  dislikesCount,
  cmtCount,
  comments,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Container fixed>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Box
                  className={classes.cover}
                  component="img"
                  sx={
                    {
                      // height: 233,
                      // width: 350,
                      // maxHeight: { xs: 233, md: 167 },
                      // maxWidth: { xs: 350, md: 250 },
                    }
                  }
                  alt="The house from the offer."
                  src="https://source.unsplash.com/1024x768/?nature"
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        {displayName.charAt(0)}
                      </Avatar>
                    }
                    title={displayName}
                    subheader={`${moment(postDate).fromNow(true)} ago`}
                  />
                  {/* <CardMedia
                    className={classes.media}
                    image={coverURL}
                    // title="Paella dish"
                  /> */}

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
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
                </Card>
                <Divider variant="inset" component="li" />
                <Comments comments={comments} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
