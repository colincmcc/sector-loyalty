import React from "react";
import styled from "styled-components";

const Header = props => {
  const { title, prevView } = props;

  return (
    <TopBarWrapper>
      <PageTitle>About</PageTitle>
    </TopBarWrapper>
  );
};

export default Header;

const TopBarWrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 86px;
  top: 0;
  left: 0;
`;

const PageTitle = styled.span`
  ${props => props.theme.fontStyles.heading};
  margin-top: 48px;
  margin-left: 24px;

  &.sub-header {
    ${props => props.theme.fontStyles.subheading};
    margin-top: 9px;
  }
`;
