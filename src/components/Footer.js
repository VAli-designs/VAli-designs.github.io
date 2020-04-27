import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { fonts, fontWeights, colors, fontSizes, mediaQuery } from '../theme';

const Footer = () => {
  const {
    markdownRemark: {
      html,
      frontmatter: { email, phone, phoneDisplay, linkedIn, twitter },
    },
  } = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/components/footer.md/" }) {
        html
        frontmatter {
          email
          phone
          phoneDisplay
          linkedIn
          twitter
        }
      }
    }
  `);
  return (
    <footer css={{ backgroundColor: colors.lightGrey }}>
      <div
        css={{
          padding: '60px 120px',
          display: 'flex',
          maxWidth: 1200,
          [mediaQuery.bigDesktop]: {
            maxWidth: 1400,
          },
          margin: 'auto',
          justifyContent: 'space-between',
          [mediaQuery.notDesktop]: {
            flexDirection: 'column',
            padding: 40,
            alignItems: 'center',
          },
        }}
      >
        <div
          css={{
            flexShrink: 0,
            marginRight: 100,
            maxWidth: 550,
            [mediaQuery.notDesktop]: {
              marginRight: 0,
              marginBottom: 30,
              textAlign: 'center',
            },
          }}
        >
          <h3
            css={{
              fontFamily: fonts.title,
              fontWeight: fontWeights.regular,
              fontSize: fontSizes.smallTitle,
              alignSelf: 'center',
              marginBottom: 40,
              position: 'relative',
              [mediaQuery.notDesktop]: {
                marginBottom: 20,
              },
            }}
          >
            About
          </h3>
          <div
            css={{
              fontSize: fontSizes.medium,
              [mediaQuery.smartphone]: { fontSize: fontSizes.mediumLarge },
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        <div
          css={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            fontSize: fontSizes.medium,
            [mediaQuery.notDesktop]: {
              alignItems: 'center',
            },
            [mediaQuery.smartphone]: { fontSize: fontSizes.mediumLarge },
          }}
        >
          <h3
            css={{
              fontFamily: fonts.title,
              fontWeight: fontWeights.regular,
              fontSize: fontSizes.smallTitle,
              position: 'relative',
              marginBottom: 40,
              [mediaQuery.notDesktop]: {
                marginBottom: 10,
                textAlign: 'center',
              },
            }}
          >
            Get in touch
          </h3>
          <ul
            css={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              a: {
                color: colors.dark,
                textDecoration: 'none',
                ':hover, :active': { textDecoration: 'underline' },
              },

              [mediaQuery.notDesktop]: {
                marginBottom: 20,
              },
            }}
          >
            <li css={{ marginBottom: 10 }}>
              <a href={`mailto:${email}`}>
                <span
                  css={{
                    fontSize: '3.8rem',
                    display: 'inline-block',
                    marginRight: 10,
                    position: 'relative',
                    top: 7,
                    width: 30,
                    textAlign: 'right',
                  }}
                  role="img"
                >
                  ✉
                </span>
                {email}
              </a>
            </li>
            <li>
              <a href={`tel:${phone}`}>
                <span
                  css={{
                    fontSize: '2.6rem',
                    display: 'inline-block',
                    marginRight: 10,
                    position: 'relative',
                    width: 30,
                    textAlign: 'right',
                  }}
                  role="img"
                >
                  ☎
                </span>{' '}
                {phoneDisplay}
              </a>
            </li>
          </ul>
          <div
            css={{
              flex: 1,
              [mediaQuery.notDesktop]: {
                display: 'none',
              },
            }}
          />
          <ul
            css={{
              margin: 0,
              marginLeft: 10,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              a: {
                color: colors.dark,
              },
              'li:not(:last-of-type)': { marginRight: 20 },
            }}
          >
            <li>
              <a href={linkedIn}>LinkedIn</a>
            </li>
            <li>
              <a href={twitter}>Twitter</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
