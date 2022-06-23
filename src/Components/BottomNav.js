import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import FavoriteIcon from '@material-ui/icons/Favorite';

import WhatshotIcon from '@material-ui/icons/Whatshot';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    right: '0px',
    marginBottom: '0px',
    width: '100vw',
    backgroundColor: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export default function BottomNav() {
  const classes = useStyles();
  const theme = useTheme();

  const path = window.location.pathname;
  console.log('path is ', path);
  var defaultValue;
  switch (path) {
    case '/favorite':
      defaultValue = 1;
      break;
    case '/popular':
      defaultValue = 2;
      break;
    default:
      defaultValue = 0;
  }
  const [value, setValue] = useState(defaultValue);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        component={Link}
        to="/home"
      />
      <BottomNavigationAction
        label="My Favorite"
        icon={<FavoriteIcon />}
        component={Link}
        to="/favorite"
      />
      <BottomNavigationAction
        label="Popular"
        icon={<WhatshotIcon />}
        component={Link}
        to="/popular"
      />
    </BottomNavigation>
  );
}
