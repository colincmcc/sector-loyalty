//
// @flow
//

import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import ViewComponent from './ViewComponent';


const ADD_VIEW = gql`
  mutation addToViewStack($key: String!, $pathName: String!) {
    addToViewStack(key: $key, pathName: $pathName) @client
  }
`;

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    state = {
      component: null,
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component,
      });
    }

    render() {
      const { component: C } = this.state;

      const componentWithMutation = (
        <Mutation mutation={ADD_VIEW}>

          {(addToViewStack, { client }) => <ViewComponent component={C} addToViewStack={addToViewStack} client={client} {...this.props} />}

        </Mutation>
      );
      return C ? componentWithMutation : null;
    }
  }
  return withRouter(AsyncComponent);
}
