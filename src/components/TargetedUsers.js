/* eslint-disable react/no-danger */
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { fonts, fontWeights, fontSizes, mediaQuery, colors } from '../theme';

const TargetedUsers = (props) => {
  const {
    markdownRemark: {
      frontmatter: { title, items },
    },
  } = useStaticQuery(graphql`
    query {
      markdownRemark(
        fileAbsolutePath: { regex: "/components/targeted-users.md/" }
      ) {
        frontmatter {
          title
          items {
            label
            color
          }
        }
      }
    }
  `);
  return (
    <section title={title} {...props}>
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
        {title}
      </h2>
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          [mediaQuery.notDesktop]: {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        {items.map(({ color, label }, index) => (
          <div
            key={index}
            css={{
              width: 220,
              height: 260,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: '3.0rem',
              background: color,
              color: 'white',
              [mediaQuery.notDesktop]: {
                width: 'calc(100vw - 80px)',
                height: 'calc((100vw - 80px) / 3)',
                marginBottom: 5,
              },
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TargetedUsers;
