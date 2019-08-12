import React, { useRef } from 'react';

import useInterval from '../../hooks/useInterval';

/**
 * GraphiQL iframe
 * @param {string!} query initial query to update
 * @param {function!} updateQuery updater function for the query
 * @param {string!} src src url for graphiql explorer
 * @param {number} interval interval for polling
 * @param {string} height height for the iframe
 */

export default ({ query, src, updateQuery, interval, height }) => {
  const graphQlIframe = useRef();

  const queryPoll = () => {
    const { search } = graphQlIframe.current.contentWindow.location;
    // trims the url to just include the query
    const newQuery = search.slice(search.indexOf('=') + 1, search.indexOf('&'));
    if (newQuery !== query) {
      updateQuery(newQuery);
    }
  };

  useInterval(queryPoll, interval || 3000);

  return (
    <iframe
      ref={graphQlIframe}
      title="graphiql"
      src={src}
      height={height || '800px'}
    />
  );
};
