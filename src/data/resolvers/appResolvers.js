import gql from 'graphql-tag';


const appResolvers = {
  defaults: {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: true,
    },
    isLoggedIn: false,
    mobileMenuOpen: false,
    views: [],
    currentView: null,
    prevView: null,
  },
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        const data = {
          networkStatus: {
            __typename: 'NetworkStatus',
            isConnected,
          },
        };
        cache.writeData({ data });
        return null;
      },
      updateMobileMenuStatus: (_, { mobileMenuOpen }, { cache }) => {
        cache.writeData({ data: { mobileMenuOpen } });
        return null;
      },
      addToViewStack: (_, { key, pathName, title }, { cache }) => {
        const query = gql`
          query GetViewStack {
            views @client {
              key
              pathName
            }
          }
        `;
        const previous = cache.readQuery({ query });

        const nextView = {
          key,
          pathName,
          __typename: 'ViewItem',
        };
        const prevView = previous.views.length > 0 ? previous.views.slice(-1)[0] : { key: '', pathName: '', __typename: 'ViewItem' };

        // There's a possibility of future React Native code sharing React Native may have
        // an issue with long lists and this view list could get pretty long over time
        if (previous.views.length > 3) previous.views.shift();

        const updated = previous.views.concat([nextView]);

        const data = {
          prevView,
          views: updated,
          currentView: nextView,
        };
        cache.writeData({ data });
        return prevView;
      },
      removeFromViewStack: (_, { cache }) => {
        const query = gql`
          query GetViewStack {
            views @client {
              key
              pathName
            }
          }
        `;
        const previous = cache.readQuery({ query });
        const updated = previous.views.slice(0, -1);
        const data = {
          views: updated,
        };
        cache.writeData({ data });
        return null;
      },
    },
  },
};

export default appResolvers;
