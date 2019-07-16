require('dotenv').config();

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-drupal',
      options: {
        baseUrl: process.env.DRUPAL_URL,
        basicAuth: {
          username: process.env.BASIC_AUTH_USERNAME,
          password: process.env.BASIC_AUTH_PASSWORD
        }
      }
    }
  ]
};
