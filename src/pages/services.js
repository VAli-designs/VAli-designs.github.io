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
import { mediaQuery, colors, fonts, fontSizes, fontWeights } from '../theme';
import TargetedUsers from '../components/TargetedUsers';

const ServicePage = ({
  data: {
    markdownRemark: {
      content,
      frontmatter: {
        metaDescription,
        metaTitle,
        title,
        subTitle,
        firstLame,
        cards,
        otherLames,
        processDescr,
      },
    },
  },
}) => (
  <>
    <PageHead description={metaDescription} title={metaTitle} />
    <GlobalStyles />
    <HeaderMenu />
    <section
      title={title}
      css={{
        height: `calc(90vh - ${HEADER_HEIGHT}px)`,
        minHeight: 500,
        marginTop: HEADER_HEIGHT + 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: 120,
        paddingRight: 120,
        [mediaQuery.notDesktop]: {
          marginTop: HEADER_MOBILE_HEIGHT + 30,
          marginBottom: 30,
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
          marginBottom: 40,
        }}
      >
        {title}
      </h1>
      <h2
        css={{
          fontFamily: fonts.title,
          fontWeight: fontWeights.semibold,
          fontSize: fontSizes.larger,
          marginBottom: 40,
        }}
      >
        {subTitle}
      </h2>
      <div
        css={{ fontSize: fontSizes.large }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
    <Lame lame={{ ...firstLame, color: colors.cyan }} />
    <section
      css={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        marginTop: 120,
        marginBottom: 120,
        [mediaQuery.notDesktop]: {
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 30,
          marginTop: 30,
          paddingLeft: 40,
          paddingRight: 40,
        },
      }}
    >
      {cards.map(({ title, image, imageAlt, imageTitle, content }, index) => (
        <div
          key={index}
          css={{
            width: `calc(100vw / ${cards.length} - 200px)`,
            textAlign: 'center',
            fontSize: fontSizes.medium,
            [mediaQuery.desktop]: {
              ':not(:last-of-type)': {
                marginRight: 100,
              },
            },
            [mediaQuery.notDesktop]: {
              width: 'auto',
              marginBottom: 30,
              textAlign: 'center',
            },
          }}
        >
          <Img
            css={{
              display: 'inline-block',
              width: `calc(100vw / ${cards.length} - 200px)`,
              height: `calc(2 * (100vh - ${HEADER_HEIGHT}px) / 3)`,
              [mediaQuery.notDesktop]: {
                width: `calc(100vw - 40px)`,
                height: `calc(2 * (100vw - 40px) / 3)`,
              },
            }}
            imgStyle={{ objectPosition: 'top center' }}
            fluid={image.childImageSharp.fluid}
            title={imageTitle}
            alt={imageAlt}
          />
          <h3
            css={{
              fontFamily: fonts.title,
              fontWeight: fontWeights.semibold,
              fontSize: fontSizes.large,
              margin: '10px 0 ',
            }}
          >
            {title}
          </h3>
          {content}
        </div>
      ))}
    </section>
    {otherLames.map((lame, index) => (
      <Lame
        lame={lame}
        key={index}
        inverted={index % 2 === 1}
        css={{
          marginBottom: 120,
          [mediaQuery.notDesktop]: {
            marginBottom: 30,
          },
        }}
      />
    ))}
    <section
      title={processDescr.title}
      css={{
        padding: '0 0 120px',
        width: 900,
        margin: 'auto',
        [mediaQuery.notDesktop]: {
          padding: '30px  40px',
          width: 'auto',
          margin: 0,
        },
      }}
    >
      <h2
        css={{
          fontFamily: fonts.title,
          fontWeight: fontWeights.semibold,
          fontSize: fontSizes.title,
          marginBottom: 40,
          [mediaQuery.notDesktop]: {
            marginBottom: 20,
          },
        }}
      >
        {processDescr.title}
      </h2>
      <div
        css={{ fontSize: fontSizes.large }}
        dangerouslySetInnerHTML={{ __html: processDescr.body }}
      />
      <TargetedUsers />
    </section>
    <GetInTouch />
    <Footer />
  </>
);

export default ServicePage;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/pages/services.md/" }) {
      content: html
      frontmatter {
        metaDescription
        metaTitle
        title
        subTitle
        firstLame {
          title
          image {
            childImageSharp {
              fluid(maxWidth: 2580) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          imageAlt
          imageTitle
          body
        }
        cards {
          title
          imageTitle
          imageAlt
          image {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          content
        }
        otherLames {
          title
          color
          image {
            childImageSharp {
              fluid(maxWidth: 2580) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          imageAlt
          imageTitle
          body
        }
        processDescr {
          title
          body
        }
      }
    }
  }
`;

const Lame = ({ lame, inverted, ...props }) => (
  <section
    title={lame.title}
    css={{
      display: 'flex',
      maxHeight: `calc(98vh - ${HEADER_HEIGHT}px)`,
      minHeight: 650,
      flexDirection: inverted ? 'row-reverse' : 'row',
    }}
    {...props}
  >
    <Img
      css={{
        width: '58%',
        flexShrink: 0,
        [mediaQuery.notDesktop]: { display: 'none' },
      }}
      imgStyle={{ objectPosition: 'top center' }}
      fluid={lame.image.childImageSharp.fluid}
      alt={lame.title}
    />
    <div
      css={{
        background: lame.color,
        width: '42%',
        flexShrink: 0,
        padding: '50px 100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [mediaQuery.notDesktop]: {
          width: '100%',
          padding: 40,
          height: 'auto',
        },
      }}
    >
      <h2
        css={{
          fontFamily: fonts.title,
          fontWeight: fontWeights.regular,
          fontSize: fontSizes.larger,
          fontStyle: 'italic',
          letterSpacing: 5,
          marginBottom: 40,
          [mediaQuery.notDesktop]: { marginBottom: 20 },
        }}
      >
        {lame.title}
      </h2>
      <div
        css={{ fontSize: fontSizes.medium }}
        dangerouslySetInnerHTML={{ __html: lame.body }}
      />
    </div>
  </section>
);
