import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ImageList from '@material-ui/core/ImageList';
import MediaCard from './MediaCard';
import { AppLog } from '../utils/services/appLog';
import { getVideosByCategory } from '../utils/services/contentServices';

const useStyles = makeStyles((theme) => ({
  divRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    // flexGrow: 1,
    flexWrap: 'nowrap',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function MovieGrid({ Category_Name }) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [videoList, setVideoList] = useState(<p>loading</p>);

  // const videos = getVideos(Category_Name).then();
  // AppLog(videos, 'videos is ');

  useEffect(() => {
    getVideosByCategory(Category_Name).then((query) => {
      // AppLog(query, 'get video is ');
      setVideoList(
        query.docs.map((doc, key) => {
          // AppLog(doc, 'doc is');
          const { Movie_Title, Abstract, Poster } = doc.data();
          return (
            <Grid key={key} item>
              <MediaCard
                title={Movie_Title}
                description={Abstract}
                poster={Poster}
              />
            </Grid>
          );
        })
      );
    });
  }, [Category_Name]);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <div className={classes.divRoot}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-start" spacing={spacing}>
            {videoList}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
