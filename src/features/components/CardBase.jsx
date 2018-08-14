//
// @flow
//

import React from 'react';
import styled from 'styled-components';

type Props = {
  children: [React.Component]
}
const CardBase = (props: Props) => {
  const { children, bgColor } = props;
  return (
    <CardWrapper bgColor={bgColor}>
      { children }
    </CardWrapper>);
};


export default CardBase;
const CardWrapper = styled.div`
  min-height: 120px;
  border-radius: 0;
  padding: 24px;
  background-color: ${props => props.bgColor};
`;
