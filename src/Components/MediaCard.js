import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 300,
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(2),
      width: 220,
      height: 380,
    },
    [theme.breakpoints.down('lg')]: {
      marginLeft: theme.spacing(2),
      width: 200,
      height: 300,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(2),
      width: 150,
      height: 320,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
      width: 115,
      height: 220,
    },
    // height: 350,
    borderColor: 'red',
    marginLeft: theme.spacing(1),
  },
  media: {
    // height: 300,
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      height: 300,
    },
    [theme.breakpoints.down('lg')]: {
      height: 210,
    },
    [theme.breakpoints.down('md')]: {
      height: 250,
    },
    [theme.breakpoints.down('sm')]: {
      height: 140,
    },
  },
  title: {
    fontSize: '0.9rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.0rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
  },
  text: {
    fontSize: '0.9rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.0rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.5rem',
    },
  },
  starRating: {
    fontSize: '0.9rem',
    marginLeft: '100px',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.0rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
      marginLeft: '40px',
    },
  },
}));

export default function MediaCard({
  title,
  description,
  poster,
  getMedia,
  PostID,
  starRating,
  year,
  genres,
}) {
  const classes = useStyles();

  const genresArray =
    genres &&
    genres.map((g, key) => {
      if (key === genres.length - 1) {
        return `${g}`;
      } else return `${g}, `;
    });

  // trace('world');

  return (
    <Card className={classes.root}>
      <CardActionArea
        // onClick={() => getMedia()}
        component={Link}
        to={`/p/info/${PostID}`}
      >
        <CardMedia
          className={classes.media}
          // image="https://source.unsplash.com/1024x768/?nature"
          image={poster}
          title="Contemplative Reptile"
        />

        <CardContent>
          <Typography
            gutterBottom
            className={classes.title}
            noWrap
            // variant="subtitle1"
            align="left"
            // component="h4"
            // style={{ display: 'inline-block' }}
          >
            {title}
          </Typography>

          {/* <div
            style={{
              display: 'inline',
              justifyContent: 'space-between',
              whiteSpace: 'nowrap',
            }}
          > */}
          <Typography
            className={classes.text}
            // component="p"
            display="inline"
            color="inherit"
            // align="inherit"
          >
            ({year})
          </Typography>
          <Typography
            display="inline"
            className={classes.starRating}
            color="primary"
          >
            {starRating}
          </Typography>
          {/* </div> */}
          <Typography
            // variant="subtitle1"
            // color="textSecondary"
            // component="p"
            className={classes.text}
            color="textPrimary"
            align="left"
          >
            {genresArray}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
