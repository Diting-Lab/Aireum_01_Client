import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import MediaCard from './MediaCard';
import { AppLog } from '../utils/services/appLog';
import { Typography } from '@material-ui/core';

const localhost = process.env.REACT_APP_LOCAL_HOST;
const port = process.env.REACT_APP_SERVER_PORT_NUMBER;

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // flexWrap: 'nowrap',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function RecommendationBar() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [videoList, setVideoList] = useState(<p>loading</p>);

  // const videos = getVideos(Category_Name).then();
  // AppLog(videos, 'videos is ');

  useEffect(() => {
    axios.get(`http://${localhost}:${port}/recommended_posts`).then((query) => {
      // AppLog(query, 'get video is ');
      setVideoList(
        query.data.map((doc, key) => {
          // AppLog(doc, 'doc is');
          const {
            Title,
            Abstract,
            CoverURL,
            PostID,
            StarRating,
            Year,
            Genres,
          } = doc;
          return (
            <Grid item key={key}>
              <MediaCard
                title={Title}
                // description={Abstract}
                starRating={StarRating}
                poster={CoverURL}
                PostID={PostID}
                year={Year}
                genres={Genres}
              />
            </Grid>
          );
        })
      );
    });
  }, []);

  return (
    <div>
      <Typography variant="h5">Recommended</Typography>
      <Grid container className={classes.root}>
        {videoList}
        {videoList}
        {videoList}
        {videoList}
        {videoList}
      </Grid>
    </div>
  );
}
