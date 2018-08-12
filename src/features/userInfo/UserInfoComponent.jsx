//
// @flow
//

import React from 'react';
import styled from 'styled-components';

type Props = {
  animateNavigation: Function,
  goBack: Function
}

const UserInfoComponent = (props: Props) => {
  const { animateNavigation, goBack } = props;

  return (
    <UserInfoWrapper id="user-info">
      <Content>
        <p>
          This is a test
        </p>
        <div>
          <button type="button" onClick={() => animateNavigation('/User')}>
            User
          </button>
        </div>
        <div>
          <button type="button" onClick={() => animateNavigation('/Home')}>
            Home
          </button>
        </div>
        <div>
          <button type="button" onClick={() => goBack()}>
            Go Back
          </button>
        </div>
      </Content>
    </UserInfoWrapper>
  );
};

export default UserInfoComponent;

const UserInfoWrapper = styled.div`
  margin-top: 48px;
`;

const Content = styled.div``;
