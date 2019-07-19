exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  function snakeToPascal(str) {
    str += '';
    str = str.split('_');
    for (var i = 0; i < str.length; i++) {
      str[i] =
        str[i].slice(0, 1).toUpperCase() + str[i].slice(1, str[i].length);
    }
    return str.join('');
  }

  const entityTemplate = require.resolve(`./src/templates/entityTemplate.js`);

  const entityTypes = await graphql(`
    {
      allNodeTypeNodeType {
        nodes {
          name
          drupal_internal__type
        }
      }
    }
  `);

  await Promise.all(
    entityTypes.data.allNodeTypeNodeType.nodes.map(async node => {
      const nodeName = snakeToPascal(node.drupal_internal__type);

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
