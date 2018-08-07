import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomepageComponent = props => {
  return (
    <HomepageWrapper>
      <p>This is a test</p>
      <div>
        <Link to="/User"> User </Link>
      </div>
      <div>
        <button onClick={() => props.goBack()}>> Go Back </button>
      </div>
    </HomepageWrapper>
  );
};

export default HomepageComponent;

const HomepageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  margin: auto;
`;
