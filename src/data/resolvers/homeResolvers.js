const homeResolvers = {
  defaults: {
    selectedFoodType: "brunch",
    selectedDrinkType: "cocktails",
    lvTaps: [],
    nfTaps: [],
    foodItems: [],
    drinkItems: []
  },
  resolvers: {
    Mutation: {
      selectFoodType: (_, { selectedFoodType }, { cache }) => {
        cache.writeData({ data: { selectedFoodType: selectedFoodType } });
        return null;
      },
      selectDrinkType: (_, { selectedDrinkType }, { cache }) => {
        cache.writeData({ data: { selectedDrinkType: selectedDrinkType } });
        return null;
      },

    }
  }
}

export default homeResolvers;