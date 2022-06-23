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

const useStyles = makeStyles((theme) => ({
  recommendationBar: {
    display: 'flex',

    justifyContent: 'center',
  },
  categoryGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function Page_Landing() {
  const classes = useStyles();

  setModuleName('Page_Landing');
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

  if (user) {
    AppLog(user, 'user is ');
    history.push('/content');
    // props.history.push('/content');
  }
  if (!guest) history.push('/welcome');

  AppLog(process.env.REACT_APP_TRACE_MODE, 'XXX trace mode is ');

  function x() {
    AppLog('DEV', 'Inside x');
  }

  return (
    <div>
      <div className={classes.recommendationBar}>
        <RecommendationBar />
      </div>
      <div className={classes.categoryGrid}>
        <GalleryGrid />
      </div>

      {process.env.REACT_APP_TRACE_MODE === 'T' && <LocalStorageContent />}
    </div>
  );
}
