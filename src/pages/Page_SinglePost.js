/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';
import axios from 'axios';

/***************************************************************
 * Custom Components
 ***************************************************************/
import MovieInfo from '../Components/MovieInfo';
import AudioInfo from '../Components/AudioInfo';
import ContentList from '../Components/ContentList';

const localhost = process.env.REACT_APP_LOCAL_HOST;
const port = process.env.REACT_APP_SERVER_PORT_NUMBER;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 20,
    paddingTop: 20,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '10px',
    },
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   margin: 'auto',
  //   backgroundColor: 'transparent',
  //   // maxWidth: 500,
  // },
  image: {
    width: 250,
    // height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  divider: {
    marginTop: 20,
  },
}));

export default function Page_SinglePost(props) {
  const classes = useStyles();
  const { PostID } = useParams();

  const [postInfo, setPostInfo] = useState(<p>loading</p>);
  const [contents, setContents] = useState('');

  useEffect(() => {
    axios
      .get(`http://${localhost}:${port}/post?postID=${PostID}`)
      .then((query) => {
        // AppLog(query, 'get video is ');
        const {
          CoverURL,
          Title,
          Year,
          PostText,
          StarRating,
          MaturityRating,
          Host,
          Genres,
          Director,
          contents,
          PostType,
          Starring,
        } = query.data;
        var info = PostType === 'Sound Upload' && (
          <AudioInfo
            Poster={CoverURL}
            Movie_Title={Title}
            Release_Year={Year}
            Category={Genres}
            Abstract={PostText}
            Star_Rating={StarRating}
            Maturity_Rating={MaturityRating}
            DefaultPlayContentID={contents[0].ContentID}
            Host={Host}
          />
        );
        var info = '';
        switch (PostType) {
          case 'Sound Upload':
            info = (
              <AudioInfo
                Poster={CoverURL}
                Title={Title}
                Release_Year={Year}
                Category={Genres}
                Abstract={PostText}
                Star_Rating={StarRating}
                Maturity_Rating={MaturityRating}
                DefaultPlayContentID={contents[0].ContentID}
                Host={Host}
              />
            );
            break;
          case 'Vid Upload':
            info = (
              <MovieInfo
                Poster={CoverURL}
                Movie_Title={Title}
                Release_Year={Year}
                Category={Genres}
                Abstract={PostText}
                Star_Rating={StarRating}
                Maturity_Rating={MaturityRating}
                DefaultPlayContentID={contents[0].ContentID}
                Director={Director}
                Starring={Starring}
              />
            );
            break;
        }

        setPostInfo(info);
        contents.length > 1 && setContents(<ContentList contents={contents} />);
      });
  }, []);

  return (
    <div className={classes.root}>
      {postInfo}

      <Divider className={classes.divider} />

      {contents}
    </div>
  );
}
