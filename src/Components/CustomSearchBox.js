/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React from 'react';
import { useParams } from 'react-router-dom';
import { connectSearchBox } from 'react-instantsearch-dom';

/***************************************************************
 * Custom Components
 ***************************************************************/
// import useAnalyticsEventTracker from '../utils/services/useAnalyticsEventTracker';

export default function CustomSearchBox({ getSearchKeyword }) {
  // const gaEventTracker = useAnalyticsEventTracker('Search Event');

  var { filter } = useParams();

  console.log('search is ', filter);

  // get query parameters
  const query = new URLSearchParams(filter);
  var searchExist = query.get('search');

  var searchKeyword = searchExist ? query.get('search') : '';
  var filterCondition = filter ? filter : '';
  console.log('filter condition is ', filterCondition);

  console.log('searchKeyword is ', searchKeyword);

  let count = 0;

  function handleChange(event, refine, currentRefinement) {
    count = 1;
    console.log('current target ', event.currentTarget.value);
    refine(event.currentTarget.value);

    getSearchKeyword(event.currentTarget.value);
    query.set('search', event.currentTarget.value);

    // gaEventTracker(`search for ${event.currentTarget.value}`);

    // update URL without refresh
    window.history.replaceState(null, document.title, `/browse/${query}`);
  }
  // create custom search box
  const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
    console.log('count  is ', count);

    return (
      // <div class="ais-SearchBox">
      //   <form class="ais-SearchBox-form" novalidate>
      <input
        className="searchBox-input"
        type="search"
        // value and default value can't be used at same time, and value doesn't work correctly
        defaultValue={searchKeyword ? searchKeyword : ''}
        // value={currentRefinement}
        autoFocus
        style={{ display: 'inline' }}
        onFocus={() => {
          console.log('on input triggered');
          count == 0 && refine(searchKeyword);
        }}
        onChange={(event) => {
          handleChange(event, refine, currentRefinement);
        }}
      />

      //   </form>
      // </div>
    );
  };

  // connect components using connector
  const CustomSearchBox = connectSearchBox(SearchBox);
  return <CustomSearchBox />;
}
