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
import AudioPlaylistPlayerComponent from '../Components/AudioPlaylistPlayerComponent';
import Footer from '../Components/Footer';
import AudioInfoPlay from '../Components/AudioInfoPlay';

const localhost = process.env.REACT_APP_LOCAL_HOST;
const port = process.env.REACT_APP_SERVER_PORT_NUMBER;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // justifyContent: 'center',
    marginTop: '130px',
  },
  player: {
    display: 'flex',
    // justifyContent: 'center',
    marginTop: '20px',
    marginLeft: '20px',
  },
}));

export default function Page_AudioPlaylistPlay() {
  const classes = useStyles();

  const { playlistID } = useParams();

  const [audioData, setAudioData] = useState([]);

  const [player, setPlayer] = useState(<p>loading</p>);
  // const [audioInfo, setAudioInfo] = useState(<p>loading</p>);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    axios
      .get(`http://${localhost}:${port}/playlist_urls?playlistID=${playlistID}`)
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

      <AudioPlaylistPlayerComponent
        URLs={audioData}
        handlePlay={() => setPlay(!play)}
      />
    );
    // setAudioInfo(
    //   <AudioInfoPlay
    //     Poster={CoverOverrideURL}
    //     Title={Title}
    //     Release_Year={Year}
    //     Genre={Genres}
    //     Abstract={Abstract}
    //     Star_Rating={StarRating}
    //     Maturity_Rating={MaturityRating}
    //     play={play}
    //   />
    // );
  }, [audioData, play]);

  return (
    <div className={classes.root}>
      {/* <div className={classes.player}>{audioInfo} </div> */}

      <Footer> {player}</Footer>
    </div>
  );
}
