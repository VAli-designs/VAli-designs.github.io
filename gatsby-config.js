/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require('path');

module.exports = {
  siteMetadata: {
    email: 'contact@allaboutusers.fr',
    phone: '+330756997541',
    phoneDisplay: '+33 07 56 99 75 41',
    linkedIn: 'https://www.linkedin.com/company/allaboutusersfr',
    twitter: 'https://twitter.com/AllAboutUsersfr',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Forum`,
            subsets: [`latin`],
            variants: [`400`, `400i`],
          },
          {
            family: `Playfair Display`,
            subsets: [`latin`],
            variants: [`400`, `400i`, `600`, `600i`],
          },
          {
            family: `Source Sans Pro`,
            variants: [`400`, `400i`, `600`, `600i`, `700`, `700i`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-165856029-1',
        anonymize: true,
        respectDNT: true,
        exclude: ['/preview/**', '/admin/**'],
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/index.js`,
      },
    },
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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: path.join(__dirname, 'content', 'blog'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: path.join(__dirname, 'content', 'img'),
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
