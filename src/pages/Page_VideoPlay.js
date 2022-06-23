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
import { decrypt } from '../utils/services/crypto';
import VideoPlayer from '../Components/VideoPlayer';

const localhost = process.env.REACT_APP_LOCAL_HOST;
const port = process.env.REACT_APP_SERVER_PORT_NUMBER;

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // marginTop: '130px',
  },
  video: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
}));

export default function Page_VideoPlay() {
  const classes = useStyles();
  const { DefaultPlayContentID } = useParams();

  const [player, setPlayer] = useState(<p>loading</p>);

  useEffect(() => {
    axios
      .get(
        `http://${localhost}:${port}/content?ContentID=${DefaultPlayContentID}`
      )
      .then((query) => {
        // AppLog(query, 'get video is ');
        const { Title, CoverOverrideURL, CNTURL } = query.data;
        setPlayer(
          // AppLog(doc, 'doc is');

          <VideoPlayer
            Poster={CoverOverrideURL}
            Movie_Title={Title}
            URL={CNTURL}
          />
        );
      });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.video}>{player}</div>
    </div>
  );
}
