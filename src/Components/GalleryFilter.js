/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';

import update from 'lodash/update';

/***************************************************************
 * Custom Components
 ***************************************************************/

const useStyles = makeStyles((theme) => ({
  divRoot: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // backgroundColor: 'transparent',
  },
  root: {
    // display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  title: {
    fontSize: '1.2rem',
    // color: 'secondary',
  },
}));

export default function GalleryFilter({ filterCallback, filterData }) {
  console.log('filter data passed is ', filterData);
  const classes = useStyles();
  const [color, setColor] = useState('default');
  const [selectedIndex, setSelectedIndex] = useState({
    genre: 0,
    area: 0,
    year: 0,
    language: 0,
  });

  var { gallery } = useParams();
  // console.log('gallery is', gallery);
  // console.log('query is', query);

  // // get query parameters
  // const filter = new URLSearchParams(query);
  // var genre = filter.get('c');
  // var year = filter.get('y');
  // var area = filter.get('a');
  // var language = filter.get('l');

  // console.log('genre is', genre);

  const [chosen, setChosen] = useState(filterData);
  useEffect(() => {}, [selectedIndex]);

  const genres = [
    'All',
    'Action',
    'Comedy',
    'Love',
    'Crime',
    'Sci-Fi',
    'Education',
    'Culture',
    'Technology',
    'Society',
  ];
  const areas = ['All', 'America', 'Canada', 'France', 'China'];
  const years = ['All', '2022', '2011', '2010', '2003', '2002', '2001'];
  const languages = ['All', 'English', 'French', 'Chinese'];

  const handleDelete = (chipToDelete) => () => {
    console.log('delete data is ', chipToDelete);
    // setChosen((chosen) => chosen.filter((chip) => chip !== chipToDelete));
    delete chosen[chipToDelete];
    console.log('chosen data', chosen);
    setChosen({ ...chosen });
  };

  const handleListItemClick = (field, data, key) => {
    console.log('field is ', field);

    // update selected index object
    update(selectedIndex, field, () => {
      return key;
    });

    // update chosen object
    update(chosen, field, () => {
      return data;
    });

    // trigger re render
    setChosen({ ...chosen });

    filterCallback(chosen);

    var query = `s=${chosen.search}&c=${chosen.genre}&y=${chosen.year}&a=${chosen.area}&l=${chosen.language}`;

    window.location.assign(
      // `/gallery/g=${gallery}/c=${chosen.genre}/y=${chosen.year}/a=${chosen.area}/l=${chosen.language}`
      `/gallery/g=${gallery}/q=${query}`
    );
  };

  const chosenItems = (
    <Grid item xs={12}>
      <Typography className={classes.title} display="inline">
        Chosen:{' '}
      </Typography>

      {/* {chosen.map((data, key) => {
        let icon;

        return (
          <Chip
            icon={icon}
            label={data.value}
            onDelete={handleDelete(data)}
            className={classes.chip}
            key={key}
          />
        );
      })} */}
      {Object.keys(chosen).map((data, key) => {
        console.log('data is ', data);

        return (
          data !== 'search' && (
            <Chip
              // icon={icon}
              color="primary"
              label={chosen[data]}
              onDelete={handleDelete(data)}
              className={classes.chip}
              key={key}
            />
          )
        );
      })}
    </Grid>
  );

  const genresList = (
    <Grid item xs={12}>
      <Typography className={classes.title} display="inline">
        Genre:
      </Typography>

      {genres.map((data, key) => {
        return (
          <Chip
            // icon={icon}
            label={data}
            color={data === chosen.genre ? 'primary' : 'default'}
            // onDelete={data === 'React' ? undefined : handleDelete(data)}
            className={classes.chip}
            key={key}
            onClick={() => handleListItemClick('genre', data, key)}
          />
        );
      })}
    </Grid>
  );

  const areaList = (
    <Grid item xs={12}>
      <Typography className={classes.title} display="inline">
        Area:
      </Typography>

      {areas.map((data, key) => {
        return (
          <Chip
            // icon={icon}
            label={data}
            color={data === chosen.area ? 'primary' : 'default'}
            // onDelete={data === 'React' ? undefined : handleDelete(data)}
            className={classes.chip}
            key={key}
            onClick={() => handleListItemClick('area', data, key)}
          />
        );
      })}
    </Grid>
  );
  const yearList = (
    <Grid item xs={12}>
      <Typography className={classes.title} display="inline">
        Year:
      </Typography>

      {years.map((data, key) => {
        return (
          <Chip
            // icon={icon}
            label={data}
            color={data === chosen.year ? 'primary' : 'default'}
            // onDelete={data === 'React' ? undefined : handleDelete(data)}
            className={classes.chip}
            key={key}
            onClick={() => handleListItemClick('year', data, key)}
          />
        );
      })}
    </Grid>
  );
  const languageList = (
    <Grid item xs={12}>
      <Typography className={classes.title} display="inline">
        Language:
      </Typography>

      {languages.map((data, key) => {
        return (
          <Chip
            // icon={icon}
            label={data}
            color={data === chosen.language ? 'primary' : 'default'}
            // onDelete={data === 'React' ? undefined : handleDelete(data)}
            className={classes.chip}
            key={key}
            onClick={() => handleListItemClick('language', data, key)}
          />
        );
      })}
    </Grid>
  );

  return (
    <div className={classes.root}>
      <Grid container>
        {chosenItems}
        {genresList}
        {areaList}
        {yearList}
        {languageList}
      </Grid>
    </div>
  );
}
