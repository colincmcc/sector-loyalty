import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const UserInfoComponent = props => {
  return (
    <UserInfoWrapper>
      <p>This is a test</p>
      <div>
        <Link to="/Home"> Home </Link>
      </div>
      <div>
        <button onClick={() => props.goBack()}>> Go Back </button>
      </div>
    </UserInfoWrapper>
  );
};

export default UserInfoComponent;

const UserInfoWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  margin: auto;
`;
