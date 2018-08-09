import React, { Component } from 'react'
import gql from 'graphql-tag';
import { slideLeft, slideRight } from "../../transitions";

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
    prevView: {
      key: "",
      pathName: "",
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

    return <C
    {...this.props}
    animateNavigation={this.animateNavigation}
    goBack={this.goBack}
    />

  }
}

export default ViewComponent

