/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PageHead from '../components/PageHead';
import GlobalStyles from '../components/GlobalStyles';
import HeaderMenu, { HEADER_HEIGHT } from '../components/HeaderMenu';
import Footer from '../components/Footer';
import GetInTouch from '../components/GetInTouch';
import { fonts, fontSizes, fontWeights, colors, mediaQuery } from '../theme';

const StudyPageTemplate = ({
  data: {
    markdownRemark: {
      frontmatter: {
        title,
        subTitle,
        color,
        mainImage,
        mainImageTitle,
        mainImageAlt,
        clientNeedsTitle,
        clientNeedsContent,
        steps,
      },
      html,
    },
  },
}) => (
  <>
    <PageHead description={title} title={title} />
    <GlobalStyles />
    <HeaderMenu />
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: HEADER_HEIGHT + 80,
      }}
    >
      <h1
        css={{
          fontFamily: fonts.title,
          fontWeight: fontWeights.regular,
          fontSize: fontSizes.title,
          textAlign: 'left',
          marginBottom: 40,
          paddingLeft: 120,
        }}
      >
        {title}
      </h1>
      <div
        css={{
          display: 'flex',
          marginBottom: 60,
          paddingLeft: 120,
          paddingRight: 120,
          [mediaQuery.notDesktop]: {
            paddingLeft: 40,
            paddingRight: 40,
          },
        }}
      >
        <div
          css={{
            width: '60%',
            marginRight: 60,
            fontSize: fontSizes.medium,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2
            css={{
              color,
              fontFamily: fonts.title,
              fontWeight: fontWeights.regular,
              fontSize: fontSizes.larger,
              marginBottom: 20,
            }}
          >
            {subTitle}
          </h2>
          <p
            css={{ flex: 1 }}
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        </div>
        <Img
          css={{ flex: 1, maxHeight: 500 }}
          fluid={mainImage.childImageSharp.fluid}
          alt={mainImageAlt}
          title={mainImageTitle}
        />
      </div>
    </div>
    <section
      title="client's need"
      css={{
        textAlign: 'center',
        padding: 40,
        color: 'white',
        background: color,
      }}
    >
      <h2
        css={{
          marginBottom: 40,
          fontSize: fontSizes.smallTitle,
          fontFamily: fonts.title,
        }}
      >
        {clientNeedsTitle}
      </h2>
      <p css={{ fontSize: fontSizes.medium, width: '70%', margin: 'auto' }}>
        {clientNeedsContent}
      </p>
    </section>
    <h3
      css={{
        fontFamily: fonts.title,
        fontWeight: fontWeights.regular,
        fontSize: fontSizes.title,
        textAlign: 'left',
        margin: '80px 120px  20px',
      }}
    >
      All About the process - {steps.length} steps
    </h3>
    {steps.map(
      (
        {
          childMarkdownRemark: {
            frontmatter: { title, image, imageAlt, imageTitle },
            html,
          },
        },
        index,
      ) => (
        <section
          key={index}
          css={{
            display: 'flex',
            paddingBottom: 70,
            paddingTop: 50,
            paddingLeft: 120,
            paddingRight: 120,
            [mediaQuery.notDesktop]: {
              paddingLeft: 40,
              paddingRight: 40,
            },
            justifyContent: 'center',
            background: index < steps.length - 1 ? 'none' : colors.lightGrey,
          }}
        >
          <div
            css={{
              width: image ? '50%' : '60%',
              marginRight: 60,
              fontSize: fontSizes.medium,
              display: 'flex',
              flexDirection: 'column',
              textAlign: image ? 'left' : 'center',
            }}
          >
            <h3
              css={{
                color,
                fontFamily: fonts.title,
                fontWeight: fontWeights.regular,
                fontSize: fontSizes.title,
                marginBottom: 40,
              }}
            >
              {index + 1}/{steps.length} <br />
              {title}
            </h3>
            <p
              css={{ flex: 1 }}
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />
          </div>
          {image && (
            <Img
              css={{ flex: 1, maxHeight: 440 }}
              fluid={image.childImageSharp.fluid}
              alt={imageAlt}
              title={imageTitle}
            />
          )}
        </section>
      ),
    )}
    <GetInTouch />
    <Footer />
  </>
);

export default StudyPageTemplate;

export const pageQuery = graphql`
  query($sourcePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $sourcePath }) {
      frontmatter {
        title
        subTitle
        color
        mainImage {
          childImageSharp {
            fluid(maxWidth: 1400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainImageTitle
        mainImageAlt
        clientNeedsTitle
        clientNeedsContent
        steps {
          childMarkdownRemark {
            frontmatter {
              title
              image {
                childImageSharp {
                  fluid(maxWidth: 1400) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              imageAlt
              imageTitle
            }
            html
          }
        }
      }
      html
    }
  }
`;
