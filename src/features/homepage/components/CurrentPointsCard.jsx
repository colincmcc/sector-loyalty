import React from 'react';
import styled from 'styled-components';
import CardBase from '../../components/CardBase';

type Props = {
  points: number,
  userName: string,
}

const CurrentPointsCard = props => (
  <CardBase bgColor="#252525">
    <PointsCardWrapper>
      <UserPoints>
        0
      </UserPoints>
    </PointsCardWrapper>
  </CardBase>
);

export default CurrentPointsCard;

const PointsCardWrapper = styled.div`
display: flex;
flex-direction: row;
width: 100%;
height: 100%;
`;

const UserPoints = styled.div`
${props => props.theme.fontStyles.xtra_large};
color: white;
`;

const ExpandingPointsDesc = styled.div`
  ${props => props.theme.fontStyles.text};

`;
