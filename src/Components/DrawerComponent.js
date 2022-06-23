/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useEffect } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { Link, useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';

/***************************************************************
 * Custom Components
 ***************************************************************/
import AccountList from './AccountList';

const drawerWidth = 380;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    display: 'flex',

    justifyContent: 'left',
    margin: theme.spacing(1, 2, 1),

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    height: '100vh',
    // marginTop: 100,
    // marginLeft: 200,
    paddingLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      // marginTop: 56,
      marginLeft: 0,
      width: '60vw',
    },
  },

  chip: {
    // display: 'flex',
    // justifyContent: 'center',
    // flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  // toolbar: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
  },
}));

export default function DrawerComponent(props) {
  const { window, listIndex } = props;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      {/* <Typography
        className={classes.title}
        variant="h6"
        noWrap
        color="secondary"
        onClick={clickAireum}
      >
        Aireum
      </Typography> */}
      <Divider />
      <List>
        {['For You', 'Following', 'Popular', 'Movies', 'Radios'].map(
          (text, index) => {
            var iconColor = index == listIndex ? 'secondary' : 'inherit';
            var textColor = index == listIndex ? 'secondary' : 'inherit';
            var url;
            switch (index) {
              case 0:
                url = '/home';
                break;
              case 1:
                url = '/following';
                break;
              case 2:
                url = '/popular';
                break;
              case 3:
                url = `/search`;
                break;
              case 4:
                url = `/gallery/g=Radios`;
                break;
              default:
                url = '/home';
            }

            return (
              <ListItem button key={text} component={Link} to={url}>
                <ListItemIcon>
                  {index === 0 && <HomeIcon color={iconColor} />}
                  {index === 1 && <GroupIcon color={iconColor} />}
                  {index === 2 && <WhatshotIcon color={iconColor} />}
                  {index === 3 && <VideoLibraryIcon color={iconColor} />}
                  {index === 4 && <RadioButtonCheckedIcon color={iconColor} />}
                </ListItemIcon>
                <ListItemText>
                  <Typography component="span" variant="h6" color={textColor}>
                    {text}
                  </Typography>
                </ListItemText>
              </ListItem>
            );
          }
        )}
      </List>
      <Divider />
      {/* {(listIndex == 0 || listIndex == 2) && (
        <> */}
      <Typography variant="subtitle1">Suggested accounts</Typography>
      <AccountList />
      <Divider />
      {/* </>
      )} */}
      <Typography variant="subtitle1">Discover</Typography>
      <div className={classes.chip}>
        <Chip
          label="# selflove"
          component="a"
          href="#chip"
          clickable
          variant="outlined"
        />
        <Chip
          label="# thisiswhatdreamsaremadeof"
          component="a"
          href="#chip"
          clickable
          variant="outlined"
        />
        <Chip
          label="# thebatman"
          component="a"
          href="#chip"
          clickable
          variant="outlined"
        />
        <Chip
          label="# dinnerrecipe"
          component="a"
          href="#chip"
          clickable
          variant="outlined"
        />
        <Chip
          label="# canada"
          component="a"
          href="#chip"
          clickable
          variant="outlined"
        />
        <Chip
          label="# cbmf"
          component="a"
          href="#chip"
          clickable
          variant="outlined"
        />
        <Chip
          label="# justinbieber"
          component="a"
          href="#chip"
          clickable
          variant="outlined"
        />
        <Chip
          label="# loveyoustill"
          component="a"
          href="#chip"
          clickable
          variant="outlined"
        />
        <Chip
          label="# howlsmovingcastle"
          component="a"
          href="#chip"
          clickable
          variant="outlined"
        />
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <MenuItem onClick={handleDrawerToggle}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"

          // className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <p> Menu</p>
      </MenuItem>

      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      {/* <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden> */}
    </>
  );
}
