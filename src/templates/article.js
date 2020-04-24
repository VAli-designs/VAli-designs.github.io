/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PageHead from '../components/PageHead';
import GlobalStyles from '../components/GlobalStyles';
import HeaderMenu, {
  HEADER_HEIGHT,
  HEADER_MOBILE_HEIGHT,
} from '../components/HeaderMenu';
import Footer from '../components/Footer';
import { fonts, fontSizes, fontWeights, colors, mediaQuery } from '../theme';
import formatDate from '../utils/formatDate';
import PostHtmlRenderer from '../components/PostHtmlRenderer';

const ArticlePage = ({
  data: {
    markdownRemark: {
      frontmatter: {
        metaTitle,
        metaDescription,
        title,
        date,
        mainImage,
        mainImageTitle,
        mainImageAlt,
        author,
      },
      html,
    },
  },
}) => (
  <>
    <PageHead description={metaDescription} title={metaTitle} />
    <GlobalStyles />
    <HeaderMenu />
    <div>
      <Img
        css={{
          display: 'block',
          width: 'calc(100vw - 80px)',
          maxWidth: 1600,
          maxHeight: '40vh',
          overflow: 'hidden',
          margin: `${HEADER_HEIGHT + 40}px auto 60px`,
          [mediaQuery.notDesktop]: {
            margin: `${HEADER_MOBILE_HEIGHT + 40}px auto 60px`,
          },
        }}
        fluid={mainImage.childImageSharp.fluid}
        alt={mainImageAlt}
        title={mainImageTitle}
      />
      <div
        css={{
          maxWidth: 840,
          padding: '0 40px',
          margin: 'auto',
        }}
      >
        <div
          css={{
            marginBottom: 60,
            [mediaQuery.notDesktop]: {
              marginBottom: 40,
            },
          }}
        >
          <h1
            css={{
              fontFamily: fonts.title,
              fontWeight: fontWeights.regular,
              fontSize: fontSizes.title,
            }}
          >
            {title}
          </h1>
          <p
            css={{
              fontSize: fontSizes.normal,
              fontStyle: 'italic',
              color: colors.darkGrey,
            }}
          >
            <span css={{ color: colors.dark, fontStyle: 'normal' }}>
              By {author}
            </span>
            <br />
            <span>{formatDate(date)}</span>
          </p>
        </div>
        <PostHtmlRenderer
          html={html}
          css={{
            marginBottom: 160,
            [mediaQuery.smartphone]: {
              marginBottom: 80,
            },
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <Footer />
    </div>
  </>
);
export default ArticlePage;

export const pageQuery = graphql`
  query($sourcePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $sourcePath }) {
      frontmatter {
        metaTitle
        metaDescription
        title
        date
        mainImage {
          childImageSharp {
            fluid(maxWidth: 2560) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainImageAlt
        mainImageTitle
        author
      }
      html
    }
  }
`;
