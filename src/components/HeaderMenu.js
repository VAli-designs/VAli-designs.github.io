import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { css } from '@emotion/core';
import { colors, fontSizes, zIndexes, mediaQuery, boxShadow } from '../theme';

export const HEADER_HEIGHT = 100;
export const HEADER_MOBILE_HEIGHT = 60;

const HeaderMenu = (props) => {
  const { logo } = useStaticQuery(graphql`
    query {
      logo: file(
        relativePath: { eq: "logo.png" }
        sourceInstanceName: { eq: "img" }
      ) {
        childImageSharp {
          fixed(width: 120, height: 120) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const [menuToggled, setMenuToggled] = useState(false);
  const toggleMenu = () => setMenuToggled((toggled) => !toggled);

  return (
    <header
      css={[
        {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: zIndexes.menu,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'white',
          height: HEADER_HEIGHT,
          padding: '20px 80px',
          [mediaQuery.notDesktop]: {
            height: HEADER_MOBILE_HEIGHT,
            padding: 10,
          },
        },
      ]}
      {...props}
    >
      <Link
        to="/"
        css={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: colors.dark,
        }}
      >
        <Img
          fixed={logo.childImageSharp.fixed}
          role="img"
          css={{
            background: 'black',
            width: '60px !important',
            height: '60px !important',
            marginRight: 20,
            [mediaQuery.notDesktop]: {
              height: '38px !important',
              width: '38px !important',
              marginRight: 10,
            },
          }}
        />
        <span
          css={{
            fontSize: fontSizes.large,
            [mediaQuery.notDesktop]: {
              fontSize: fontSizes.medium,
            },
          }}
        >
          All About Users
        </span>
      </Link>
      <nav css={{ flex: 1, display: 'flex' }}>
        <ul
          css={{
            display: 'flex',
            listStyle: 'none',
            alignItems: 'center',
            justifyContent: 'flex-end',
            textAlign: 'right',
            flex: 1,
            margin: 0,
            padding: 0,
            a: {
              display: 'block',
              margin: '12px 19px',
              fontSize: fontSizes.mediumLarge,
              textDecoration: 'none',
              color: 'black',
              position: 'relative',
              [mediaQuery.notDesktop]: {
                fontSize: fontSizes.larger,
                marginBottom: 30,
              },
            },
            'a:after': {
              content: '" "',
              position: 'absolute',
              height: 2,
              width: '100%',
              background: colors.dark,
              bottom: 0,
              left: 0,
              transform: 'scaleX(0)',
              transition: 'transform 0.7s ease',
            },
            'a:hover:after, a.active:after': {
              transform: 'scaleX(1)',
            },
            'a.contactLink': {
              color: colors.pink,
            },
            'a.contactLink:after': {
              background: colors.pink,
            },
            [mediaQuery.notDesktop]: [
              {
                position: 'absolute',
                padding: 10,
                paddingTop: 70,
                top: 0,
                right: 0,
                height: '100vh',
                background: 'white',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                width: '250px',
                transform: 'translateX(100%)',
                transition: 'all 0.5s cubic-bezier(0.77,0.2,0.05,1.0)',
              },
              menuToggled && {
                transform: 'translateX(0)',
                boxShadow,
              },
            ],
          }}
        >
          <li>
            <Link to="/" activeClassName="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/ux-studies" activeClassName="active">
              UX Studies
            </Link>
          </li>
          <li>
            <Link to="/services" activeClassName="active">
              Services
            </Link>
          </li>
          <li>
            <Link to="/resources" activeClassName="active">
              Resources
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              activeClassName="active"
              className="contactLink"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <button
          css={[
            {
              position: 'absolute',
              right: 20,
              top: 30,
              transform: 'translateY(-50%)',
              display: 'none',
              appearance: 'none',
              background: 'none',
              border: 9,
              outline: 'none',
              [mediaQuery.notDesktop]: {
                display: 'block',
              },
            },
            burgerButtonStyles,
            menuToggled && burgerButtonToggleStyles,
          ]}
          type="button"
          alt="Menu"
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
};

HeaderMenu.propTypes = {
  displayMain: PropTypes.bool,
  darkMode: PropTypes.bool,
  displayName: PropTypes.bool,
  forceFilled: PropTypes.bool,
};

export default HeaderMenu;

const burgerButtonStyles = css`
  span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 6px;
    position: relative;

    background: ${colors.dark};
    border-radius: 3px;
    transform-origin: 3px 0px;

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      opacity 0.5s ease;
  }

  span:nth-of-type(3) {
    transform-origin: 0px 3px;
    margin-bottom: 0;
  }
`;

const burgerButtonToggleStyles = css`
  span {
    opacity: 1;
    transform: rotate(45deg);
  }

  span:nth-of-type(2) {
    opacity: 0;
  }
  span:nth-of-type(3) {
    opacity: 1;
    transform-origin: 0px 4px;
    transform: rotate(-45deg);
  }
`;
