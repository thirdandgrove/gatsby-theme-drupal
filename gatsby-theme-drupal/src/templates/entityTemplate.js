import React, { useEffect, useState, useRef } from 'react';

import Layout from '../components/Layout';
import Prism from '../prism/prism';
import '../prism/prism.css';

export default ({ pageContext: { node, nodeFields, nodeName } }) => {
  useEffect(() => Prism.highlightAll(), []);

  // poll for url
  // if different update state

  const [query, updateQuery] = useState(
    `%7B%0A%20%20allNode${nodeName}%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A`
  );
  const code = `
  import React from 'react';
  import { query } from 'gatsby';

  import Layout from '../components/Layout';
  
  export default ({ pageContext: { node } }) => (
    <Layout headerTitle='title'>
      <h3>Page Template</h3>
      {JSON.stringify(node)}
    </Layout>
  );

  export const query = graphql(\`${decodeURIComponent(query)}\`)
  `;
  const graphQl = useRef();
  useEffect(() => {
    setInterval(() => {
      console.log(graphQl.current.contentWindow.location.search);
    }, 3000);
  }, []);
  return (
    <Layout headerTitle={`Entity: ${node.drupal_internal__type}`}>
      <h3>Fields on this entity type:</h3>
      <ul>
        {nodeFields.type.fields.map(field => (
          <li key={field.name}>{field.name}</li>
        ))}
      </ul>
      <iframe
        ref={graphQl}
        title="graphiql"
        onReset={e => console.log(e.target)}
        src={`http://localhost:8000/___graphql?query=${query}&variables=&explorerIsOpen=false`}
        height="800px"
      />
      <pre>
        <code className="language-javascript">{code}</code>
      </pre>
      \
    </Layout>
  );
};
