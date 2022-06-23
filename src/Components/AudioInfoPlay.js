/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

/***************************************************************
 * Custom Components
 ***************************************************************/

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  button: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export default function AudioInfoPlay({
  Poster,
  Title,
  Release_Year,
  Genre,
  Abstract,
  Star_Rating,
  Maturity_Rating,
  play,
}) {
  console.log('play is ', play);
  const classes = useStyles();
  const [isPlay, setIsPlay] = useState(play);
  const playButton = isPlay ? 'Pause' : 'Play';
  const playIcon = isPlay ? (
    <PauseCircleFilledIcon />
  ) : (
    <PlayCircleFilledIcon />
  );

  useEffect(() => {
    setIsPlay(play);
  }, [play]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="complex" src={Poster} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                style={{ fontSize: 'bold' }}
              >
                {Title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Genre: {Genre}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Year: {Release_Year}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Star Rating: {Star_Rating}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Maturity Rating: {Maturity_Rating}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={playIcon}
                onClick={() => {
                  setIsPlay(!isPlay);
                }}
              >
                {playButton}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Add to My List
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            Introduction: {Abstract}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
