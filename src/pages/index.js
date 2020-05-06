/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
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
  mediaQuery,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  linkStyle,
} from '../theme';
import TargetedUsers from '../components/TargetedUsers';

const IndexPage = ({
  data: {
    markdownRemark: {
      content,
      frontmatter: {
        metaDescription,
        metaTitle,
        title,
        tags,
        contactButtonText,
        firstLame,
        servicesTitle,
        services,
        servicesButtonText,
        studiesTitle,
        studies,
        studiesButtonText,
      },
    },
  },
}) => {
  const [studiesVisible, setStudiesVisible] = useState(true);
  const studiedSectionRef = useRef(null);
  useEffect(() => {
    setStudiesVisible(false);
    const handler = () => {
      if (!studiedSectionRef.current) {
        return;
      }
      const { top } = studiedSectionRef.current.getBoundingClientRect();
      if (window.innerHeight - top > 200) {
        setStudiesVisible(true);
      }
    };

    window.addEventListener('scroll', handler);
    window.addEventListener('resize', handler);
    handler();
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);
  return (
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
        <div
          css={{
            width: 960,
            [mediaQuery.notDesktop]: {
              width: '100%',
            },
          }}
        >
          <h1
            css={{
              fontFamily: fonts.title,
              fontWeight: fontWeights.regular,
              fontSize: fontSizes.title,
              marginBottom: 10,
              [mediaQuery.smartphone]: { fontSize: fontSizes.smallTitle },
            }}
          >
            {title}
          </h1>
          <h2
            css={{
              fontFamily: fonts.title,
              fontWeight: fontWeights.regular,
              fontSize: fontSizes.title,
              marginBottom: 20,
              [mediaQuery.smartphone]: { fontSize: fontSizes.smallTitle },
            }}
          >
            {tags}
          </h2>
          <div
            css={{ fontSize: fontSizes.mediumLarge }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <Link
            to="/contact"
            css={[linkStyle(colors.green, colors.blue), { marginTop: 30 }]}
          >
            {contactButtonText}
          </Link>
        </div>
      </section>
      <section
        title={firstLame.title}
        css={{
          display: 'flex',
          maxHeight: `calc(98vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <Img
          css={{
            width: '58%',
            flexShrink: 0,
            [mediaQuery.notDesktop]: { display: 'none' },
          }}
          imgStyle={{ objectPosition: 'top center' }}
          fluid={firstLame.image.childImageSharp.fluid}
          alt={firstLame.imageAlt}
          title={firstLame.imageTitle}
        />
        <div
          css={{
            background: colors.yellow,
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
              marginBottom: 10,
            }}
          >
            {firstLame.title}
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
            {firstLame.subTitle}
          </h3>
          <div
            css={{
              fontSize: fontSizes.medium,
              [mediaQuery.smartphone]: { fontSize: fontSizes.mediumLarge },
            }}
            dangerouslySetInnerHTML={{ __html: firstLame.body }}
          />
          <Link
            to={firstLame.readMoreButtonLink}
            css={[linkStyle(colors.orange, colors.pink), { marginTop: 40 }]}
          >
            {firstLame.readMoreButtonText}
          </Link>
        </div>
      </section>
      <TargetedUsers
        css={{
          padding: '80px 0',
          width: 900,
          margin: 'auto',
          [mediaQuery.notDesktop]: {
            padding: '30px  40px',
            width: 'auto',
            margin: 0,
          },
        }}
      />
      <section
        title={servicesTitle}
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: `calc(98vh - ${HEADER_HEIGHT}px)`,
          paddingBottom: 40,
          paddingLeft: 120,
          paddingRight: 120,
          background: colors.lightGrey,
          marginTop: 100,
          [mediaQuery.notDesktop]: {
            paddingLeft: 40,
            paddingRight: 40,
            marginTop: 30,
            height: 'auto',
          },
        }}
      >
        <h2
          css={{
            fontFamily: fonts.title,
            fontWeight: fontWeights.regular,
            fontSize: fontSizes.smallTitle,
            alignSelf: 'center',
            position: 'relative',
            textAlign: 'center',
            maxWidth: 800,
            marginTop: 40,
            paddingBottom: 80,
            ':after': {
              content: '" "',
              position: 'absolute',
              bottom: 40,
              width: 30,
              height: 2,
              background: colors.dark,
              left: 'calc(50% - 15px)',
            },
          }}
        >
          {servicesTitle}
        </h2>
        <div
          css={{
            display: 'flex',
            minHeight: 400,
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            [mediaQuery.smartphone]: {
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
        >
          {services.map(
            ({ title, image, imageAlt, imageTitle, content }, index) => (
              <div
                key={index}
                css={{
                  flex: 1,
                  display: 'inline-block',
                  textAlign: 'center',
                  fontSize: fontSizes.medium,
                  [mediaQuery.smartphone]: {
                    marginBottom: 30,
                    fontSize: fontSizes.mediumLarge,
                  },
                }}
              >
                {image && (
                  <Img
                    css={{
                      borderRadius: '100%',
                      width: 160,
                      height: 160,
                      display: 'inline-block',
                    }}
                    imgStyle={{ objectPosition: 'top center' }}
                    fluid={image.childImageSharp.fluid}
                    title={imageTitle}
                    alt={imageAlt}
                  />
                )}
                <h3
                  css={{
                    fontFamily: fonts.title,
                    fontWeight: fontWeights.regular,
                    fontSize: fontSizes.mediumLarge,
                    fontStyle: 'italic',
                    margin: '10px 0 ',
                    [mediaQuery.smartphone]: { fontSize: fontSizes.large },
                  }}
                >
                  {title}
                </h3>
                {content.map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
            ),
          )}
        </div>
        <Link
          to="/services"
          css={[
            linkStyle(colors.orange, colors.pink),
            { display: 'inline-block', marginTop: 0, alignSelf: 'center' },
          ]}
        >
          {servicesButtonText}
        </Link>
      </section>
      <section
        ref={studiedSectionRef}
        title={studiesTitle}
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '80vh',
          paddingBottom: 80,
          marginTop: 100,
          paddingLeft: 60,
          paddingRight: 60,
          [mediaQuery.notDesktop]: {
            minHeight: '40vh',
            marginTop: 30,
            padding: 40,
          },
        }}
      >
        <h2
          css={{
            fontFamily: fonts.title,
            fontWeight: fontWeights.regular,
            fontSize: fontSizes.smallTitle,
            alignSelf: 'center',
            position: 'relative',
            textAlign: 'center',
            maxWidth: 800,
            paddingBottom: 80,
            ':after': {
              content: '" "',
              position: 'absolute',
              bottom: 40,
              width: 30,
              height: 2,
              background: colors.dark,
              left: 'calc(50% - 15px)',
            },
          }}
        >
          {studiesTitle}
        </h2>
        <div
          css={[
            {
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              transition: 'opacity 1.2s ease-in',
              [mediaQuery.smartphone]: {
                flexDirection: 'column',
                alignItems: 'center',
              },
            },
            !studiesVisible && {
              opacity: 0,
              [mediaQuery.smartphone]: {
                opacity: 1,
              },
            },
          ]}
        >
          {studies.map(
            ({ title, path, image, imageAlt, imageTitle, content }, index) => (
              <a
                key={index}
                css={{
                  display: 'inline-block',
                  fontSize: fontSizes.normal,
                  width: 'calc((100vw - 120px - 80px) / 3)',
                  textDecoration: 'none',
                  color: colors.dark,
                  cursor: 'pointer',
                  img: {
                    transition:
                      'all 0.5s ease, opacity 500ms ease 0s !important',
                  },
                  ':hover img,:active img': {
                    transform: 'scale(1.1)',
                    filter: 'brightness(50%)',
                  },
                  [mediaQuery.smartphone]: {
                    width: 'auto',
                    marginBottom: 30,
                    fontSize: fontSizes.mediumLarge,
                  },
                }}
                href={path}
                alt={title}
              >
                <Img
                  css={{
                    width: 'calc((100vw - 120px - 80px) / 3)',
                    height: 'calc((3 / 4) * (100vw - 120px - 80px) / 3)',
                    display: 'inline-block',
                    [mediaQuery.smartphone]: {
                      width: 'calc((100vw - 80px))',
                      height: 'calc((3 / 4) * (100vw - 80px))',
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
                    fontSize: fontSizes.mediumLarge,
                    margin: '10px 0',
                    [mediaQuery.smartphone]: {
                      fontSize: fontSizes.large,
                      marginBottom: 0,
                    },
                  }}
                >
                  {title}
                </h3>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </a>
            ),
          )}
        </div>
        <Link
          to="/studies"
          css={[
            linkStyle(colors.orange, colors.pink),
            {
              display: 'inline-block',
              marginTop: 40,
              alignSelf: 'center',
              width: 280,
            },
          ]}
        >
          {studiesButtonText}
        </Link>
      </section>
      <Footer />
    </>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/pages/index.md/" }) {
      content: html
      frontmatter {
        metaDescription
        metaTitle
        title
        tags
        contactButtonText
        firstLame {
          image {
            childImageSharp {
              fluid(maxWidth: 2580) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          imageAlt
          imageTitle
          title
          subTitle
          readMoreButtonText
          readMoreButtonLink
          body
        }
        servicesTitle
        services {
          title
          imageTitle
          imageAlt
          image {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          content
        }
        servicesButtonText
        studiesTitle
        studies {
          title
          imageTitle
          imageAlt
          path
          image {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          content
        }
        studiesButtonText
      }
    }
  }
`;
