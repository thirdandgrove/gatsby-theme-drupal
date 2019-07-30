# Gatsby Theme Drupal

a gatsby theme for your Drupal content
![](https://github.com/thirdandgrove/gatsby-theme-drupal/blob/master/readme-preview.png)

## Installation

`yarn add gatsby-source-drupal`

## Setup

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

## Usage

This theme will show the data in your Drupal instance and allow you to create queries and templates for this data. You can continue to use this theme or once your content has templates in place you can install gatsby-source-drupal and use it directly in place of this plugin.

## Gotchas and Caveats

If you use JSON API extras there is a chance the node names have diverged from the default `node__type` convention used by JSON API. This will cause an issue with resolving these types in this theme. The content is in the GraphQl schema but will require manual research to find those nodes.

Another convention that this theme relies on is the provision of paths from Drupal. when querying entities that data is required. if it is not exposed or does not exist the result will be ...suboptimal(it will break).

## todo

- [ ] Establish component naming convention for shadowing
- [ ] skip templates for shadowed components
- [ ] parse queried fields and add to component stub
- [ ] render template with react-live (data plumbing?)
