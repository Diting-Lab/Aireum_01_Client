/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
/***************************************************************
 * Custom Components
 ***************************************************************/
import { getContext, isLoggedIn } from '../utils/helpers/appContext';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
});

export default function FriendsList() {
  const user = getContext('user');
  const { displayName } = user;
  const classes = useStyles();

  return (
    <List>
      <ListItem button key="RemySharp">
        <ListItemIcon>
          <Avatar
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
        </ListItemIcon>
        <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
        <ListItemText secondary="online" align="right"></ListItemText>
      </ListItem>
      <ListItem button key="Alice">
        <ListItemIcon>
          <Avatar
            alt="Alice"
            src="https://material-ui.com/static/images/avatar/3.jpg"
          />
        </ListItemIcon>
        <ListItemText primary="Alice">Alice</ListItemText>
      </ListItem>
      <ListItem button key="CindyBaker">
        <ListItemIcon>
          <Avatar
            alt="Cindy Baker"
            src="https://material-ui.com/static/images/avatar/2.jpg"
          />
        </ListItemIcon>
        <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
      </ListItem>
    </List>
  );
}
