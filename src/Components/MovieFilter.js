import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';

import update from 'lodash/update';

const useStyles = makeStyles((theme) => ({
  divRoot: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
  },
}));

export default function MovieFilter({ filterCallback }) {
  const classes = useStyles();
  const [color, setColor] = useState('default');
  const [selectedIndex, setSelectedIndex] = useState({
    category: 0,
    area: 0,
    year: 0,
    language: 0,
  });

  const { category, year, area, language } = useParams();

  const [chosen, setChosen] = useState({
    category: category ? category : 'All',
    area: area ? area : 'All',
    year: year ? year : 'All',
    language: language ? language : 'All',
  });
  useEffect(() => {}, [selectedIndex]);

  const categories = ['All', 'Action', 'Comedy', 'Love', 'Crime', 'Sci-Fi'];
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
    // const category = field === 'category' && data;
    // const year = field === 'year' && data;
    window.location.assign(
      `/movies/c=${chosen.category}/y=${chosen.year}/a=${chosen.area}/l=${chosen.language}`
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
          <Chip
            // icon={icon}
            color="primary"
            label={chosen[data]}
            onDelete={handleDelete(data)}
            className={classes.chip}
            key={key}
          />
        );
      })}
    </Grid>
  );

  const categoryList = (
    <Grid item xs={12}>
      <Typography className={classes.title} display="inline">
        Category:
      </Typography>

      {categories.map((data, key) => {
        return (
          <Chip
            // icon={icon}
            label={data}
            color={data === category ? 'primary' : 'default'}
            // onDelete={data === 'React' ? undefined : handleDelete(data)}
            className={classes.chip}
            key={key}
            onClick={() => handleListItemClick('category', data, key)}
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
            color={data === area ? 'primary' : 'default'}
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
            color={data === year ? 'primary' : 'default'}
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
            color={data === language ? 'primary' : 'default'}
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
    <Paper component="ul" className={classes.root}>
      <Grid container>
        {chosenItems}
        {categoryList}
        {areaList}
        {yearList}
        {languageList}
      </Grid>
    </Paper>
  );
}
