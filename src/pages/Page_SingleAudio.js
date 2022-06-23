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
import AudioInfo from '../Components/AudioInfo';

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

export default function Page_SingleAudio(props) {
  const classes = useStyles();
  const { AudioID } = useParams();

  const [audioInfo, setAudioInfo] = useState(<p>loading</p>);

  useEffect(() => {
    axios
      .get(`http://${localhost}:${port}/audio?AudioID=${AudioID}`)
      .then((query) => {
        // AppLog(query, 'get video is ');
        const {
          Poster,
          Title,
          Release_Year,
          Category,
          Abstract,
          Star_Rating,
          Maturity_Rating,
          URL,
        } = query.data;
        setAudioInfo(
          // AppLog(doc, 'doc is');

          <AudioInfo
            Poster={Poster}
            Title={Title}
            Release_Year={Release_Year}
            Category={Category}
            Abstract={Abstract}
            Star_Rating={Star_Rating}
            Maturity_Rating={Maturity_Rating}
            URL={URL}
            AudioID={AudioID}
          />
        );
      });
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>{audioInfo}</Paper>
    </div>
  );
}
