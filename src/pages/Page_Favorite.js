/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

/***************************************************************
 * Custom Components
 ***************************************************************/
import { AppLog, addStack, setModuleName } from '../utils/services/appLog';

import {
  setContext,
  getContext,
  isLoggedIn,
} from '../utils/helpers/appContext';
import LocalStorageContent from '../Components/LocalStorageContent';
import RecommendationBar from '../Components/RecommendationBar';
import GalleryGrid from '../Components/GalleryGrid';
import DrawerComponent from '../Components/DrawerComponent';

const useStyles = makeStyles((theme) => ({
  recommendationBar: {
    // paddingLeft: 200,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
    },
  },
  categoryGrid: {
    // display: 'flex',
    // justifyContent: 'center',
  },

  content: {
    // display: 'flex',
    // justifyContent: 'center',
    // backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Page_Favorite() {
  const classes = useStyles();

  setModuleName('Page_Favorite');
  const user = getContext('user');
  const guest = getContext('guest');
  AppLog(user, 'user called from landing page is ');
  AppLog(isLoggedIn(), 'user is logged in? ');
  const history = useHistory();
  useEffect(() => {
    !guest &&
      setContext('guest', {
        // locale: process.env.REACT_APP_DEFAULT_LOCALE,
        // darkTheme: !process.env.REACT_APP_DEFAULT_THEME === 'LIGHT',
        languageSelected: false,
      });
  }, []);

  // if (user) {
  //   AppLog(user, 'user is ');
  //   history.push('/content');
  //   // props.history.push('/content');
  // }
  if (!guest) history.push('/welcome');

  AppLog(process.env.REACT_APP_TRACE_MODE, 'XXX trace mode is ');

  function x() {
    AppLog('DEV', 'Inside x');
  }

  return (
    <div>
      {/* <DrawerComponent listIndex="1" /> */}
      <div className={classes.content}>
        <div className={classes.recommendationBar}>
          <RecommendationBar />
        </div>
        {/* <div className={classes.categoryGrid}>
          <GalleryGrid />
        </div> */}
      </div>

      {process.env.REACT_APP_TRACE_MODE === 'T' && <LocalStorageContent />}
    </div>
  );
}
