/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';
import axios from 'axios';

/***************************************************************
 * Custom Components
 ***************************************************************/
import MovieInfo from '../Components/MovieInfo';

const localhost = process.env.REACT_APP_LOCAL_HOST;
const port = process.env.REACT_APP_SERVER_PORT_NUMBER;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    marginTop: '130px',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    // maxWidth: 500,
  },
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
}));

export default function Page_SingleMovie(props) {
  const classes = useStyles();
  const { PostID } = useParams();

  const [movieInfo, setMovieInfo] = useState(<p>loading</p>);

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
          Director,
          Genres,
          Starring,
          content,
        } = query.data;
        setMovieInfo(
          // AppLog(doc, 'doc is');

          <MovieInfo
            Poster={CoverURL}
            Movie_Title={Title}
            Release_Year={Year}
            Category={Genres}
            Abstract={PostText}
            Star_Rating={StarRating}
            Maturity_Rating={MaturityRating}
            DefaultPlayContentID={content[0].ContentID}
            Director={Director}
            Starring={Starring}
          />
        );
      });
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>{movieInfo}</Paper>
    </div>
  );
}
