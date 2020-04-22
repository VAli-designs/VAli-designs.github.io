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
import GetInTouch from '../components/GetInTouch';
import {
  fonts,
  fontSizes,
  fontWeights,
  linkStyle,
  colors,
  mediaQuery,
} from '../theme';

const StudiesPage = ({
  data: {
    markdownRemark: {
      frontmatter: { title, metaDescription, metaTitle, discoverButtonText },
    },
    allMarkdownRemark,
  },
}) => {
  const studies = allMarkdownRemark.nodes
    .map(({ frontmatter }) => frontmatter)
    .sort((a, b) => a.order - b.order);

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
        {studies.map(
          ({
            title,
            color,
            mainImage,
            mainImageTitle,
            mainImageAlt,
            id,
            excerpt,
          }) => (
            <div
              css={{
                display: 'flex',
                position: 'relative',
                width: 980,
                height: 440,
                marginBottom: 60,
                [mediaQuery.notDesktop]: {
                  width: 'auto',
                  height: 'auto',
                  flexDirection: 'column',
                  marginBottom: 30,
                },
              }}
            >
              <div
                css={{
                  background: color,
                  color: 'white',
                  width: '35%',
                  padding: 30,
                  fontSize: fontSizes.medium,
                  display: 'flex',
                  flexDirection: 'column',
                  [mediaQuery.notDesktop]: {
                    width: 'auto',
                  },
                }}
              >
                <h2
                  css={{
                    fontFamily: fonts.title,
                    fontWeight: fontWeights.regular,
                    fontSize: fontSizes.larger,
                    marginBottom: 40,
                    [mediaQuery.notDesktop]: {
                      marginBottom: 'calc((100vw - 80px) / 2 + 40px)',
                    },
                  }}
                >
                  {title}
                </h2>
                <p
                  css={{ flex: 1 }}
                  dangerouslySetInnerHTML={{
                    __html: excerpt.body,
                  }}
                />
                <Link
                  to={`/studies/${id}`}
                  css={[
                    linkStyle(colors.lightGrey, colors.text),
                    {
                      color: colors.dark,
                      alignSelf: 'center',
                      [mediaQuery.notDesktop]: {
                        alignSelf: 'flex-start',
                        marginTop: 20,
                      },
                    },
                  ]}
                >
                  {discoverButtonText}
                </Link>
              </div>
              <Img
                css={{
                  width: '65%',
                  [mediaQuery.notDesktop]: {
                    width: '100%',
                    height: 'calc((100vw - 80px) / 2)',
                    position: 'absolute !important',
                    top: 90,
                    left: 0,
                  },
                }}
                fluid={mainImage.childImageSharp.fluid}
                alt={mainImageAlt}
                title={mainImageTitle}
              />
            </div>
          ),
        )}
      </div>
      <GetInTouch />
      <Footer />
    </>
  );
};

export default StudiesPage;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/pages/studies.md/" }) {
      frontmatter {
        metaDescription
        metaTitle
        title
        discoverButtonText
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//studies/.*[.]md/" } }
    ) {
      nodes {
        frontmatter {
          id
          title
          color
          order
          mainImage {
            childImageSharp {
              fluid(maxWidth: 1400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          mainImageTitle
          mainImageAlt
          excerpt {
            body
          }
        }
      }
    }
  }
`;
