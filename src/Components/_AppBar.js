/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState, useContext, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { alpha, makeStyles, createTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { useTranslation } from 'react-i18next';
import LanguageSlect from './LanguageSelect';

/***************************************************************
 * Custom Components
 ***************************************************************/
import { AppLog, setModuleName } from '../utils/services/appLog';
import { MessagesContext } from '../utils/context/contextMessages';

import { logoutUser } from '../utils/firebase/firebaseAuth';
import * as AppContext from '../utils/helpers/appContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  hearder: {
    position: 'fixed',
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

    // marginBottom: theme.spacing(2),
  },
  appBar: {
    // display: 'flex',
    // flexGrow: 1,
    // alignContent: 'center',
    // alignItems: 'center',
    // maxWidth: '70%',
    paddingLeft: '200px',
    paddingRight: '200px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function AppBarComponent() {
  setModuleName('AppBar Component');
  AppLog('re-render', 'AppBar status: ');

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

  // const [messagesDetail, setMessagesDetail] = useState(contextMessages);

  // useEffect(() => {
  //   setMessagesList(messages);
  // }, []);
  const { t } = useTranslation();

  const user = AppContext.getContext('user');
  const profile = AppContext.getContext('appProfile');

  const darkTheme = profile
    ? profile.preference.darkTheme
    : !process.env.REACT_APP_DEFAULT_THEME === 'LIGHT';

  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [theme, setTheme] = useState(darkTheme);
  const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
  const appliedTheme = createTheme(theme ? dark : light);

  let greeting = profile ? `, hello ${profile.name}` : '';
  AppLog(user, 'user is ');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    history.push('/');
  };

  const clickAireum = () => {
    history.push('/home');
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = user && (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={openMyPage}>{t('appBar:menuItems.myPage')}</MenuItem>
      <MenuItem onClick={openSettings}>
        {t('appBar:menuItems.profile')}
      </MenuItem>
      <MenuItem onClick={openAccount}>
        {t('appBar:menuItems.myAccount')}
      </MenuItem>
      <MenuItem onClick={logout}>{t('appBar:menuItems.logOut')}</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = user ? (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <ChatIcon />
          </Badge>
        </IconButton>
        <p>{t('appBar:menuItems.messages')}</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>{t('appBar:menuItems.notifications')}</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{t('appBar:menuItems.settings')}</p>
      </MenuItem>
    </Menu>
  ) : (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {process.env.REACT_APP_SIGNIN_ENABLE === 'T' ? (
        <MenuItem>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="secondary"
            size="small"
            className={classes.margin}
          >
            {t('form:buttons.signin')}
          </Button>
        </MenuItem>
      ) : (
        ''
      )}
    </Menu>
  );
  return (
    <ThemeProvider theme={appliedTheme}>
      <Paper className={classes.hearder}>
        <div className={classes.grow}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
              {/* <Link to='/' style={{ textDecoration: 'none' }} > */}
              <Typography
                className={classes.title}
                variant="h6"
                noWrap
                onClick={clickAireum}
              >
                Aireum
              </Typography>
              {/* </Link> */}
              {/* <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label={t('appBar:tabs.home')} {...a11yProps(0)} />
                <Tab label={t('appBar:tabs.discover')} {...a11yProps(1)} />
                <Tab label={t('appBar:tabs.subscriptions')} {...a11yProps(2)} />
              </Tabs> */}

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder={t('appBar:searchBar.placeholder')}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>

              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <LanguageSlect />
                <IconButton
                  edge="end"
                  color="inherit"
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
                {user !== null && (
                  <>
                    <IconButton
                      aria-label="show 4 new mails"
                      color="inherit"
                      component={Link}
                      to="/chat"
                    >
                      <Badge badgeContent={4} color="primary">
                        <ChatIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      aria-label="show 17 new notifications"
                      color="inherit"
                    >
                      <Badge badgeContent={17} color="primary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </>
                )}

                {user === null ? (
                  process.env.REACT_APP_SIGNIN_ENABLE === 'T' ? (
                    <Button
                      component={Link}
                      to="/login"
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.margin}
                    >
                      {t('form:buttons.signin')}
                    </Button>
                  ) : (
                    ''
                  )
                ) : (
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <Avatar src={user.photoURL}>
                      {/* {user.email
                        ? user.email.charAt(0).toUpperCase()
                        : user.phoneNumber.charAt(2)} */}
                    </Avatar>
                  </IconButton>
                )}
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <TabPanel value={value} index={0}>
            {/* <Locales /> */}
            {/* <DatePickerComponent date={date} setDate={setDate} /> */}
            {/* This is Home{greeting} */}
            {/* <h3>Context Error Massages: </h3>
            <>{contextMessages}</> */}
          </TabPanel>
          <TabPanel value={value} index={1}>
            Discover
          </TabPanel>
          <TabPanel value={value} index={2}>
            Subscriptions
          </TabPanel>
          {renderMobileMenu}
          {renderMenu}
        </div>
        {/* <div className={classes.phantomStyle} /> */}
      </Paper>
    </ThemeProvider>
  );
}

export const light = {
  overrides: {
    MuiAppBar: { colorPrimary: { backgroundColor: '#0e203d', opacity: 0.8 } },
  },
  // overrides: {
  //   MuiAppBar: { colorPrimary: { backgroundColor: 'transparent' } },
  // },

  palette: {
    type: 'light',
  },
};
export const dark = {
  overrides: {
    MuiAppBar: { colorPrimary: { backgroundColor: '#454747', opacity: 0.8 } },
  },
  // overrides: {
  //   MuiAppBar: { colorPrimary: { backgroundColor: 'transparent' } },
  // },
  palette: {
    type: 'dark',
  },
};
