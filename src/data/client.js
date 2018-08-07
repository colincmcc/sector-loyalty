import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';


import { toIdValue } from 'apollo-utilities';

import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import merge from 'lodash.merge'
import { dev, prod } from "./config";

import homeResolvers from './resolvers/homeResolvers'
import appResolvers from './resolvers/appResolvers'



export const cacheStorage = window.localStorage


  /**
 * * Cache and persistence setup
 * * persisted data is cleared if there is a new Schema version
*/
  const cache = new InMemoryCache({
    cacheRedirects: {
      Query: {
        foodsBy: (_, { id }) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Food', id })),
      },

    },
    dataIdFromObject: object => object.key || null
  });


  export const persistor = new CachePersistor({
    cache,
    storage: cacheStorage,
  });


  /**
   * * Client setup
   *
  */

  const typeDefs = `
    type NetworkStatus {
      isConnected: Boolean!
    }
    type View {
      key: Int!
      pathName: String!
    }


    type Mutation {
      updateViewStack(key: String!, pathName: String!) : View
    }

    type Query {
      views: [View]
    }

  `;

  export const apolloClient = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          )}
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      withClientState({
        ...merge(appResolvers, homeResolvers),
        typeDefs,
        cache
      }),
      new HttpLink({
        uri: dev.graphQLEndpoint,
      })
    ]),
    cache
  });



