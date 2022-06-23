import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ContentList({ contents }) {
  const classes = useStyles();

  const contentList = contents.map((content) => {
    const { Title, CoverOverrideURL, ContentID, StarRating, CNTOrder } =
      content;
    return (
      <>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={CoverOverrideURL}></Avatar>
          </ListItemAvatar>

          <IconButton
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              window.location.assign(`/c/a/play/${ContentID}`);
            }}
          >
            <PlayCircleFilledIcon />
          </IconButton>
          <ListItemText primary={Title} secondary={StarRating} />
        </ListItem>
        <Divider variant="inset" />
      </>
    );
  });

  return <List className={classes.root}>{contentList}</List>;
}
