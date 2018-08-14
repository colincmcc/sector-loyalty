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
    headerState: 0,
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
    const {
      location, addToViewStack, client, title, text,
    } = this.props;
    const viewKey = location.key ? location.key : 'initialView';

    const variables = {
      pathName: location.pathname,
      key: viewKey,
      title,
      text,
    };

    // First do a  GraphQL mutation with defined variables
    // Then Query cache to get previous location and pass it to state
    addToViewStack({ variables }).then(() => client.query({
      query: GET_VIEWS,
    }).then(({ data }) => this.setViewState(data)));
  }

  // Set the previous view to state
  setViewState(data) {
    const { prevView } = data;
    this.setState({
      prevView,
    });
  }

  goBack = () => {
    const { history } = this.props;
    const { prevView } = this.state;

    history.push({
      pathname: prevView.pathName,
      state: slideRight,
    });
  };

  // Using this function instead of react-router Link to navigate
  animateNavigation = (path, title, text) => {
    const { prevView } = this.state;
    const { history } = this.props;

    const goingBack = prevView.pathName === path;
    const animationDirection = goingBack ? slideRight : slideLeft;

    history.push({
      pathname: path,
      state: {
        title, text, goingBack, ...animationDirection,
      },
    });
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
