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

import MoviesList from '../Components/MoviesList';
import GalleryFilter from '../Components/GalleryFilter';
import AudiosList from '../Components/AudiosList';
import FilterResultList from '../Components/FilterResultList';
import SearchWithinAlbum from '../Components/SearchWithinAlbum';
import Search_Algolia from '../Components/Search_Algolia';
import { callLogger } from '../utils/services/logging';
// import { trace } from '../utils/services/appTrace';

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    // justifyContent: 'center',
    // marginTop: '130px',
  },
  filter: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function Page_GalleryHome() {
  // trace();
  const classes = useStyles();

  setModuleName('page_movieHome');
  // callLogger('ERROR', 'logger called from Page AlgoliaSearch');

  var { query, gallery } = useParams();
  console.log('gallery is', gallery);
  console.log('query is', query);

  // get query parameters
  const filter = new URLSearchParams(query);
  console.log(filter);
  // var genre = filter.get('c');
  // var year = filter.get('y');
  // var area = filter.get('a');
  // var language = filter.get('l');

  const user = getContext('user');
  const guest = getContext('guest');
  const [filterData, setFilterDate] = useState({
    search: query ? filter.get('s') : '',
    genre: query ? filter.get('c') : 'All',
    area: query ? filter.get('a') : 'All',
    year: query ? filter.get('y') : 'All',
    language: query ? filter.get('l') : 'All',
  });

  console.log('filter data is ', filterData);
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

  // var contentsList;
  // switch (gallery) {
  //   case 'Gallery1':
  //     contentsList = <MoviesList filterData={filterData}  />;
  //     break;
  //   case 'Gallery2':
  //     contentsList = <AudiosList filterData={filterData}  />;
  // }

  AppLog(process.env.REACT_APP_TRACE_MODE, 'trace mode is ');
  return (
    <div>
      <div className={classes.filter}>
        <GalleryFilter
          filterCallback={filterCallback}
          filterData={filterData}
        />
      </div>
      <div style={{ marginTop: '40px' }}>
        <FilterResultList filterData={filterData} />{' '}
      </div>

      {process.env.REACT_APP_TRACE_MODE === 'T' && <LocalStorageContent />}
    </div>
  );
}
