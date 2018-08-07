import gql from 'graphql-tag';


const appResolvers =  {
  defaults: {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: true,
    },
    isLoggedIn: false,
    mobileMenuOpen: false,
    views: []
  },
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        const data = {
          networkStatus: {
            __typename: 'NetworkStatus',
            isConnected
          },
        };
        cache.writeData({ data });
        return null;
      },
      updateMobileMenuStatus: (_, { mobileMenuOpen }, { cache }) => {
        cache.writeData({ data: { mobileMenuOpen: mobileMenuOpen } });
        return null;
      },
      updateViewStack: (_, {key, pathName}, { cache }) => {
        const query = gql`
          query GetViewStack {
            views @client {
              key
              pathName
            }
          }
        `
        const previous = cache.readQuery({ query })
        const nextView = {
          key: key,
          pathName: pathName,
          __typename: 'ViewItem'
        }
        const data = {
          views: previous.views.concat([nextView])
        }
        cache.writeData({data})
        return nextView
      },
    }
  }
}

export default appResolvers