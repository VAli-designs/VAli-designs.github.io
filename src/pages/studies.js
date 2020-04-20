/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import PageHead from '../components/PageHead';
import GlobalStyles from '../components/GlobalStyles';
import HeaderMenu, { HEADER_HEIGHT } from '../components/HeaderMenu';
import Footer from '../components/Footer';
import GetInTouch from '../components/GetInTouch';
import { fonts, fontSizes, fontWeights, linkStyle, colors } from '../theme';

const StudiesPage = ({
  data: {
    markdownRemark: {
      frontmatter: { title, metaDescription, metaTitle, discoverButtonText },
    },
    allMarkdownRemark,
  },
}) => {
  const studies = allMarkdownRemark.nodes
    .map(({ frontmatter, parent }) => ({
      ...frontmatter,
      slug: parent.relativeDirectory,
    }))
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
        }}
      >
        <h1
          css={{
            fontFamily: fonts.title,
            fontWeight: fontWeights.regular,
            fontSize: fontSizes.title,
            textAlign: 'center',
            marginBottom: 80,
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
            slug,
            excerpt,
          }) => (
            <div
              css={{
                display: 'flex',
                width: 980,
                height: 440,
                marginBottom: 60,
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
                }}
              >
                <h2
                  css={{
                    fontFamily: fonts.title,
                    fontWeight: fontWeights.regular,
                    fontSize: fontSizes.larger,
                    marginBottom: 40,
                  }}
                >
                  {title}
                </h2>
                <p
                  css={{ flex: 1 }}
                  dangerouslySetInnerHTML={{
                    __html: excerpt.childMarkdownRemark.html,
                  }}
                />
                <Link
                  to={`/studies/${slug}`}
                  css={[
                    linkStyle(colors.lightGrey, colors.text),
                    { color: colors.dark, alignSelf: 'center' },
                  ]}
                >
                  {discoverButtonText}
                </Link>
              </div>
              <Img
                css={{ width: '65%' }}
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
      filter: { fileAbsolutePath: { regex: "//studies/.*index.md/" } }
    ) {
      nodes {
        parent {
          ... on File {
            relativeDirectory
          }
        }
        frontmatter {
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
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
