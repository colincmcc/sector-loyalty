import React, { Component } from 'react'
import UserInfoComponent from './UserInfoComponent'

class UserInfoContainer extends Component {

  state = {
    viewState: "initial"
  }
  static getDerivedStateFromProps(props, state){

    return null;
  }

  render(){
    return <UserInfoComponent {...this.props} />

  }

}

export default UserInfoContainer
