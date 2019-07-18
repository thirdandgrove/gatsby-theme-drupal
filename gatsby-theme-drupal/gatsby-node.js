exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const entityTemplate = require.resolve(`./src/templates/entityTemplate.js`);

  const entityTypes = await graphql(`
    {
      allNodeTypeNodeType {
        nodes {
          name
          drupal_internal__type
        }
        totalCount
      }
    }
  `);

  await Promise.all(
    entityTypes.data.allNodeTypeNodeType.nodes.map(async node => {
      const nodeName =
        node.drupal_internal__type.charAt(0).toUpperCase() +
        node.drupal_internal__type.slice(1);

      const nodes = await graphql(`{
      allNode${nodeName} {
        nodes {
          id
          title
          path {
            alias
          }
        }
      }
    }`);

      nodes.data[`allNode${nodeName}`].nodes.forEach(element =>
        createPage({
          path: element.path.alias,
          component: entityTemplate,
          context: {
            element
          }
        })
      );
    })
  );
};
