import React from "react";
import styled from "styled-components";

const HomepageComponent = props => {
  const { animateNavigation, goBack } = props;
  return (
    <HomepageWrapper className="content" id="home">
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
  padding: 0 24px;
`;

const Content = styled.div``;
