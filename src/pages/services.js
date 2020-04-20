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

const IndexPage = ({
  data: {
    markdownRemark: {
      content,
      frontmatter: {
        metaDescription,
        metaTitle,
        title,
        subTitle,
        firstLame: {
          childMarkdownRemark: {
            frontmatter: firstLameAttributes,
            content: firstLameContent,
          },
        },
        cards,
        otherLames,
        process: {
          childMarkdownRemark: {
            frontmatter: processAttributes,
            html: processContent,
          },
        },
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
    <Lame
      attibutes={{ ...firstLameAttributes, color: colors.cyan }}
      content={firstLameContent}
    />
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
    {otherLames.map(({ childMarkdownRemark: { frontmatter, content } }) => (
      <Lame attibutes={frontmatter} content={content} />
    ))}
    <section
      title={processAttributes.title}
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
        {processAttributes.title}
      </h2>
      <p
        css={{ fontSize: fontSizes.large }}
        dangerouslySetInnerHTML={{ __html: processContent }}
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
        {processAttributes.studiesFor}
      </h3>
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        {processAttributes.items.map(({ color, label }) => (
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

export default IndexPage;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/pages/services/index.md/" }) {
      content: html
      frontmatter {
        metaDescription
        metaTitle
        title
        subTitle
        firstLame {
          childMarkdownRemark {
            frontmatter {
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
            }
            content: html
          }
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
          childMarkdownRemark {
            frontmatter {
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
            }
            content: html
          }
        }
        process {
          childMarkdownRemark {
            frontmatter {
              title
              studiesFor
              items {
                label
                color
              }
            }
            html
          }
        }
      }
    }
  }
`;

const Lame = ({ attibutes, content }) => (
  <section
    title={attibutes.title}
    css={{ display: 'flex', height: `calc(98vh - ${HEADER_HEIGHT}px)` }}
  >
    <Img
      css={{ width: '58%', flexShrink: 0 }}
      imgStyle={{ objectPosition: 'top center' }}
      fluid={attibutes.image.childImageSharp.fluid}
      alt={attibutes.title}
    />
    <div
      css={{
        background: attibutes.color,
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
        {attibutes.title}
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
        {attibutes.subTitle}
      </h3>
      <p
        css={{ fontSize: fontSizes.medium }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  </section>
);
