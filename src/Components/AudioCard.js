import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 220,
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(2),
      width: 220,
      height: 350,
    },
    [theme.breakpoints.down('lg')]: {
      marginLeft: theme.spacing(2),
      width: 200,
      height: 260,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(2),
      width: 160,
      height: 210,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2),
      width: 130,
      height: 160,
    },
    // height: 350,
    borderColor: 'red',
    marginLeft: theme.spacing(3),
  },
  media: {
    // height: 300,
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      height: 250,
    },
    [theme.breakpoints.down('lg')]: {
      height: 200,
    },
    [theme.breakpoints.down('md')]: {
      height: 150,
    },
    [theme.breakpoints.down('sm')]: {
      height: 110,
    },
  },
  title: {
    fontSize: '1.0rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  },
}));

export default function AudioCard({
  title,
  description,
  poster,
  getMedia,
  PostID,
}) {
  const classes = useStyles();

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
          <Typography gutterBottom className={classes.title} component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
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
