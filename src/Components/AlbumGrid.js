/***************************************************************
 * React & Third Party Components
 ***************************************************************/
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
import axios from 'axios';
/***************************************************************
 * Custom Components
 ***************************************************************/
import MediaCard from './MediaCard';
import { AppLog } from '../utils/services/appLog';
import { getMyAlbums } from '../utils/services/contentServices';

const localhost = process.env.REACT_APP_LOCAL_HOST;
const port = process.env.REACT_APP_SERVER_PORT_NUMBER;

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

export default function ContentGrid({ uid, getMedia }) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [albumList, setAlbumList] = useState(<p>loading</p>);

  // const videos = getVideos(Category_Name).then();
  // AppLog(videos, 'videos is ');

  useEffect(() => {
    // contentsRef
    //   .doc('cuXid34VlFOpCM71aK0xEAnWOqB2')
    //   .get()
    // getMyAlbums(uid).then((query) => {
    axios
      .get(`http://${localhost}:${port}/my_albums?uid=${uid}`)
      .then((query) => {
        AppLog(query, 'query is ');
        setAlbumList(
          query.data.map((doc, key) => {
            // const getMedia = () => {
            //   alert(doc.id);
            // };
            AppLog(doc, 'album doc is');
            const { albumName, albumPosterURL, createdAt, AlbumID } = doc;
            return (
              <Grid key={createdAt} item>
                <MediaCard
                  title={albumName}
                  // description={createdAt}
                  poster={albumPosterURL}
                  getMedia={() => getMedia(AlbumID)}
                />
              </Grid>
            );
          })
        );
      });
  }, []);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <div className={classes.divRoot}>
      <h1>This is my album List</h1>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            {albumList}
          </Grid>
        </Grid>
      </Grid>
      <hr width="100%" />
    </div>
  );
}
