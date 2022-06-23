/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { InstantSearch } from 'react-instantsearch-dom';

import '../App.css';

/***************************************************************
 * Custom Components
 ***************************************************************/

const searchClient = algoliasearch(
  'TRLY39ZYKF',
  '1c2e8ad2932bee807783273d76c33f13'
);

const useStyles = makeStyles((theme) => ({
  divRoot: {
    paddingLeft: 260,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
    },
  },
}));

function AlgoliaSearchClient(props) {
  const classes = useStyles();
  console.log('algolia search client is called');

  return (
    // <div className={classes.divRoot}>
    <div className="ais-InstantSearch">
      <InstantSearch
        indexName="PostText"
        searchClient={searchClient}
      ></InstantSearch>
    </div>
    // </div>
  );
}

export default AlgoliaSearchClient;
