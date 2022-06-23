import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MediaCard from '../Components/MediaCard';

import { AppLog } from '../utils/services/appLog';
import { contentsRef } from '../utils/firebase/firebaseAuth';
import { getMyContent } from '../utils/services/contentServices';
import PostGrid from '../Components/PostGrid';
import { getContext, isLoggedIn } from '../utils/helpers/appContext';
import SinglePostDialog from '../Components/SinglePostDialog';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
export default function Page_SinglePost(props) {
  const user = getContext('user');
  const { uid, displayName } = user;
  const classes = useStyles();
  const [postsList, setPostsList] = useState(<p>loading</p>);

  const { postID } = useParams();
  console.log('post ID is ', postID);

  useEffect(() => {
    axios
      .get(`http://${localhost}:${port}/post?postID=${postID}`)
      .then((query) => {
        AppLog(query, 'query is ');

        const {
          postDate,
          coverURL,
          postText,
          likesCount,
          dislikesCount,
          cmtCount,
          postID,
          comments,
        } = query.data;
        setPostsList(
          <Grid item>
            <SinglePostDialog
              displayName={displayName}
              postDate={postDate}
              coverURL={coverURL}
              postText={postText}
              likesCount={likesCount}
              dislikesCount={dislikesCount}
              cmtCount={cmtCount}
              comments={comments}
            />
          </Grid>
        );
      });
  }, []);

  return (
    <>
      <p>this is single post page</p>
      {/* <SinglePostDialog /> */}
      {postsList}
    </>
  );
}
