//
// @flow
//

import React from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  title: string,
  index: number
}

const Header = (props: Props) => {
  const { title, index } = props;
  console.log(index, title);
  let animationClass;
  switch (index) {
    case 0:
      animationClass = 'header';
      break;
    case 1:
      animationClass = 'sub-header';
      break;
    case 2:
      animationClass = 'leaving-header';
      break;
    default:
  }
  const headerTitle = (
    <PageTitle className={animationClass}>
      {title}
    </PageTitle>
  );

  return (
    <TopBarWrapper>
      {headerTitle}
    </TopBarWrapper>
  );
};

export default Header;

const goForward = keyframes`
0% {
  transition: all 300ms ease-in-out;
 }
100% {
  transition: all 300ms ease-in-out;
  font-size: 20px !important;
  margin: -35px;
  color: red;
  };
`;
const slideIn = keyframes`
0%, 25% { opacity: .5; transform: translateX(100vw); }
100% { opacity: 1; transform: translateX(0); }
`;

const leave = keyframes`
0%, 25% {  }
100% {     transform: translateX(-100vw);
 }
`;

const TopBarWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 86px;
  top: 0;
  left: 0;
`;

const PageTitle = styled.span`
  display: none;
  ${props => props.theme.fontStyles.heading};
  margin-top: 48px;
  margin-left: 24px;
  transition: all 2s ease-in-out;
  &.header {
    display: flex;
    animation: ${slideIn} 300ms both ease-in-out;
  }
  &.sub-header {
    display: flex;
    ${props => props.theme.fontStyles.subheading};
    animation: ${goForward} 300ms both ease-in-out;
  }
  &.leaving-header {
    display: flex;
    ${props => props.theme.fontStyles.subheading};
    animation: ${leave} 300ms both ease-in-out;
  }
`;
