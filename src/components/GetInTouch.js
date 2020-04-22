/* eslint-disable react/no-danger */
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import {
  colors,
  linkStyle,
  fonts,
  fontWeights,
  fontSizes,
  mediaQuery,
} from '../theme';

const GetInTouch = () => {
  const {
    markdownRemark: {
      html,
      frontmatter: { bgImage, bgImageAlt, bgImageTitle, title, buttonText },
    },
  } = useStaticQuery(graphql`
    query {
      markdownRemark(
        fileAbsolutePath: { regex: "/components/get-intouch.md/" }
      ) {
        html
        frontmatter {
          bgImage {
            childImageSharp {
              fluid(maxWidth: 3000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          bgImageAlt
          bgImageTitle
          title
          buttonText
        }
      }
    }
  `);

  return (
    <section
      title={title}
      css={{
        height: 400,
        position: 'relative',
        [mediaQuery.notDesktop]: { height: 300 },
      }}
    >
      <Img
        fluid={bgImage.childImageSharp.fluid}
        style={{ position: 'absolute', height: '100%', width: '100%' }}
        title={bgImageTitle}
        alt={bgImageAlt}
      />
      <div
        css={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 40,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h2
          css={{
            fontFamily: fonts.title,
            fontWeight: fontWeights.regular,
            fontSize: fontSizes.title,
            fontStyle: 'italic',
            letterSpacing: 5,
            marginBottom: 40,
          }}
        >
          {title}
        </h2>
        <p
          dangerouslySetInnerHTML={{ __html: html }}
          css={{ flex: 1, fontSize: fontSizes.large }}
        />
        <a
          href="/contact"
          css={[
            linkStyle(colors.green, colors.blue),
            { marginTop: 30, alignSelf: 'center' },
          ]}
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
};

export default GetInTouch;
