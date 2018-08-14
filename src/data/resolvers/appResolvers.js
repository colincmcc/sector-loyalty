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
      addToViewStack: (_, {
        key, pathName, title, text,
      }, { cache }) => {
        const query = gql`
          query GetViewStack {
            views @client {
              key
              pathName
              title
              text
            }
          }
        `;
        const previous = cache.readQuery({ query });

        const nextView = {
          key,
          pathName,
          title,
          text,
          __typename: 'ViewItem',
        };
        const prevView = previous.views.length > 0 ? previous.views[0] : {
          key: '', pathName: '', title: '', text: '', __typename: 'ViewItem',
        };

        // There's a possibility of future React Native code sharing React Native may have
        // an issue with long lists and this view list could get pretty long over time
        if (previous.views.length > 2) previous.views.pop();

        previous.views.unshift(nextView); // returns length of array
        const updated = previous.views;

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
