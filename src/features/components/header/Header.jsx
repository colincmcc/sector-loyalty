//
// @flow
//

import React from 'react';
import styled from 'styled-components';
import { HeaderTransition } from '../../../transitions';

type Props = {
  title: string,
  prevView: Object,
  location: Object
}
const Header = (props: Props) => {
  const { title, prevView, location } = props;

  return (
    <TopBarWrapper>
      <PageTitle>
        <HeaderTransition pageKey={location.key} {...location.state}>
          About
        </HeaderTransition>
      </PageTitle>
    </TopBarWrapper>
  );
};

export default Header;

const TopBarWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 86px;
  top: 0;
  left: 0;
`;

const PageTitle = styled.span`
  ${props => props.theme.fontStyles.heading};
  margin-top: 48px;
  margin-left: 24px;
  transition: all 2s ease-in-out;

  &.sub-header {
    ${props => props.theme.fontStyles.subheading};
    margin-top: 9px;
  }
`;
