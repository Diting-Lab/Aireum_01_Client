/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/***************************************************************
 * Custom Components
 ***************************************************************/
import { useForm } from '../utils/helpers/hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // justifyContent: 'left',
    // flexWrap: 'wrap',

    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
    margin: 0,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '400px',
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchWithinAlbum({ gallery, query }) {
  const classes = useStyles();

  const { onChange, onSubmit, values } = useForm(searchSubmit, {
    searchText: '',
  });

  function searchSubmit() {
    console.log('search text is ', values.searchText);
    window.location.assign(
      `/gallery/g=${gallery}/search=${values.searchText}/q=${query}`
    );
  }

  return (
    // <Paper className={classes.root}>
    //   <Grid container>
    // <form className={classes.form} noValidate>
    <div>
      <TextField
        className={classes.input}
        // variant="outlined"
        // margin="normal"
        // required
        // fullWidth
        // id="search"

        name="searchText"
        value={values.searchText}
        onChange={onChange}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton
        type="submit"
        // onSubmit={onSubmit}
        onClick={onSubmit}
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      {/* <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.iconButton}
        onClick={onSubmit}
      ></Button> */}
    </div>
    //   </Grid>
    // </Paper>
  );
}
