import React, { Component } from 'react';

import { Switch, Route, withRouter, Redirect } from 'react-router-dom'

import {ApolloProvider} from 'react-apollo'
import {ThemeProvider} from 'styled-components'

import {persistor, apolloClient, cacheStorage} from './data/client'
import theme from './assets/theme'

import Transitions from './transitions'
import asyncComponent from './features/components/AsyncComponent'

const AsyncHome = asyncComponent(() => import("./features/homepage/HomepageContainer"))
const AsyncUser = asyncComponent(() => import("./features/userInfo/UserInfoContainer"))


/** * All paths are routed through AsyncComponent => ViewComponent => Requested Container => Requested Component
* * AsyncComponent handles codesplitting and lazy loading
* * ViewComponent handles updating a cached view stack within Apollo
* * Container handles the viewState depending on the position of the view in the viewStack
* * Component renders the correct component with the proper transition
**/

// Identify current GraphQL schema.  Apollo will purge clients cache when this is updated
const SCHEMA_VERSION = '1';
const SCHEMA_VERSION_KEY = 'sector-schema-version'




class App extends Component {

  // Initially set loaded to false, to ensure Apollo draws from cache if available
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      loaded: false
    };
  }

  // Check to see if schema is up to date and then restore or purge cache.  Then set loaded to true
  async componentDidMount(){
    const currentVersion = await cacheStorage.getItem(SCHEMA_VERSION_KEY);
    if (currentVersion === SCHEMA_VERSION) {
      // If the current version matches the latest version,
      // we're good to go and can restore the cache.
      await persistor.purge(); // TODO set to restore()
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

  // Handle modal pop
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

    // * if it's a modal popup keep the background location
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );

    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme} >
        <Route
          render={({ location }) => (
            <Transitions pageKey={location.key} {...location.state}>
              <Switch location={isModal ? this.previousLocation : location}>
                <Redirect exact from="/" to="/Home" />
                <Route path="/Home" component={AsyncHome} />
                <Route path="/User" component={AsyncUser} />
              </Switch>
            </Transitions>
          )} />
      </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withRouter(App);
