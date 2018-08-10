import React, { Component } from 'react'
import gql from 'graphql-tag';
import styled from 'styled-components'

import { slideLeft, slideRight } from "../../transitions";
import Header from './header/Header'

// TODO: move mutation call from AsyncComponent to ViewComponent to separate concerns

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
`


export class ViewComponent extends Component {

  // prevView is used to determine if the animation is forward or backwards in the below animateNavigation function

  state = {
    headerState: 0,
    prevView: {
      key: "",
      pathName: "",
      title: ""
    },
  };

  // On component mount update the cached viewstack, view the updated stack,
  // and use the last two views to determine the viewState/transition effect
  async componentDidMount(){
    const { location, addToViewStack, client } = this.props;
    const viewKey = location.key ? location.key : "initialView";

    const variables = {
      pathName: location.pathname,
      key: viewKey
    };

    // First do a  GraphQL mutation with defined variables
    // Then Query cache to get previous location and pass it to state
    addToViewStack({ variables }).then(() =>
      client.query({
        query: GET_VIEWS
      }).then(({data}) => this.setViewState(data)))
  }

  // Set the previous view to state
  setViewState(data){
    const {prevView} = data

    this.setState({
      prevView: prevView,
    })
  }

  goBack = () => {
    const { history } = this.props
    const {prevView} = this.state
    history.push({
      pathname: prevView.pathName,
      state: slideRight
    })
  };

  animateNavigation = (path) => {
    const {prevView} = this.state
    const {history} = this.props

    let goingBack = prevView.pathName === path

    history.push({
      pathname: path,
      state: goingBack ? slideRight : slideLeft
    })
  }


  render() {
    const C = this.props.component
    const { prevView } = this.state

    return(
      <PageWrapper id="main">
        <Header prevView={ prevView } />

        <C
        {...this.props}
        animateNavigation={this.animateNavigation}
        goBack={this.goBack}
        />

      </PageWrapper>
  )

  }
}

export default ViewComponent


const PageWrapper = styled.div`
max-width: 70rem;
width: 100%;
height: calc(100vh - 128px - 24px);
flex: 1;
margin: 128px auto 24px auto;
position: absolute;
`
