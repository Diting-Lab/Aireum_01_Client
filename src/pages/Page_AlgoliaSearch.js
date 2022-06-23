/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';

import {
  InstantSearch,
  Hits,
  Pagination,
  RefinementList,
  ClearRefinements,
  Configure,
  Stats,
  SortBy,
  SearchBox,
} from 'react-instantsearch-dom';
import { useParams } from 'react-router-dom';

import '../App.css';
import '../algolia.css';

/***************************************************************
 * Custom Components
 ***************************************************************/
import CustomSearchBox from '../Components/CustomSearchBox';
import { log, logDebug, logEmergency } from '../utils/services/logging';
import AlgoliaSearchClient from '../Components/AlgoliaSearchClient';
import Hit from '../Components/Hit';

// search phone example
// const searchClient = algoliasearch(
//   'B1G2GM9NG0',
//   'aadef574be1f9252bb48d4ea09b5cfe5'
// );

// TODO: Replace with your own algolia account
const ALGOLIA_APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.REACT_APP_ALGOLIA_INDEX_NAME;
const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
  divRoot: {
    paddingLeft: 200,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
    },
  },

  left: {
    float: 'left',
    // width: '280px',
    [theme.breakpoints.down('sm')]: {
      // width: '50px',
    },
  },
  right: {
    marginLeft: '30px',
    paddingTop: '1.5rem',

    // width: '700px',
    // marginTop: '0px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      paddingTop: 0,
    },
  },

  drawerPaper: {
    width: drawerWidth,
    height: '88vh',
    marginTop: 100,
    marginLeft: '220px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
      marginTop: 0,
      marginLeft: 0,

      paddingLeft: '20px',
    },
  },

  menuButton: {
    // marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    display: 'inline',
  },
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  resultText: {
    marginTop: theme.spacing(5),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Page_AlgoliaSearch(props) {
  var { filter } = useParams();
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setMobileOpen(false);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const container =
    props.window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // log('call add log API from algolia page', 'ERROR');
  logEmergency('call add log API from algolia page');

  console.log('filter is ', filter);

  // get query parameters
  const query = new URLSearchParams(filter);
  var filterExist = query.get('album');
  var searchExist = query.get('search');
  console.log('filter exist is ', filterExist);

  // get parameters from url
  var Album = filterExist ? query.get('album') : '';
  var Genres = filterExist ? query.get('genres') : '';
  var Area = filterExist ? query.get('area') : '';
  var Year = filterExist ? query.get('year') : '';
  var Language = filterExist ? query.get('language') : '';
  var searchKeyword = searchExist ? query.get('search') : '';

  console.log('search keyword is ', searchKeyword);

  var defaultAlbum = Album === '' ? [] : [Album];
  var defaultGenre = Genres === '' ? [] : [Genres];
  var defaultArea = Area === '' ? [] : [Area];
  var defaultYear = Year === '' ? [] : [Year];
  var defaultLanguage = Language === '' ? [] : [Language];

  const filters = [
    { item: Album, attribute: 'Album', defaultRefinement: defaultAlbum },
    { item: Genres, attribute: 'Genres', defaultRefinement: defaultGenre },
    {
      item: Language,
      attribute: 'Language',
      defaultRefinement: defaultLanguage,
    },
    { item: Area, attribute: 'Area', defaultRefinement: defaultArea },
    { item: Year, attribute: 'Year', defaultRefinement: defaultYear },
  ];

  console.log('filters is', filters);

  // update URL
  function updateURL() {
    var queryString = `search=${searchKeyword}&album=${filters[0].item}&genres=${filters[1].item}&language=${filters[2].item}&area=${filters[3].item}&year=${filters[4].item}`;
    // var queryString = `g=${genre}&y=${year}`;
    window.history.replaceState(null, document.title, `/search/${queryString}`);
  }

  // TODO: value doesn't update when called from RefinementList
  function updateQuery(item, query) {
    if (item.isRefined) {
      console.log(item.label, 'is chosed');
      query = item.label;
      updateURL();
    }
    if (!item.isRefined && item.label === query) {
      console.log(item.label, 'should be cancelled');

      query = '';
      updateURL();
    }
  }

  const refinementList = filters.map((filter, key) => {
    return (
      <React.Fragment key={key}>
        <h2>{filter.attribute}</h2>
        <RefinementList
          attribute={filter.attribute}
          transformItems={(items) => {
            console.log('item is ', items);
            items.map((item) => {
              // updateQuery(item, album);
              if (item.isRefined) {
                console.log(item.label, 'is chosed');
                filter.item = item.label;
                updateURL();
              }
              if (!item.isRefined && item.label === filter.item) {
                filter.item = '';
                updateURL();
              }
            });
            return items.filter((item) => item.count >= 1);
          }}
          defaultRefinement={filter.defaultRefinement}
        />
      </React.Fragment>
    );
  });

  // pass search keyword from search box component
  function getSearchKeyword(keyword) {
    console.log('keyword is ', keyword);
    // setSearchKeyword(keyword);
    searchKeyword = keyword ? keyword : '';
  }

  return (
    <div className={classes.divRoot}>
      <div className="ais-InstantSearch">
        <InstantSearch
          indexName={ALGOLIA_INDEX_NAME}
          searchClient={searchClient}
        >
          <div className={classes.left}>
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor="bottom"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <CustomSearchBox getSearchKeyword={getSearchKeyword} />
                <Stats />
                <SortBy
                  defaultRefinement="Default_ranking"
                  items={[
                    { value: 'Default_ranking', label: 'Default' },
                    { value: 'Year_asc', label: 'Year asc.' },
                    { value: 'Year_desc', label: 'Year desc.' },
                  ]}
                />
                <ClearRefinements />
                {refinementList}
                <Configure hitsPerPage={4} />
                <Button onClick={handleDrawerToggle}>Confirm</Button>
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                <CustomSearchBox getSearchKeyword={getSearchKeyword} />
                <Stats />
                <SortBy
                  defaultRefinement="Default_ranking"
                  items={[
                    { value: 'Default_ranking', label: 'Default' },
                    { value: 'Year_asc', label: 'Year asc.' },
                    { value: 'Year_desc', label: 'Year desc.' },
                  ]}
                />
                <ClearRefinements />
                {refinementList}
                <Configure hitsPerPage={10} />
              </Drawer>
            </Hidden>
          </div>
          <div className={classes.right}>
            <div style={{ display: 'flex' }}>
              <Toolbar className={classes.toolbar}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <FilterListIcon color="primary" fontSize="large" />
                </IconButton>
              </Toolbar>
            </div>
            {/* {searchKeyword !== '' && (
              <Typography
                className={classes.resultText}
                color="primary"
                variant="h5"
              >
                Results for
              </Typography>
            )} */}

            <Hits hitComponent={Hit} />
            <Hits hitComponent={Hit} />
            <Hits hitComponent={Hit} />
            <Hits hitComponent={Hit} />
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default Page_AlgoliaSearch;
