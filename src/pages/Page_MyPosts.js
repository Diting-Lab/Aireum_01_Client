import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MediaCard from '../Components/MediaCard';

import { AppLog } from '../utils/services/appLog';
import { contentsRef } from '../utils/firebase/firebaseAuth';
import { getMyContent } from '../utils/services/contentServices';
import PostGrid from '../Components/PostGrid';
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
export default function Page_MyPosts() {
  const user = getContext('user');
  const { uid, displayName } = user;
  const classes = useStyles();
  const [postsList, setPostsList] = useState(<p>loading</p>);

  useEffect(() => {
    setPostsList(<PostGrid uid={uid} displayName={displayName} />);
  }, []);

  return (
    <>
      <p>this is my posts page</p>
      {postsList}
    </>
  );
}
