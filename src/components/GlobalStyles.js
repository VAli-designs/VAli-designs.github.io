import React from 'react';
import { Global, css } from '@emotion/core';
import { fonts, colors, fontWeights } from '../theme';

const GlobalStyles = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Forum&family=Playfair+Display:ital@0;1&family=Source+Sans+Pro:ital,wght@0,400;0,600;1,400;1,600&display=swap');
      html,
      body {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
      }

      body {
        font-family: ${fonts.main};
        color: ${colors.dark};
      }

      ul,
      ol {
        padding-left: 30px;
        margin-left: 10px;
      }

      *,
      *:before,
      *:after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      strong {
        font-weight: ${fontWeights.semibold};
      }
    `}
  />
);

export default GlobalStyles;
