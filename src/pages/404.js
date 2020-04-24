/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import PageHead from '../components/PageHead';
import GlobalStyles from '../components/GlobalStyles';
import HeaderMenu, { HEADER_HEIGHT } from '../components/HeaderMenu';
import Footer from '../components/Footer';
import { fonts, fontSizes, fontWeights } from '../theme';
import GetInTouch from '../components/GetInTouch';

const Page404 = ({
  data: {
    markdownRemark: {
      frontmatter: { metaDescription, metaTitle, title },
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
        flex: 1,
      }}
    >
      <h1
        css={{
          fontFamily: fonts.title,
          fontWeight: fontWeights.regular,
          fontSize: fontSizes.title,
          textAlign: 'center',
          marginBottom: 40,
          padding: 40,
        }}
      >
        {title}
      </h1>
    </div>
    <GetInTouch />
    <Footer />
  </>
);

export default Page404;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/pages/404.md/" }) {
      frontmatter {
        metaDescription
        metaTitle
        title
      }
    }
  }
`;
