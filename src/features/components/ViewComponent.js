import React, { Component } from 'react'

export class ViewComponent extends Component {

  componentDidMount(){
    const { location, updateViewStack } = this.props;
    const viewKey = location.key ? location.key : "initialView";
    console.log(viewKey);
    const variables = {
      pathName: location.pathname,
      key: viewKey
    };
    updateViewStack({ variables });
  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const C = this.props.component
    return <C {...this.props} goBack={this.goBack} />
  }
}

export default ViewComponent

