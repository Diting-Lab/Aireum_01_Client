import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { AppLog } from '../utils/services/appLog';

import AudioCard from './AudioCard';

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

export default function AudiosList({ filterData }) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [audioList, setAudioList] = useState(<p>loading</p>);

  var { category, year, area, language } = useParams();

  category = category === 'All' ? '' : category;
  year = year === 'All' ? '' : year;
  area = area === 'All' ? '' : area;
  language = language === 'All' ? '' : language;

  useEffect(() => {
    let URL =
      category !== undefined
        ? `http://${localhost}:${port}/audios_filter?Category=${category}&Release_Year=${year}&Area=${area}&Language=${language}`
        : `http://${localhost}:${port}/audios`;

    axios.get(URL).then((query) => {
      // AppLog(query, 'get video is ');
      setAudioList(
        query.data.length > 0 ? (
          query.data.map((doc, key) => {
            // AppLog(doc, 'doc is');
            const { Title, Abstract, Poster, AudioID } = doc;
            return (
              <Grid item xs={2} key={key}>
                <AudioCard
                  key={key}
                  title={Title}
                  // description={Abstract}
                  poster={Poster}
                  AudioID={AudioID}
                />
              </Grid>
            );
          })
        ) : (
          <h2>No audio found</h2>
        )
      );
    });
  }, [filterData]);

  return (
    <div className={classes.divRoot}>
      <Grid container>{audioList}</Grid>
    </div>
  );
}
