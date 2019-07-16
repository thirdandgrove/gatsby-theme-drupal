module.exports = options => {
  return {
    plugins: [
      {
        resolve: 'gatsby-plugin-page-creator',
        options: { path: `${__dirname}/src/pages` }
      },
      { resolve: 'gatsby-source-drupal', options }
    ]
  };
};
