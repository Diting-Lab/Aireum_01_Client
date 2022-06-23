/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

/***************************************************************
 * Custom Components
 ***************************************************************/
import AudioPlayerComponent from '../Components/AudioPlayerComponent';
import Footer from '../Components/Footer';
import AudioInfoPlay from '../Components/AudioInfoPlay';

const localhost = process.env.REACT_APP_LOCAL_HOST;
const port = process.env.REACT_APP_SERVER_PORT_NUMBER;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 250,
    width: '100vw',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
    },
  },
  player: {
    display: 'flex',
    // justifyContent: 'center',
    marginTop: '20px',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
    },
  },
}));

export default function Page_AudioPlay() {
  const classes = useStyles();

  const { DefaultPlayContentID } = useParams();

  const [audioData, setAudioData] = useState(null);

  const [player, setPlayer] = useState(<p>loading</p>);
  const [audioInfo, setAudioInfo] = useState(<p>loading</p>);
  const [play, setPlay] = useState(false);

  const {
    CoverOverrideURL,

    CNTURL,

    Genres,
  } = audioData !== null && audioData;

  const { Title, Year, Abstract, StarRating, MaturityRating } =
    audioData !== null && audioData;

  useEffect(() => {
    axios
      .get(
        `http://${localhost}:${port}/content?ContentID=${DefaultPlayContentID}`
      )
      .then((query) => {
        // AppLog(query, 'get video is ');
        // const {
        //   Poster,
        //   Title,
        //   Release_Year,
        //   Category,
        //   Abstract,
        //   Star_Rating,
        //   Maturity_Rating,
        //   URL,
        // } = query.data;
        setAudioData(query.data);
      });
  }, []);

  useEffect(() => {
    setPlayer(
      // AppLog(doc, 'doc is');

      <AudioPlayerComponent
        Poster={CoverOverrideURL}
        Title={Title}
        URL={CNTURL}
        handlePlay={() => setPlay(!play)}
      />
    );
    setAudioInfo(
      <AudioInfoPlay
        Poster={CoverOverrideURL}
        Title={Title}
        Release_Year={Year}
        Genre={Genres}
        Abstract={Abstract}
        Star_Rating={StarRating}
        Maturity_Rating={MaturityRating}
        play={play}
      />
    );
  }, [audioData, play]);

  return (
    <div className={classes.root}>
      <div className={classes.player}>{audioInfo} </div>

      <Footer> {player}</Footer>
    </div>
  );
}
