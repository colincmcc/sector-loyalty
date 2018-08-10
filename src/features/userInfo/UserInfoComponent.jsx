import React from "react";
import styled from "styled-components";

const UserInfoComponent = props => {
  const { animateNavigation, goBack } = props;

  return (
    <UserInfoWrapper id="user-info">
      <Content>
        <p>This is a test</p>
        <div>
          <button onClick={() => animateNavigation("/User")}> User </button>
        </div>
        <div>
          <button onClick={() => animateNavigation("/Home")}> Home </button>
        </div>
        <div>
          <button onClick={() => goBack()}> Go Back </button>
        </div>
      </Content>
    </UserInfoWrapper>
  );
};

export default UserInfoComponent;

const UserInfoWrapper = styled.div`
  padding: 0 24px;
`;

const Content = styled.div``;
