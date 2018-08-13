//
// @flow
//

import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { slideLeft, slideRight } from '../../transitions';
import Header from './header/Header';

// TODO: move mutation call from AsyncComponent to ViewComponent to separate concerns

const GET_VIEWS = gql`
{
  currentView @client {
    key
    pathName
    title
  }
  prevView @client {
    key
    pathName
    title
  }
  views @client {
    key
    pathName
    title
  }
}
`;


type Props = {
  history: Object,
  location: Object,
  addToViewStack: Function,
  client: Function,
  component: React.Component
}

type State = {
  headerState: number,
  prevView: {
    key: string,
    pathName: string,
    title: string
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
    },
  };

  // On component mount update the cached viewstack, view the updated stack,
  // and use the last two views to determine the viewState/transition effect
  async componentDidMount() {
    const { location, addToViewStack, client } = this.props;
    const viewKey = location.key ? location.key : 'initialView';

    const variables = {
      pathName: location.pathname,
      key: viewKey,
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
  animateNavigation = (path) => {
    const { prevView } = this.state;
    const { history } = this.props;

    const goingBack = prevView.pathName === path;

    history.push({
      pathname: path,
      state: goingBack ? slideRight : slideLeft,
    });
  }


  render() {
    const { component: C } = this.props;
    const { prevView } = this.state;

    return (
      <PageWrapper id="main">
        <Content>
          <C
            {...this.props}
            animateNavigation={this.animateNavigation}
            goBack={this.goBack}
          />
        </Content>
      </PageWrapper>
    );
  }
}

export default ViewComponent;


const PageWrapper = styled.div`
width: 100%;
height: calc(100vh - 128px - 24px);
flex: 1;
position: absolute;
padding-left: 24px;
`;
const Content = styled.div`
position: relative;
max-width: 70rem;
margin: 134px auto 64px auto;
padding: 0 24px;
`;
