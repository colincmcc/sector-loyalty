//
// @flow
//

import React from 'react';
import styled from 'styled-components';
import Button from '../components/buttons/Button';

type Props = {
  animateNavigation: Function,
  goBack: Function
};

const UserDetail = (props: Props) => {
  const { animateNavigation, goBack } = props;

  return (
    <UserInfoWrapper id="user-info">
      <Content>
        <p>
This is a test
        </p>
        <Button onClick={() => animateNavigation('/UserDetail')} buttonText="UserDetail" />
        <Button onClick={() => animateNavigation('/Home')} buttonText="Home" />
        <Button onClick={() => animateNavigation('/User')} buttonText="User" />
      </Content>
    </UserInfoWrapper>
  );
};

export default UserDetail;

const UserInfoWrapper = styled.div`
  margin-top: 48px;
  height: 100%;
`;

const Content = styled.div``;
