import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import MediaCard from './MediaCard';
import { AppLog } from '../utils/services/appLog';
import { filter } from 'lodash';
import AudioCard from './AudioCard';
// import { trace } from '../utils/services/appTrace';

const localhost = process.env.REACT_APP_LOCAL_HOST;
const port = process.env.REACT_APP_SERVER_PORT_NUMBER;

const useStyles = makeStyles((theme) => ({
  divRoot: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  root: {
    // flexGrow: 1,
    // flexWrap: 'nowrap',
  },
}));

export default function FilterResultList({ filterData }) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [videoList, setVideoList] = useState(<p>loading</p>);

  var { gallery } = useParams();

  var search = filterData.search;
  var genre = filterData.genre === 'All' ? '' : filterData.genre;
  var year = filterData.year === 'All' ? '' : filterData.year;
  var area = filterData.area === 'All' ? '' : filterData.area;
  var language = filterData.language === 'All' ? '' : filterData.language;

  useEffect(() => {
    let URL =
      genre !== undefined
        ? `http://${localhost}:${port}/filter?search=${search}&Album=${gallery}&Genres=${genre}&Year=${year}&Area=${area}&Language=${language}`
        : `http://${localhost}:${port}/filter?Album=${gallery}`;

    axios
      .get(URL)
      .then((query) => {
        // AppLog(query, 'get video is ');
        setVideoList(
          query.data.length > 0 ? (
            query.data.map((doc, key) => {
              // AppLog(doc, 'doc is');
              const { Title, CoverURL, PostID } = doc;
              return (
                <Grid item xs={3} key={key}>
                  {gallery === 'Movies' && (
                    <MediaCard
                      key={key}
                      title={Title}
                      // description={Abstract}
                      poster={CoverURL}
                      PostID={PostID}
                    />
                  )}
                  {gallery === 'Radios' && (
                    <AudioCard
                      key={key}
                      title={Title}
                      // description={Abstract}
                      poster={CoverURL}
                      PostID={PostID}
                    />
                  )}
                </Grid>
              );
            })
          ) : (
            <h2>No content found</h2>
          )
        );
      })
      .catch((err) => {});
  }, [filterData]);

  return (
    <div className={classes.divRoot}>
      <Grid container>{videoList}</Grid>
    </div>
  );
}
