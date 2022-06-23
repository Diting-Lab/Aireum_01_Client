/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
  text: {
    variant: 'body2',
    color: 'textPrimary',
  },
}));

export default function AudioInfo({
  Poster,
  Title,
  Host,
  Release_Year,
  Category,
  Abstract,
  Star_Rating,
  DefaultPlayContentID,
  Maturity_Rating,
  URL,
}) {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="complex" src={Poster} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container style={{ color: 'white' }}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h4" color="textPrimary">
                {Title}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Host: {Host}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Genre: {Category}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Year: {Release_Year}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Star Rating: {Star_Rating}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Maturity Rating: {Maturity_Rating}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  window.location.assign(`/c/a/play/${DefaultPlayContentID}`);
                }}
              >
                Listen
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
          <Typography variant="body1" color="textPrimary">
            Introduction: {Abstract}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
