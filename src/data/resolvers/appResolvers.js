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
    viewIndex: 0,
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
            viewIndex @client
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

        // set previous view to first index value, before adding the new view.
        // if this is the first render then set a blank view
        const prevView = previous.views.length > 0
          ? previous.views[0]
          : {
            key: '',
            pathName: '',
            title: '',
            text: '',
            __typename: 'ViewItem',
          };
        // There's a possibility of future React Native code sharing React Native may have
        // an issue with long lists and this view list could get pretty long over time
        if (previous.views.length > 5) previous.views.pop();
        previous.views.unshift(nextView); // Note: unshift returns length of array, not the updated array
        const updated = previous.views;

        const data = {
          viewIndex: previous.viewIndex + 1,
          prevView,
          views: updated,
          currentView: nextView,
        };
        cache.writeData({ data });
        return null;
      },
      removeViewFromStack: (_, props, { cache }) => {
        const query = gql`
          query GetViewIndex {
            viewIndex @client
            views @client {
              key
              pathName
              title
              text
            }
          }
        `;

        const previous = cache.readQuery({ query });
        const updatedIndex = previous.viewIndex + 1
        const currentView = 
        const data = {
          viewIndex: previous.viewIndex + 1,
          prevView: 
        };
        cache.writeData({ data });
        return null;
      },
    },
  },
};

export default appResolvers;
