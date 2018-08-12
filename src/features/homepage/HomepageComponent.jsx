//
// @flow
//

import React from 'react';
import styled from 'styled-components';

type Props = {
  animateNavigation: Function,
  goBack: Function
}

const HomepageComponent = (props: Props) => {
  const { animateNavigation, goBack } = props;
  return (
    <HomepageWrapper className="content" id="home">
      <Content>
        <p>
          This is a test
        </p>
        <div>
          <button type="button" onClick={() => animateNavigation('/Home')}>
            Home
          </button>
        </div>
        <div>
          <button type="button" onClick={() => animateNavigation('/User')}>
            User
          </button>
        </div>
        <div>
          <button type="button" onClick={() => goBack()}>
            Go Back
          </button>
        </div>
      </Content>
    </HomepageWrapper>
  );
};

export default HomepageComponent;

const HomepageWrapper = styled.div`
  margin-top: 48px;
`;

const Content = styled.div``;
