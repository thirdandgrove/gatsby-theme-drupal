import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';

export default ({ data }) => (
  <Layout>
    <h1>Entity Types</h1>
    <p>
      These pages will give you a starter template for creating pages from
      Drupal content
    </p>
    <ul>
      {data.allNodeTypeNodeType.nodes.map(entity => (
        <li key={entity.drupal_internal__type}>
          <Link to={`/${entity.drupal_internal__type}`}>{entity.name}</Link>
        </li>
      ))}
    </ul>
    <h1>Content</h1>
    <p>Select a piece of content to explore it's schema</p>
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

export const query = graphql`
  {
    allSitePage {
      nodes {
        path
      }
    }
    allNodeTypeNodeType {
      nodes {
        name
        drupal_internal__type
      }
      totalCount
    }
  }
`;
