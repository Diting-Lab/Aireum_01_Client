/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
/***************************************************************
 * Custom Components
 ***************************************************************/
import MediaCard from '../Components/MediaCard';

import { AppLog } from '../utils/services/appLog';
import { contentsRef } from '../utils/firebase/firebaseAuth';
import {
  createAlbum,
  uploadMedia,
  getMyAlbums,
} from '../utils/services/contentServices';
import AlbumGrid from '../Components/AlbumGrid';
import AlbumMediaGrid from '../Components/AlbumMediaGrid';
import { getContext, isLoggedIn } from '../utils/helpers/appContext';

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
export default function Page_MyAlbum(props) {
  const user = getContext('user');
  const classes = useStyles();
  const [albumList, setAlbumList] = useState(<p>loading</p>);
  const [mediaList, setMediaList] = useState(<p>loading</p>);

  useEffect(() => {
    setAlbumList(<AlbumGrid uid={user.uid} getMedia={getMedia} />);
  }, []);

  function getMedia(id) {
    setMediaList(<AlbumMediaGrid albumID={id} />);
  }

  function handleCreateAlbum() {
    createAlbum(
      '9001',
      user.uid,
      'Xmas Songs',
      'https://source.unsplash.com/1024x768/?girl'
    ).catch((err) => AppLog(err, 'create album error is '));
  }

  function handleUploadMedia() {
    uploadMedia(
      '9003',
      'love sone',
      'this is my another favourite song',
      'sound',
      'song',
      'firebase',
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
      'https://source.unsplash.com/1024x768/?cat',
      user.uid,
      'aireum.ca'
    ).catch((err) => AppLog(err, 'create album error is '));
  }

  return (
    <>
      {/* <button onClick={handleCreateAlbum}>create album</button>
      <button onClick={handleUploadMedia}>upload media</button> */}
      {albumList}
      {mediaList}
    </>
  );
}
