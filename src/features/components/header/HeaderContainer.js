//
// @flow
//

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Header from './Header';

const GET_VIEWS = gql`
{
  currentView @client {
    key
    pathName
  }
  prevView @client {
    key
    pathName
  }
  views @client {
    key
    pathName
  }
}
`;

type Props = {
  location: Object,
  title: string
}

// Header state is defined as follows
// 0 = initial state (do nothing)
// 1 = going back & move subheader into header position
// 1 = going forward & move header to subHeader
// 2 = going deeper.  Move header to subheader and move old subheader off screen

const HeaderContainer = (props: Props) => (
  <Query query={GET_VIEWS}>
    {
    ({ data, loading, error }) => {
      if (!loading) {
        const { location, title } = props;
        const { views, prevView, currentView } = data;
        let headerState = 0; // initial state

        console.log(views);
        if (location.pathname !== prevView.pathName && views.length > 1) headerState = 1;
        if (location.pathname === prevView.pathName) headerState = 2;

        return <Header {...props} />;
      }
    }
  }
  </Query>
);

export default HeaderContainer;
