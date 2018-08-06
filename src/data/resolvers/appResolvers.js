const appResolvers =  {
  defaults: {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: true,
    },
    isLoggedIn: false,
    mobileMenuOpen: false,
    currentLocation: 1,

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
      selectLocation: (_, { currentLocation }, { cache }) => {
        cache.writeData({ data: { currentLocation: currentLocation } });
        return null;
      },
    }
  }
}

export default appResolvers