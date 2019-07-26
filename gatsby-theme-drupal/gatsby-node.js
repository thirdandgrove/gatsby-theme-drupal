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
  const nodeTemplate = require.resolve(`./src/templates/nodeTemplate.js`);

  // path.join using absolute path to site root path.
  // resolve to see if the template exists
  // delete require.cache[require.resolve("./module")];

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

  const allFieldsPerType = await graphql(`
    {
      __schema {
        queryType {
          fields {
            name
            type {
              name
              fields {
                name
              }
            }
          }
        }
      }
    }
  `);

  await Promise.all(
    entityTypes.data.allNodeTypeNodeType.nodes.map(async node => {
      const nodeName = snakeToPascal(node.drupal_internal__type);
      const nodeFields = allFieldsPerType.data.__schema.queryType.fields.find(
        type => type.name === `node${nodeName}`
      );

      // create pages for entity type
      createPage({
        path: `${node.drupal_internal__type}`,
        component: entityTemplate,
        context: {
          node,
          nodeFields,
          nodeName
        }
      });

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

      // create pages for individual entities
      nodes.data[`allNode${nodeName}`].nodes.forEach(element =>
        createPage({
          path: element.path.alias,
          component: nodeTemplate,
          context: {
            element,
            nodeName,
            nodeFields
          }
        })
      );
    })
  );
};
