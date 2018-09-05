//
// @flow
//

import React from 'react';
import styled from 'styled-components';
import AnimatedPageTitle from './AnimatedPageTitle';

type Props = {
  index: number,
  view: Object,
  isGoingBack: boolean
};


const Header = (props: Props) => {
  const { index, view, isGoingBack } = props;
  const { title } = view;

  const headerClass = currentIndex => ({ 0: 'header', 1: 'sub-header', 2: 'leaving-header' }[currentIndex]);

  console.log(headerClass(index));
  console.log(index, title);
  return (
    <TopBarWrapper id="appBar">
      <TitleText>
        <AnimatedPageTitle isGoingBack={isGoingBack} newClass={headerClass(index)} title={title} />
      </TitleText>
    </TopBarWrapper>
  );
};

export default Header;


const TopBarWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 128px;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 0 1.6rem;
`;
const TitleText = styled.div`
 max-width: 70em;
 margin: 0 auto;
 width: 100%;

`;
