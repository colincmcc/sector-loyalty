//
// @flow
//

import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { slideLeft, slideRight } from '../../transitions';

import HeaderContainer from './header/HeaderContainer';

// TODO: move mutation call from AsyncComponent to ViewComponent to separate concerns

const GET_VIEWS = gql`
{
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

const REMOVE_VIEW = gql`
  mutation removeViewFromStack {
    removeViewFromStack @client
  }
`;

type Props = {
  history: Object,
  location: Object,
  addToViewStack: Function,
  client: Function,
  component: React.Component,
  title: string,
  text: string
}

type State = {
  headerState: number,
  prevView: {
    key: string,
    pathName: string,
    title: string,
    text: string
    }
}

class ViewComponent extends Component<Props, State> {
  // prevView is used to determine if the animation is forward or backwards in the below animateNavigation function

  state = {
    prevView: {
      key: '',
      pathName: '',
      title: '',
      text: '',
    },
  };

  // On component mount update the cached viewstack, view the updated stack,
  // and use the last two views to determine the viewState/transition effect
  async componentDidMount() {
    const { client } = this.props;

    client
      .query({ query: GET_VIEWS })
      .then(({ data }) => this.setViewState(data));
  }

  // Set the previous view to state
  setViewState(data) {
    const { prevView } = data;
    console.log(data);
    this.setState({
      prevView,
    });
  }

  // Using this function instead of react-router Link to navigate
  animateNavigation = (path) => {
    const { prevView } = this.state;
    const {
      history, location, addToViewStack, client, title, text,
    } = this.props;
    const goingBack = prevView.pathName === path;
    const animationDirection = goingBack ? slideRight : slideLeft;

    const variables = {
      pathName: location.pathname, key: location.key, title, text,
    };

    // First do a  GraphQL mutation with defined variables
    // Then Query cache to get previous location and pass it to state
    addToViewStack({ variables });
  }


  render() {
    const { component: C } = this.props;

    return (
      <PageWrapper id="main">
        <Content>
          <C
            {...this.props}
            animateNavigation={this.animateNavigation}
          />
        </Content>
      </PageWrapper>
    );
  }
}

export default ViewComponent;


const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  position: absolute;
  background-color: white;
`;
const Content = styled.div`
position: relative;
height: 100%;
max-width: 70rem;
margin: 134px auto 64px auto;
`;
