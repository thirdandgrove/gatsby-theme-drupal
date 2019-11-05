import React, { useState } from 'react';

import Layout from '../components/Layout';
import Code from '../components/Code';
import LiveGraphql from '../components/LiveGraphql';

export default ({ pageContext: { node, nodeFields, nodeName } }) => {
  const [query, updateQuery] = useState(
    `%7B%0A%20%20allNode${nodeName}%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A`
  );

  const templateCode = (q, entity) => `
  // Component in src/templates/${entity}Template.js
  import React from 'react';
  import { graphql } from 'gatsby';

  import Layout from '../components/Layout';

  export default ({ data }) => (
    <Layout headerTitle='title'>
      <h3>${entity} Template</h3>
      {JSON.stringify(data)}
    </Layout>
  );

  export query = graphql\`
  query($${entity}ID: String!)${decodeURIComponent(
    q.replace(`allNode${entity}`, `node${entity}(id: { eq: $${entity}ID })`)
  )}\`
  `;

  const nodeCode = (q, entity) => `
  // Add these lines to your gatsby-node.js file
  const ${entity} = await graphql(\`{
    allNode${entity} {
      nodes {
        id
        path {
          alias
        }
      }
    }
  }
  \`)

  const ${entity}Template = require.resolve(\`./src/templates/${entity}Template.js\`);

  ${entity}.data.allNode${entity}.nodes.map(node => {
    createPage({
      path: node.path.alias,
      component: ${entity}Template,
      context: {
        ${entity}ID: node.id
      }
  })
  `;

  return (
    <Layout headerTitle={`Entity: ${node.drupal_internal__type}`}>
      <p>
        Explanation of component shadowing and using gatsby-node to generate
        pages programmatically
      </p>
      <div style={{ display: 'flex' }}>
        <Code code={templateCode(query, nodeName)} />
        <Code code={nodeCode(query, nodeName)} />
        <span>
          <h3>Fields on this entity type:</h3>
          <ul>
            {nodeFields.type.fields.map(field => (
              <li key={field.name}>{field.name}</li>
            ))}
          </ul>
        </span>
      </div>
      <LiveGraphql
        query={query}
        updateQuery={updateQuery}
        src={`${window.location.origin}/___graphql?query=%7B%0A%20%20allNode${nodeName}%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&variables=&explorerIsOpen=false`}
      />
    </Layout>
  );
};
