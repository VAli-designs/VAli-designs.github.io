export const colors = {
  blue: 'rgb(70, 183, 232)',
  green: 'rgb(56, 198, 139)',
  yellow: 'rgb(253, 239, 163)',
  orange: 'rgb(245, 188, 81)',
  pink: 'rgb(237, 69, 160)',
  cyan: 'rgb(214, 236,232)',
  dark: '#141B1F',
  darkGrey: '#333',
  semiDarkGrey: '#444',
  grey: 'rgb(209,210,211)',
  lightGrey: 'rgb(240,240,240)',
};
export const fonts = {
  main: "'Source Sans Pro', sans-serif",
  title: "'Forum', cursive",
  button: "'Playfair Display', serif",
};

export const fontWeights = {
  extrabold: 900,
  bold: 800,
  semibold: 600,
  regular: 400,
  light: 300,
};

export const fontSizes = {
  title: 54,
  smallTitle: 42,
  larger: 36,
  large: 28,
  mediumLarge: 24,
  medium: 22,
  normal: 18,
};

export const mediaQuery = {
  desktop: '@media screen and (min-width: 1025px)',
  notDesktop: '@media screen and (max-width: 1024px)',
  smartphone: '@media (max-width: 550px)',
  tablette: '@media (min-width: 550px) and (max-width: 1024px)',
};

export const zIndexes = {
  behind: -1,
  simple: 1,
  menu: 1000,
};

export const boxShadow = '0px 0px 30px 0 rgba(0, 0, 0, 0.1)';

export const linkStyle = (color, hoverColor) => ({
  display: 'inline-block',
  color: 'white',
  fontFamily: fonts.button,
  fontStyle: 'italic',
  fontSize: fontSizes.mediumLarge,
  textDecoration: 'none',
  width: 220,
  height: 50,
  lineHeight: '50px',
  textAlign: 'center',
  borderRadius: 2,
  backgroundColor: color,
  transition: 'all 300ms ease-out',
  ':hover, :active, :focus': {
    backgroundColor: hoverColor,
  },
});
