import React, { useEffect } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    marginLeft: theme.spacing(3),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  search: {
    position: 'relative',

    borderRadius: 16,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    marginLeft: theme.spacing(20),
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function SearchBar(props) {
  // var { filter } = useParams(window.location);

  useEffect(() => {}, []);

  console.log('search filter is ', window.location);

  var pathname = window.location.pathname.split('/');

  console.log('pathname is ', pathname);

  // get query parameters
  const query = new URLSearchParams(pathname[2]);
  var searchExist = query.get('search');

  console.log('searchExist is ', searchExist);

  var searchKeyword = searchExist ? query.get('search') : '';

  console.log('search keyword from search bar is ', searchKeyword);

  const classes = useStyles();

  let count = 0;

  function handleChange(event) {
    // setSearchKeyword(event.currentTarget.value);

    console.log('event.currentTarget.value is ', event.currentTarget.value);

    query.set('search', event.currentTarget.value);

    window.location.assign(`/search/${query}`);

    // update URL without refresh
    window.history.replaceState(null, document.title, `/search/${query}`);
    count = 1;
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon color="inherit" />
      </div>
      <InputBase
        //TODO: placeholder will generate a long shadow in appbar
        // placeholder={t('appBar:searchBar.placeholder')}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(event) => handleChange(event)}
        // defaultValue={searchKeyword ? searchKeyword : ''}
        value={searchKeyword ? searchKeyword : ''}
      />
    </div>
  );
}
