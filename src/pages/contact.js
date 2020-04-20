/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PageHead from '../components/PageHead';
import GlobalStyles from '../components/GlobalStyles';
import HeaderMenu, { HEADER_HEIGHT } from '../components/HeaderMenu';
import Footer from '../components/Footer';
import { fonts, fontSizes, fontWeights, linkStyle, colors } from '../theme';

const ContactPage = ({
  data: {
    markdownRemark: {
      frontmatter: {
        metaDescription,
        metaTitle,
        title,
        email,
        phone,
        phoneDisplay,
        sendEmailButton,
        image,
        imageAlt,
        imageTitle,
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
        alignItems: 'center',
        marginBottom: 50,
        fontSize: fontSizes.large,
        textAlign: 'center',
      }}
    >
      <h1
        css={{
          fontFamily: fonts.title,
          fontWeight: fontWeights.regular,
          fontSize: fontSizes.title,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        {title}
      </h1>
      <p dangerouslySetInnerHTML={{ __html: html }} />
      <hr
        css={{
          height: 2,
          width: '50vw',
          margin: 40,
          background: colors.lightGrey,
        }}
      />
      <a
        css={{
          color: colors.dark,
          textDecoration: 'none',
          fontSize: fontSizes.larger,
          display: 'block',
          marginBottom: 20,
          ':hover': { textDecoration: 'underline' },
        }}
        href={`mailto:${email}`}
      >
        <span
          css={{
            fontSize: 38,
            display: 'inline-block',
            marginRight: 10,
            position: 'relative',
            top: 7,
            width: 30,
            textAlign: 'center',
          }}
          role="img"
        >
          ✉
        </span>
        {email}
      </a>
      <a
        css={{
          color: colors.dark,
          textDecoration: 'none',
          fontSize: fontSizes.larger,
          display: 'block',
          ':hover': { textDecoration: 'underline' },
        }}
        href={`tel:${phone}`}
      >
        <span
          css={{
            fontSize: 26,
            display: 'inline-block',
            marginRight: 10,
            position: 'relative',
            width: 30,
            textAlign: 'center',
          }}
          role="img"
        >
          ☎
        </span>{' '}
        {phoneDisplay}
      </a>
      <a
        href={`mailto:${email}`}
        css={[linkStyle(colors.green, colors.pink), { marginTop: 50 }]}
      >
        {sendEmailButton}
      </a>
    </div>
    <div>
      <Img
        fluid={image.childImageSharp.fluid}
        css={{ maxHeight: 400 }}
        title={imageTitle}
        alt={imageAlt}
      />
    </div>
    <Footer />
  </>
);

export default ContactPage;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/pages/contact.md/" }) {
      frontmatter {
        metaDescription
        metaTitle
        title
        email
        phone
        phoneDisplay
        sendEmailButton
        image {
          childImageSharp {
            fluid(maxWidth: 3000) {
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
`;
