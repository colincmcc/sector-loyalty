//
// @flow
//

import styled from 'styled-components';
import React from 'react';
import {
  headerSlideInOut,
  headerSubheader,
  subheaderComeBack,
  subheaderLeave,
} from '../../../transitions/header';

type Props = {
  isGoingBack: boolean,
  newClass: string,
  title: string
}

/**
 * * Forward animations:
 * .header class slides from right to left * ACTIVE PAGE - Index 0 - header
 * .sub-header class goes from header style to subheader style - Index 1 - subheader
 * .leaving-header slides left & off screen - Index 2 - off-screen-left
 * * Reverse animations: Index 0 & 1 will be the same
 * .header class goes from subheader style to header style* ACTIVE PAGE - Index 0 - header
 * .sub-header class starts with header style and slides right & off screen - Index 2 - off-screen-right
 * .leaving-header class starts left off screen and slides right into subheader style - Index 3 - subheader
 */

const AnimatedPageTitle = (props: Props) => {
  const { isGoingBack, newClass, title } = props;
  return (
    <AnimatedTitle isGoingBack={isGoingBack} className={newClass}>
      {title}
    </AnimatedTitle>
  );
};

export default AnimatedPageTitle;


const AnimatedTitle = styled.div`
  display: none;
  ${props => props.theme.fontStyles.heading};
  transition: all 300ms ease-in-out;

  &.header {
    display: flex;
    margin-top: 48px;
    animation: ${props => (props.isGoingBack
    ? `${headerSubheader} 300ms both ease-in-out reverse`
    : `${headerSlideInOut} 300ms both ease-in-out`)};
    background-color: white;
  }
  &.sub-header {
    display: flex;
    transition: all 300ms ease-in-out;
    font-size: 20px;
    ${props => (props.isGoingBack
    ? `
        font-size: 32px;
        font-weight: bold;
        margin-top: 48px;
        color: black;
        animation: ${headerSlideInOut} 300ms both ease-in-out reverse;`
    : `animation:${headerSubheader} 300ms both ease-in-out`)};
  }
  &.leaving-header {
    display: flex;
    transition: all 300ms ease-in-out;
    font-size: 20px;
    font-weight: normal;
    margin-top: 9px;
    color: red;
    animation: ${props => (props.isGoingBack
    ? `${subheaderComeBack} 300ms both ease-in-out`
    : `${subheaderLeave} 300ms both ease-in-out`)};
  }
`;
