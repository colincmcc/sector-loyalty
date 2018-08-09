import React, { Component } from "react";
import styled from "styled-components";

const HomepageComponent = props => {
  const { animateNavigation, goBack } = props;
  return (
    <HomepageWrapper id="home">
      <Content>
        <p>This is a test</p>
        <div>
          <button onClick={() => animateNavigation("/Home")}> Home </button>
        </div>
        <div>
          <button onClick={() => animateNavigation("/User")}>User</button>
        </div>
        <div>
          <button onClick={() => goBack()}>> Go Back </button>
        </div>
      </Content>
    </HomepageWrapper>
  );
};

export default HomepageComponent;

const HomepageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
`;

const Content = styled.div`
  margin: auto;
`;
