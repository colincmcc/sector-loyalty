import { css } from 'styled-components';

/*
* * MEDIA QUERY
*/
const sizes = {
  large_up: 1800,
  desktop_up: 1200,
  tablet_landscape_up: 900,
  tablet_portrait_up: 600,
  phone_only: 599,
};


// Function to convert the above sizes object to em and set breakpoints either above or below values
const media = Object.keys(sizes).reduce((acc, label) => {
  if (acc[label] !== 'phone_only') {
    acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
  } else {
    acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
  }
  return acc;
}, {});


/*
* * STYLES
*/
const colors = {
  theme: '#fffff',
  lightAccent: '',
  darkAccent: '',
  blackTheme: '#00000',
  whiteTheme: '#fffff',
};

const fontStyles = {
  xtra_large: css`
    font-family: "ITC American Typewriter Std";
    font-size: 52px;
    color: ${colors.blackTheme};
    font-weight: bold;
  `,
  heading: css`
    font-family: "ITC American Typewriter Std";
    font-size: 32px;
    color: ${colors.blackTheme};
    font-weight: bold;
  `,
  subHeading: css`
    font-family: "ITC American Typewriter Std";
    font-size: 20px;
    color: ${colors.blackTheme};
    font-weight: regular;
  `,
  text: css`
    font-family: "Helvetica";
    font-size: 13px;
    color: ${colors.blackTheme};
    font-weight: regular;
  `,
};


const androidStyles = {
  sizes: {
    appBarHeight_large: css`
      height: 128px;
    `,
    appBarHeight: css`
      height: 128px;
    `,
  },
  elevation: {
    button: css`

    `, // custom
    appBar: css`
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
        0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    `, // 4dp
    fab: css`
      box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
        0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
    `, // 6dp
    navDrawer: css`
      box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
        0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
    `, // 16dp
    dialog: css`
      box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
        0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
    `, // 24dp
  },
};

const appleStyles = {
  appBarHeight_large: '128px',
  appBarHeight: '128px',

};

/*
* * THEME DEFINITIONS
*/
const theme = {
  media,
  colors,
  fontStyles,
  androidStyles,
  appleStyles,
};

export default theme;
