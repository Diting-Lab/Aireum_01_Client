import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import SportsHockeyIcon from '@material-ui/icons/SportsHockey';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  divRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  root: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   '& > *': {
    //     margin: theme.spacing(2),
    //     width: theme.spacing(16),
    //     height: theme.spacing(16),
    //   },
    //   justifyContent: 'center',
  },
  paper: {
    // width: 250,
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(10),

    maxHeight: 150,
    backgroundColor: '#04496e',
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      width: 250,
    },
    [theme.breakpoints.down('lg')]: {
      width: 170,
    },
    [theme.breakpoints.down('md')]: {
      width: 130,
    },
    [theme.breakpoints.down('sm')]: {
      width: 110,
    },
  },
  content: {
    // position: 'absolute',
    // top: '50%',
    // left: '30%',
    // justifyItems: 'center',
    color: 'white',
    marginTop: '65px',
  },
  icon: {
    position: 'absolute',
    top: '25%',
    left: '40%',
    // marginTop: '20px',
    // justifyContent: 'center',
    color: 'white',
  },
  title: {
    fontSize: '1.5rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.0rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
}));

export default function GalleryGrid() {
  const classes = useStyles();

  const galleries = [
    { name: 'Movies', icon: <VideoLibraryIcon fontSize="large" /> },
    { name: 'Radios', icon: <RadioButtonCheckedIcon fontSize="large" /> },
    { name: 'TV Shows', icon: <LiveTvIcon fontSize="large" /> },
    { name: 'Entertainment', icon: <VideoLibraryIcon fontSize="large" /> },
    { name: 'Kids', icon: <ChildCareIcon fontSize="large" /> },
    { name: 'Sports', icon: <SportsHockeyIcon fontSize="large" /> },
    { name: 'My List', icon: <StarIcon fontSize="large" /> },
  ];

  const galleryList = galleries.map((gallery, key) => {
    return (
      <Grid item xs="auto" key={key}>
        <Paper
          elevation={3}
          className={classes.paper}
          onClick={() => window.location.assign(`/gallery/g=${gallery.name}`)}
        >
          <div className={classes.icon}>{gallery.icon}</div>
          <div className={classes.content}>
            <Typography className={classes.title}>{gallery.name}</Typography>
          </div>
        </Paper>
      </Grid>
    );
  });

  return (
    <div className={classes.divRoot}>
      <Grid container className={classes.root}>
        {galleryList}
      </Grid>
    </div>
  );
}
