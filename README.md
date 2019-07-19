# Gatsby Theme Drupal

a gatsby theme to connect you to your Drupal backend

## Installation

`yarn add gatsby-source-drupal`

## Usage

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-drupal`,
      options: {
        baseUrl: `https://live-drupal-cms.pantheonsite.io/`
      }
    }
  ]
};
```

for more options see the [Drupal Source Plugin](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-drupal)

## Gotchas and Caveats

if you use JSON API extras there is a chance the node names have diverged from the default `node__type` convention used by JSON API. This will cause these types not to appear in this theme. The content is in the GraphQl schema but will require manual research to find those nodes.
