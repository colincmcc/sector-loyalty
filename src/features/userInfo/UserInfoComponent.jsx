import React from "react";
import styled from "styled-components";
import { slideLeft, slideRight } from "../../transitions";

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
  height: 100%;
  width: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
`;

const Content = styled.div`
  margin: auto;
`;
