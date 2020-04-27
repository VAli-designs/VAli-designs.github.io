/* eslint-disable react/no-danger */
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
import GetInTouch from '../components/GetInTouch';
import { fonts, fontSizes, fontWeights, colors, mediaQuery } from '../theme';

const StudyPageTemplate = ({
  data: {
    markdownRemark: {
      frontmatter: {
        metaTitle,
        metaDescription,
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
    <PageHead description={metaDescription} title={metaTitle} />
    <GlobalStyles />
    <HeaderMenu />
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: HEADER_HEIGHT + 80,
        [mediaQuery.notDesktop]: {
          marginTop: HEADER_MOBILE_HEIGHT + 30,
        },
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
          [mediaQuery.notDesktop]: {
            marginBottom: 30,
            textAlign: 'center',
            padding: '0 40px',
          },
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
            marginBottom: 30,
            flexDirection: 'column-reverse',
            alignItems: 'center',
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
            maxWidth: 800,
            [mediaQuery.notDesktop]: {
              width: 'auto',
              marginRight: 0,
            },
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
          <div
            css={{ flex: 1 }}
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        </div>
        <Img
          css={{
            flex: 1,
            maxHeight: 500,
            [mediaQuery.notDesktop]: {
              flex: 0,
              width: 'calc(100vw - 80px)',
              maxWidth: 800,
              maxHeight: 'calc(9 * (100vw - 80px) / 16)',
              marginBottom: 20,
              overflow: 'hidden',
            },
          }}
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
        padding: 60,
        color: 'white',
        background: color,
        [mediaQuery.smartphone]: {
          padding: 30,
        },
      }}
    >
      <h2
        css={{
          marginBottom: 40,
          fontSize: fontSizes.smallTitle,
          fontFamily: fonts.title,
          [mediaQuery.notDesktop]: {
            marginBottom: 20,
          },
          [mediaQuery.smartphone]: {
            fontSize: fontSizes.larger,
          },
        }}
      >
        {clientNeedsTitle}
      </h2>
      <p
        css={{
          fontSize: fontSizes.medium,
          width: '70%',
          maxWidth: 800,
          margin: 'auto',
          [mediaQuery.notDesktop]: {
            width: 'auto',
          },
        }}
      >
        {clientNeedsContent}
      </p>
    </section>
    <h3
      css={{
        fontFamily: fonts.title,
        fontWeight: fontWeights.regular,
        fontSize: fontSizes.title,
        margin: '80px 120px  20px',
        textAlign: 'center',
        [mediaQuery.notDesktop]: {
          margin: '30px 40px',
        },
        [mediaQuery.smartphone]: {
          fontSize: fontSizes.larger,
        },
      }}
    >
      All About the process - {steps.length} steps
    </h3>
    {steps.map(({ title, image, imageAlt, imageTitle, body }, index) => (
      <section
        key={index}
        css={[
          {
            display: 'flex',
            paddingBottom: 70,
            paddingTop: 50,
            marginLeft: 120,
            marginRight: 120,
            maxWidth: 1400,
            justifyContent: 'space-around',
            [mediaQuery.bigDesktop]: {
              margin: 'auto',
            },
            [mediaQuery.notDesktop]: {
              paddingTop: 0,
              marginLeft: 40,
              marginRight: 40,
              marginBottom: 40,
              paddingBottom: 0,
              flexDirection: 'column',
            },
          },
          index === steps.length - 1 && {
            background: colors.lightGrey,
            [mediaQuery.desktop]: {
              marginBottom: '120px !important',
            },
          },
        ]}
      >
        <div
          css={[
            {
              width: '50%',
              marginRight: 60,
              fontSize: fontSizes.medium,
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 700,
              [mediaQuery.notDesktop]: {
                width: 'auto !important',
                textAlign: 'center',
                marginRight: 0,
                marginBottom: 20,
                maxWidth: 'none',
              },
            },
            !image && {
              width: '60%',
              marginRight: 0,
              marginBottom: '0 !important',
              textAlign: 'center',
              alignItems: 'center',
              [mediaQuery.notDesktop]: {
                padding: 20,
              },
            },
          ]}
        >
          <h3
            css={{
              color,
              fontFamily: fonts.title,
              fontWeight: fontWeights.regular,
              fontSize: fontSizes.title,
              marginBottom: 40,
              [mediaQuery.notDesktop]: {
                marginBottom: 20,
              },
              [mediaQuery.smartphone]: {
                fontSize: fontSizes.larger,
              },
            }}
          >
            {index + 1}/{steps.length} <br />
            {title}
          </h3>
          <div css={{ flex: 1 }} dangerouslySetInnerHTML={{ __html: body }} />
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
    ))}
    <GetInTouch />
    <Footer />
  </>
);

export default StudyPageTemplate;

export const pageQuery = graphql`
  query($sourcePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $sourcePath }) {
      frontmatter {
        metaTitle
        metaDescription
        title
        subTitle
        color
        mainImage {
          childImageSharp {
            fluid(maxWidth: 2560) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainImageTitle
        mainImageAlt
        clientNeedsTitle
        clientNeedsContent
        steps {
          title
          image {
            childImageSharp {
              fluid(maxWidth: 2560) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          imageAlt
          imageTitle
          body
        }
      }
      html
    }
  }
`;
