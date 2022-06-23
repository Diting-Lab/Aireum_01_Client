/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/***************************************************************
 * Custom Components
 ***************************************************************/
import ProfileFromProvider from '../Components/ProfileFromProvider';
import ProfileFromApp from '../Components/ProfileFromApp';
import ChangePassword from '../Components/ChangePassword';
import { getContext } from '../utils/helpers/appContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignContent: 'center',
    marginTop: '110px',
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  title: {
    display: 'flex',
    alignSelf: 'center',
    margin: theme.spacing(3, 6, 2),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export default function Settings(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const value = props.index;
  const user = getContext('appProfile');

  const { authProvider } = user;

  const handleChange = (event, newValue) => {
    // setValue(newValue);
    if (newValue === 0) {
      history.push('/settings/profile');
    }
    if (newValue === 1) {
      history.push('/settings/account');
    }
    if (newValue === 2) {
      history.push('/settings/privacy');
    }
    if (newValue === 3) {
      history.push('/settings/notifications');
    }
  };

  const clickAireum = () => {
    history.push('/content');
  };

  return (
    <>
      <Typography
        className={classes.title}
        variant="h6"
        noWrap
        onClick={clickAireum}
      >
        Aireum
      </Typography>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          // variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label={t('settings:tabs.profile')} {...a11yProps(0)} />
          <Tab label={t('settings:tabs.account')} {...a11yProps(1)} />
          <Tab label={t('settings:tabs.privacy')} {...a11yProps(2)} />
          <Tab label={t('settings:tabs.notifications')} {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {/* <Profile />
          <Profile /> */}
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <ProfileFromProvider />
            </Grid>
            <Grid item xs={4}>
              <ProfileFromApp />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {authProvider === 'password' && <ChangePassword />}
        </TabPanel>
        <TabPanel value={value} index={2}>
          Privacy
        </TabPanel>
        <TabPanel value={value} index={3}>
          Notifications
        </TabPanel>
      </div>
    </>
  );
}
