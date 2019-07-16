require('dotenv').config();

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-drupal',
      options: {
        baseUrl: process.env.DRUPAL_URL
      }
    }
  ]
};
