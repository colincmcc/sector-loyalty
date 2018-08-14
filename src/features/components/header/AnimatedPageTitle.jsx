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
    animation: ${headerSlideInOut} 300ms both ease-in-out
      ${props => (props.isGoingBack ? 'reverse' : null)};
    background-color: white;
  }
  &.sub-header {
    display: flex;
    transition: all 300ms ease-in-out;
    font-size: ${props => (props.isGoingBack ? '48px' : '20px')};
    animation: ${headerSubheader} 300ms both ease-in-out
      ${props => (props.isGoingBack ? 'reverse' : null)};
  }
  &.leaving-header {
    display: flex;
    transition: all 300ms ease-in-out;
    font-size: 20px;
    font-weight: normal;
    margin-top: 9px;
    color: red;
    animation: ${props => (props.isGoingBack ? subheaderComeBack : subheaderLeave)}
      300ms both ease-in-out;
  }
`;
