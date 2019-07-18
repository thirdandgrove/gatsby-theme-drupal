import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';

export default ({ data }) => {
  const entityTypes = data.allSitePage.nodes.reduce((acc, node) => {
    const entityType = node.path.split('/')[1];
    if (
      entityType &&
      !acc.includes(entityType) &&
      entityType !== 'dev-404-page'
    ) {
      acc.push(entityType);
    }
    return acc;
  }, []);

  return (
    <Layout>
      <h1>Entity Types</h1>
      <ul>
        {entityTypes.map(entity => (
          <li key={entity}>{entity}</li>
        ))}
      </ul>
      <h1>Routes</h1>
      <ul>
        {data.allSitePage.nodes.map(node => (
          <li key={node.path}>
            <Link to={node.path}>{node.path}</Link>
          </li>
        ))}
      </ul>
      <ul>
        <li>describe component shadowing</li>
        <li>show how to route</li>
        <li>show how to query</li>
        <li>show how to template and generate dynamic pages</li>
      </ul>
    </Layout>
  );
};

export const query = graphql`
  {
    allSitePage {
      nodes {
        path
      }
    }
  }
`;
