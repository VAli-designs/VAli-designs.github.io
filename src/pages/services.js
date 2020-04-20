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
import { mediaQuery, colors, fonts, fontSizes, fontWeights } from '../theme';

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
        marginTop: HEADER_HEIGHT + 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: 120,
        paddingRight: 120,
        [mediaQuery.notDesktop]: {
          paddingLeft: 40,
          paddingRight: 40,
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
      <p
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
        marginTop: 80,
        marginBottom: 80,
      }}
    >
      {cards.map(({ title, image, imageAlt, imageTitle, content }, index) => (
        <div
          key={index}
          css={{
            width: `calc(100vw / ${cards.length} - 200px)`,
            textAlign: 'center',
            fontSize: fontSizes.medium,
            ':not(:last-of-type)': {
              marginRight: 100,
            },
          }}
        >
          <Img
            css={{
              display: 'inline-block',
              width: `calc(100vw / ${cards.length} - 200px)`,
              height: `calc(2 * (100vh - ${HEADER_HEIGHT}px) / 3)`,
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
    {otherLames.map((lame) => (
      <Lame lame={lame} />
    ))}
    <section
      title={processDescr.title}
      css={{ padding: '80px 0', width: 900, margin: 'auto' }}
    >
      <h2
        css={{
          fontFamily: fonts.title,
          fontWeight: fontWeights.semibold,
          fontSize: fontSizes.title,
          marginBottom: 40,
        }}
      >
        {processDescr.title}
      </h2>
      <p
        css={{ fontSize: fontSizes.large }}
        dangerouslySetInnerHTML={{ __html: processDescr.body }}
      />
      <h3
        css={{
          fontFamily: fonts.title,
          fontWeight: fontWeights.semibold,
          fontSize: fontSizes.larger,
          marginTop: 40,
          marginBottom: 40,
        }}
      >
        {processDescr.studiesFor}
      </h3>
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        {processDescr.items.map(({ color, label }) => (
          <div
            css={{
              width: 220,
              height: 260,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 30,
              background: color,
              color: 'white',
            }}
          >
            {label}
          </div>
        ))}
      </div>
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
          studiesFor
          items {
            label
            color
          }
          body
        }
      }
    }
  }
`;

const Lame = ({ lame }) => (
  <section
    title={lame.title}
    css={{ display: 'flex', height: `calc(98vh - ${HEADER_HEIGHT}px)` }}
  >
    <Img
      css={{ width: '58%', flexShrink: 0 }}
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
      }}
    >
      <h2
        css={{
          fontFamily: fonts.title,
          fontWeight: fontWeights.regular,
          fontSize: fontSizes.larger,
          fontStyle: 'italic',
          letterSpacing: 5,
          marginBottom: 10,
        }}
      >
        {lame.title}
      </h2>
      <h3
        css={{
          fontFamily: fonts.title,
          fontWeight: fontWeights.regular,
          fontSize: fontSizes.large,
          fontStyle: 'italic',
          marginBottom: 40,
        }}
      >
        {lame.subTitle}
      </h3>
      <p
        css={{ fontSize: fontSizes.medium }}
        dangerouslySetInnerHTML={{ __html: lame.body }}
      />
    </div>
  </section>
);
