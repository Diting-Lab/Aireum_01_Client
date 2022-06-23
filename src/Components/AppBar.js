/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState, useContext } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FavoriteIcon from '@material-ui/icons/Favorite';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Link, useHistory } from 'react-router-dom';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';

import { useTranslation } from 'react-i18next';

/***************************************************************
 * Custom Components
 ***************************************************************/
import { AppLog, setModuleName } from '../utils/services/appLog';
import { MessagesContext } from '../utils/context/contextMessages';
import LanguageSlect from './LanguageSelect';
import DrawerComponent from './DrawerComponent';
// import BottomNav from './BottomNav';

import { logoutUser } from '../utils/firebase/firebaseAuth';
import * as AppContext from '../utils/helpers/appContext';
import SearchBar from './SearchBar';
// import useAnalyticsEventTracker from '../utils/services/useAnalyticsEventTracker';

const MAINCOLOR = 'primary';

const useStyles = makeStyles((theme) => ({
  hearder: {
    width: '100%',
    top: '0',
    bottom: '10',
  },
  phantomStyle: {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    paddingLeft: '200px',
    paddingRight: '200px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
      paddingRight: '0px',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      // fontSize: '10',
    },
  },
  button: {
    marginLeft: theme.spacing(4),
  },

  sectionDesktop: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',

    // [theme.breakpoints.up('md')]: {
    //   display: 'none',
    // },
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function AppBarComponent({ props }) {
  setModuleName('AppBar Component');
  AppLog('re-render', 'AppBar status: ');

  // const gaEventTracker = useAnalyticsEventTracker('Appbar Event');

  const { messages } = useContext(MessagesContext);
  AppLog(messages, 'messages from AppBar is ');

  // const { confirmNewPassword, newPassword, oldPassword } =
  //   messages.changePassword;

  // AppLog(newPassword, 'newPassword is ');
  AppLog(messages.length, 'message length is ');

  let contextMessages = Object.values(messages).map((message, key) => {
    AppLog(message, 'message is ');

    return (
      <div key={key}>
        <h5>{Object.keys(messages)[key]} component</h5>
        <p>{JSON.stringify(message)}</p>
      </div>
    );
  });

  const { t } = useTranslation();

  const user = AppContext.getContext('user');
  const profile = AppContext.getContext('appProfile');

  const darkTheme = profile
    ? profile.preference.darkTheme
    : process.env.REACT_APP_DEFAULT_THEME === 'DARK';

  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [theme, setTheme] = useState(darkTheme);
  const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
  const appliedTheme = createTheme(theme ? dark : light);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const openMyPage = () => {
    history.push(`/user/${user.uid}`);
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const openSettings = () => {
    history.push('/settings/profile');
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const openAccount = () => {
    history.push('/settings/account');
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logout = () => {
    logoutUser();
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push('/home');
  };

  const clickAireum = () => {
    window.location.assign('/home');
  };
  const clickBrowse = () => {
    // gaEventTracker('clicked browse');
    window.location.assign('/browse');
  };
  const clickFavorite = () => {
    window.location.assign('/favorite');
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const signInButton = user ? (
    <MenuItem onClick={logout}>
      <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color={MAINCOLOR}
      >
        <ExitToAppIcon />
      </IconButton>
      {t('appBar:menuItems.logOut')}
    </MenuItem>
  ) : (
    <MenuItem component={Link} to="/login">
      <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color={MAINCOLOR}
      >
        <LockOpenIcon />
      </IconButton>
      {t('form:buttons.signin')}
    </MenuItem>
  );

  const renderSettings = user && (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="fade-menu"
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      TransitionComponent={Fade}
    >
      <MenuItem onClick={openMyPage}>{t('appBar:menuItems.myPage')}</MenuItem>
      <MenuItem onClick={openSettings}>
        {t('appBar:menuItems.profile')}
      </MenuItem>
      <MenuItem onClick={openAccount}>
        {t('appBar:menuItems.myAccount')}
      </MenuItem>
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="fade-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      TransitionComponent={Fade}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton onClick={handleProfileMenuOpen} color="inherit">
          <Avatar src={user ? user.photoURL : ''}>
            {/* {user && user.displayName.charAt(0).toUpperCase()} */}
          </Avatar>
        </IconButton>
        <h4 style={{ color: 'inherit', paddingLeft: '5px' }}>
          {user && user.displayName}
        </h4>
      </MenuItem>

      {/* <DrawerComponent /> */}

      {user && (
        <MenuItem onClick={clickFavorite}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color={MAINCOLOR}
          >
            <FavoriteIcon />
          </IconButton>
          <p>My Favorite</p>
        </MenuItem>
      )}

      {user && (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color={MAINCOLOR}
          >
            <AccountCircle />
          </IconButton>
          <p>{t('appBar:menuItems.settings')}</p>
        </MenuItem>
      )}
      {process.env.REACT_APP_SIGNIN_ENABLE === 'T' && signInButton}
    </Menu>
  );

  return (
    <ThemeProvider theme={appliedTheme}>
      <Paper className={classes.hearder}>
        <div className={classes.grow}>
          {/* <HideOnScroll {...props}> */}
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              {/* <DrawerComponent /> */}
              <ButtonBase>
                <Typography
                  className={classes.title}
                  variant="h5"
                  noWrap
                  color="inherit"
                  onClick={clickAireum}
                >
                  Aireum
                </Typography>
              </ButtonBase>
              <ButtonBase className={classes.button}>
                <Typography
                  variant="subtitle1"
                  // noWrap

                  color="inherit"
                  onClick={clickBrowse}
                >
                  Browse
                </Typography>
              </ButtonBase>
              {/* <SearchBar /> */}
              <div className={classes.grow} />
              {/* <div className={classes.sectionDesktop}>
                <LanguageSlect />
                <IconButton
                  edge="end"
                  // style={{ backgroundColor: 'transparent' }}
                  aria-label="mode"
                  onClick={() => {
                    setTheme(!theme);
                    profile &&
                      AppContext.updateAppProfile(profile.uid, {
                        'preference.darkTheme': !theme,
                      });
                  }}
                >
                  {icon}
                </IconButton>
              </div> */}
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                >
                  <MenuIcon color="inherit" fontSize="large" />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {/* </HideOnScroll> */}

          {renderMenu}
          {renderSettings}
        </div>
      </Paper>
      {/* <BottomNav /> */}
    </ThemeProvider>
  );
}

export const light = {
  overrides: {
    // MuiAppBar: { colorPrimary: { backgroundColor: '#b5baba', opacity: 0.8 } },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#ffffff',
        opacity: 1,
        color: '#4a4d4d',
      },
    },
  },
  palette: {
    type: 'light',
  },
};
export const dark = {
  overrides: {
    MuiAppBar: {
      colorPrimary: { backgroundColor: '#454747', opacity: 1 },
    },
    // MuiAppBar: { colorPrimary: { backgroundColor: '#ffffff', opacity: 0.8 } },
  },
  palette: {
    type: 'dark',
  },
};
