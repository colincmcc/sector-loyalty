//
// @flow
//

import React from 'react';
import styled from 'styled-components';
import CurrentPointsCard from './components/CurrentPointsCard';
import Button from '../components/buttons/Button';

type Props = {
  animateNavigation: Function,
  goBack: Function
}

const HomepageComponent = (props: Props) => {
  const { animateNavigation, goBack } = props;
  return (
<HomepageWrapper className="content" id="home">
      <Content>
        <CurrentPointsCard />
        <Button onClick={() => animateNavigation("/UserDetail")} buttonText="UserDetail" />
        <Button onClick={() => animateNavigation("/Home")} buttonText="Home" />
        <Button onClick={() => animateNavigation("/User")} buttonText="User" />
      </Content>
    </HomepageWrapper>
);
};

export default HomepageComponent;

const HomepageWrapper = styled.div`
  margin-top: 48px;
  height: 100%;
`;

const Content = styled.div``;
