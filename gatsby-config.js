/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require('path');

module.exports = {
  siteMetadata: {
    email: 'contact@allaboutusers.com',
    phone: '+330756997541',
    phoneDisplay: '+33 07 56 99 75 41',
    linkedIn: 'http://www.linkedin.com/company/AllAboutUsers',
    medium: 'http://www.medium.com/AllAboutUsers',
    twitter: 'http://www.twitter.com/AllAboutUsers',
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: path.join(__dirname, 'content', 'pages'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'components',
        path: path.join(__dirname, 'content', 'components'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'studies',
        path: path.join(__dirname, 'content', 'studies'),
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 2500,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `All About Users`,
        short_name: `All About Users`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `browser`,
        icon: `src/img/logo.png`,
      },
    },
  ],
};
