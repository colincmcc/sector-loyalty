//
// @flow
//

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import shortid from 'shortid';
import Header from './Header';

const GET_VIEWS = gql`
{
  currentView @client {
    key
    pathName
    title
    text
  }
  prevView @client {
    key
    pathName
    title
    text
  }
  views @client {
    key
    pathName
    title
    text
  }
}
`;

type Props = {
  location: Object
}

const HeaderContainer = (props: Props) => (
  <Query query={GET_VIEWS}>
    {
    ({ data, loading, error }) => {
      if (data) {
        const { state } = props.location;
        const { views } = data;
        const renderedHeaders = views.slice(0, 4);
        const isGoingBack = state ? state.goingBack : false;

        console.log(views);
        return renderedHeaders.map((view, index) => (
          <Header
            key={shortid.generate()}
            isGoingBack={isGoingBack}
            index={index}
            view={view}
            allViews={views}
          />
        ));
      }
      return null;
    }
  }
  </Query>
);

export default HeaderContainer;
