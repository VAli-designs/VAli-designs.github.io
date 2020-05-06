/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import PageHead from '../components/PageHead';
import GlobalStyles from '../components/GlobalStyles';
import HeaderMenu, {
  HEADER_HEIGHT,
  HEADER_MOBILE_HEIGHT,
} from '../components/HeaderMenu';
import Footer from '../components/Footer';
import {
  fonts,
  fontSizes,
  fontWeights,
  linkStyle,
  colors,
  mediaQuery,
  boxShadow,
} from '../theme';
import formatDate from '../utils/formatDate';
import PostHtmlRenderer from '../components/PostHtmlRenderer';

const BlogPage = ({
  data: {
    markdownRemark: {
      frontmatter: { metaDescription, metaTitle, title, readMoreText },
    },
    allMarkdownRemark,
  },
}) => {
  return (
    <>
      <PageHead description={metaDescription} title={metaTitle} />
      <GlobalStyles />
      <HeaderMenu />
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: HEADER_HEIGHT + 80,
          alignItems: 'center',
          marginBottom: 60,
          [mediaQuery.notDesktop]: {
            marginTop: HEADER_MOBILE_HEIGHT + 30,
            marginBottom: 10,
            paddingLeft: 40,
            paddingRight: 40,
            height: 'auto',
          },
        }}
      >
        <h1
          css={{
            fontFamily: fonts.title,
            fontWeight: fontWeights.regular,
            fontSize: fontSizes.title,
            textAlign: 'center',
            marginBottom: 80,
            [mediaQuery.notDesktop]: { marginBottom: 40 },
          }}
        >
          {title}
        </h1>
        {allMarkdownRemark.nodes.map(
          ({
            parent: { name },
            frontmatter: {
              title,
              mainImage,
              mainImageTitle,
              mainImageAlt,
              date,
              author,
              excerpt,
            },
          }) => (
            <div
              key={name}
              css={{
                display: 'flex',
                position: 'relative',
                width: 1020,
                height: 420,
                marginBottom: 40,
                padding: 40,
                boxShadow,
                [mediaQuery.notDesktop]: {
                  width: 'auto',
                  height: 'auto',
                  flexDirection: 'column',
                },

                [mediaQuery.smartphone]: {
                  marginBottom: 60,
                },
              }}
            >
              <Img
                css={{
                  width: '40%',
                  [mediaQuery.notDesktop]: {
                    width: '100%',
                    height: 'calc(2*(100vw - 80px) / 3)',
                    marginBottom: 30,
                  },
                }}
                fluid={mainImage.childImageSharp.fluid}
                alt={mainImageAlt}
                title={mainImageTitle}
              />
              <div
                css={{
                  width: '60%',
                  paddingLeft: 30,
                  paddingRight: 30,
                  fontSize: fontSizes.medium,
                  display: 'flex',
                  flexDirection: 'column',
                  [mediaQuery.notDesktop]: {
                    width: 'auto',
                    padding: 0,
                  },
                }}
              >
                <h2
                  css={{
                    fontFamily: fonts.title,
                    fontWeight: fontWeights.regular,
                    fontSize: fontSizes.larger,
                  }}
                >
                  <Link
                    to={`/resources/${name}`}
                    css={{
                      color: colors.dark,
                      textDecoration: 'none',
                      ':hover,:focus,:active': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {title}
                  </Link>
                </h2>
                <p
                  css={{
                    fontSize: fontSizes.normal,
                    fontStyle: 'italic',
                    color: colors.darkGrey,
                    marginBottom: 20,
                  }}
                >
                  <span css={{ color: colors.dark, fontStyle: 'normal' }}>
                    By {author}
                  </span>
                  <br />
                  <span>{formatDate(date)}</span>
                </p>
                <PostHtmlRenderer
                  css={{ flex: 1, fontSize: fontSizes.normal }}
                  html={excerpt}
                />
                <Link
                  to={`/blog/${name}`}
                  css={[
                    linkStyle(colors.orange, colors.pink),
                    {
                      alignSelf: 'flex-start',
                      [mediaQuery.notDesktop]: {
                        marginTop: 20,
                      },
                    },
                  ]}
                >
                  {readMoreText}
                </Link>
              </div>
            </div>
          ),
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/pages/blog.md/" }) {
      frontmatter {
        metaDescription
        metaTitle
        title
        readMoreText
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//blog/.*[.]md/" } }
    ) {
      nodes {
        parent {
          ... on File {
            name
          }
        }
        frontmatter {
          mainImage {
            childImageSharp {
              fluid(maxWidth: 1400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          mainImageTitle
          mainImageAlt
          title
          date
          author
          excerpt
        }
      }
    }
  }
`;
