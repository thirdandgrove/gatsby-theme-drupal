import React from 'react';

import Layout from '../components/Layout';

export default ({ pageContext: { element, nodeName } }) => (
  <Layout headerTitle={element.title}>
    <div>{JSON.stringify(element)}</div>
    <div>{nodeName}</div>
    <iframe
      title="graphiql"
      src={`http://localhost:8000/___graphql?query=%7B%0A%20%20allNode${nodeName}(filter%3A%20%7Bid%3A%20%7Beq%3A%20%22${
        element.id
      }%22%7D%7D)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&variables=&explorerIsOpen=true&operationName=undefined`}
      height="800px"
    />
  </Layout>
);
