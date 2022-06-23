import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   margin: 'auto',
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
  button: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  text: {
    variant: 'body2',
    color: 'text',
  },
}));

export default function MovieInfo({
  Poster,
  Movie_Title,
  Release_Year,
  Category,
  Abstract,
  Star_Rating,
  Maturity_Rating,
  URL,
  DefaultPlayContentID,
  Director,
  Starring,
}) {
  const classes = useStyles();

  const category =
    Category &&
    Category.map((c, key) => {
      if (key === Category.length - 1) {
        return `${c}`;
      } else return `${c}, `;
    });

  const starring =
    Starring &&
    Starring.map((c, key) => {
      if (key === Starring.length - 1) {
        return `${c}`;
      } else return `${c}, `;
    });

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
                {Movie_Title}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Director: {Director}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Starring: {starring}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Genre: {category}
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
                  window.location.assign(`/c/v/play/${DefaultPlayContentID}`);
                }}
              >
                Watch
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
