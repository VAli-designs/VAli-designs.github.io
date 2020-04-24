import React from 'react';
import { fontSizes, colors, mediaQuery } from '../theme';

// eslint-disable-next-line react/prop-types
const PostHtmlRenderer = ({ html, ...props }) => (
  <div
    css={{
      fontSize: fontSizes.medium,

      h2: {
        fontSize: fontSizes.larger,
        marginTop: 40,
        marginBottom: 20,
      },
      'h3,h4': {
        fontSize: fontSizes.large,
        marginTop: 30,
        marginBottom: 15,
      },
      h4: { fontSize: fontSizes.mediumLarge },
      'p,ul,ol': { marginBottom: 15, marginTop: 10 },
      li: { marginBottom: 10 },
      img: { maxWidth: '100%' },
      figcaption: {
        color: colors.darkGrey,
        fontSize: fontSizes.small,
        fontStyle: 'italic',
        textAlign: 'center',
      },
      figure: { margin: '40px auto' },
      hr: {
        width: '150px',
        margin: '30px auto',
        border: 0,
        borderTop: `1px dashed ${colors.dark}`,
      },
      [mediaQuery.smartphone]: {
        fontSize: fontSizes.mediumLarge,
      },
    }}
    dangerouslySetInnerHTML={{ __html: html }}
    {...props}
  />
);

export default PostHtmlRenderer;
