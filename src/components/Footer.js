import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { fonts, fontWeights, colors, fontSizes } from '../theme';

const Footer = () => {
  const {
    markdownRemark: {
      html,
      frontmatter: { email, phone, phoneDisplay, linkedIn, medium, twitter },
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
          medium
          twitter
        }
      }
    }
  `);
  return (
    <footer
      css={{
        backgroundColor: colors.lightGrey,
        padding: '60px 120px',
        display: 'flex',
      }}
    >
      <div css={{ flex: 1, marginRight: 100 }}>
        <h3
          css={{
            fontFamily: fonts.title,
            fontWeight: fontWeights.regular,
            fontSize: fontSizes.smallTitle,
            alignSelf: 'center',
            marginBottom: 40,
            position: 'relative',
          }}
        >
          About
        </h3>
        <p
          css={{ fontSize: fontSizes.medium }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <div
        css={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          fontSize: fontSizes.medium,
        }}
      >
        <h3
          css={{
            fontFamily: fonts.title,
            fontWeight: fontWeights.regular,
            fontSize: fontSizes.smallTitle,
            position: 'relative',
            marginBottom: 40,
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
              ':hover': { textDecoration: 'underline' },
            },
          }}
        >
          <li css={{ marginBottom: 10 }}>
            <a href={`mailto:${email}`}>
              <span
                css={{
                  fontSize: 38,
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
                  fontSize: 26,
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
        <div css={{ flex: 1 }} />
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
            <a href={medium}>Medium</a>
          </li>
          <li>
            <a href={twitter}>Twitter</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
