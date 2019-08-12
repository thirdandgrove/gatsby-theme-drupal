module.exports = options => {
  return {
    plugins: [
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      {
        resolve: 'gatsby-plugin-page-creator',
        options: { path: `${__dirname}/src/pages` }
      },
      { resolve: 'gatsby-source-drupal', options }
    ]
  };
};
