/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

/***************************************************************
 * Custom Components
 ***************************************************************/
import AppBar from '../Components/AppBar';
import { AppLog, setModuleName } from '../utils/services/appLog';
import {
  setContext,
  getContext,
  isLoggedIn,
} from '../utils/helpers/appContext';
import LocalStorageContent from '../Components/LocalStorageContent';
import AudioFilter from '../Components/AudioFilter';
import AudiosList from '../Components/AudiosList';

const useStyles = makeStyles((theme) => ({
  filter: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '130px',
  },
}));

export default function Page_RadioHome() {
  const classes = useStyles();

  setModuleName('Page_RadioHome');
  const { category, year } = useParams();
  console.log('category is ', category);
  console.log('year is ', year);

  const user = getContext('user');
  const guest = getContext('guest');
  const [filterData, setFilterDate] = useState({
    category: 'All',
    area: 'All',
    year: 'All',
    language: 'All',
  });
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

  const filterCallback = (data) => {
    console.log('filter callback data is ', data);
    setFilterDate(data);
  };

  if (user) {
    AppLog(user, 'user is ');
    history.push('/content');
    // props.history.push('/content');
  }
  if (!guest) history.push('/welcome');

  AppLog(process.env.REACT_APP_TRACE_MODE, 'trace mode is ');
  return (
    <div>
      <div className={classes.filter}>
        <AudioFilter filterCallback={filterCallback} />
      </div>
      <div style={{ marginTop: '40px' }}>
        <AudiosList filterData={filterData} />
      </div>

      {process.env.REACT_APP_TRACE_MODE === 'T' && <LocalStorageContent />}
    </div>
  );
}
