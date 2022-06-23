import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'TRLY39ZYKF',
  '1c2e8ad2932bee807783273d76c33f13'
);

export default function Search_Algolia() {
  return (
    <InstantSearch searchClient={searchClient} indexName={'PostText'}>
      <div>
        <SearchBox />
        <Hits />
      </div>
    </InstantSearch>
  );
}
