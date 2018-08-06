import React, { Component } from 'react';
import {persistor, apolloClient, cacheStorage} from './data/client'
import styled, {ThemeProvider} from 'styled-components'
import { Switch, Route, withRouter } from 'react-router-dom'
import {ApolloProvider} from 'react-apollo'

import theme from './assets/theme'

import asyncComponent from './features/components'

const AsyncHome = asyncComponent(() => import("./features/homepage/HomeContainer"))


const SCHEMA_VERSION = '1';
const SCHEMA_VERSION_KEY = 'sector-schema-version'

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      client: null,
      loaded: false
    };
  }
  async componentDidMount(){
    const currentVersion = await cacheStorage.getItem(SCHEMA_VERSION_KEY);
    if (currentVersion === SCHEMA_VERSION) {
      // If the current version matches the latest version,
      // we're good to go and can restore the cache.
      await persistor.restore();
    } else {
      // Otherwise, we'll want to purge the outdated persisted cache
      // and mark ourselves as having updated to the latest version.
      await persistor.purge();
      await cacheStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
    }

    this.setState({
      client: apolloClient,
      loaded: true,
    });
  }

  previousLocation = this.props.location;
  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const {client, loaded} = this.state

    if(!loaded) return <div>Loading...</div>
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );

    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme} >
          <div className="App">
          <Switch location={isModal ? this.previousLocation : location}>
            <Route exact path="/" component={AsyncHome} />
            <Route path="/Home" component={AsyncHome} />
          </Switch>
          </div>
      </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withRouter(App);
