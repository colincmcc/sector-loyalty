import { css } from 'styled-components'

/*
* * MEDIA QUERY
*/
const sizes = {
  large_up: 1800,
  desktop_up: 1200,
  tablet_landscape_up: 900,
  tablet_portrait_up: 600,
  phone_only: 599
}

const media = Object.keys(sizes).reduce((acc, label) => {
  if(acc[label] !== "phone_only"){
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `}
  else{
    acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `
  }
  return acc
}, {})


/*
* * STYLES
*/
const colors = {
  theme: "#fffff",
  lightAccent: "",
  darkAccent: "",
  blackTheme: "#00000",
  whiteTheme: "#fffff"
}

const fontStyles = {
  heading: css`
    font-family: "ITC American Typewriter Std";
    font-size: 48px;
    color: ${colors.blackTheme};
    font-weight: bold;
  `,
  subHeading: css`
    font-family: "ITC American Typewriter Std";
    font-size: 20px;
    color: ${colors.blackTheme};
    font-weight: regular;
  `
}

/*
* * THEME DEFINITIONS
*/
const theme = {
  media: media,
  colors: colors,
  fontStyles: fontStyles,
}

export default theme