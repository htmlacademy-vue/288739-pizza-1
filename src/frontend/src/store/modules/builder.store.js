import {
  SET_PIZZA_NAME,
  SET_PIZZA_DOUGH,
  SET_PIZZA_SIZE,
  SET_PIZZA_SAUCE,
  CHANGE_INGREDIENT_COUNT,
  RESET_BUILDER_STATE,
  CHANGE_BUILDER_STATE,
} from "@/store/mutations-types";

import {
  normalizeDough,
  normalizeIngredient,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";

import jsonPizza from "@/static/pizza.json";

const getDefaultState = () => ({
  ingredients: jsonPizza.ingredients.map(normalizeIngredient),
  doughList: jsonPizza.dough.map(normalizeDough),
  sizeList: jsonPizza.sizes.map(normalizeSize),
  sauceList: jsonPizza.sauces.map(normalizeSauce),
  pizzaName: "",
  pizzaDough: "light",
  pizzaSize: "small",
  pizzaSauce: "tomato",
  pizzaId: Date.now(),
  pizzaQuantity: 1,
});

export default {
  namespaced: true,

  state: getDefaultState(),

  mutations: {
    [SET_PIZZA_NAME](state, value) {
      state.pizzaName = value;
    },

    [SET_PIZZA_DOUGH](state, value) {
      state.pizzaDough = value;
    },

    [SET_PIZZA_SIZE](state, value) {
      state.pizzaSize = value;
    },

    [SET_PIZZA_SAUCE](state, value) {
      state.pizzaSauce = value;
    },

    [CHANGE_INGREDIENT_COUNT](state, { value, count }) {
      const ingredient = state.ingredients.find((it) => it.value === value);
      ingredient.count = count;
    },

    [CHANGE_BUILDER_STATE](state, pizza) {
      state.pizzaId = pizza.id;
      state.pizzaQuantity = pizza.quantity;
      state.pizzaName = pizza.name;
      state.pizzaDough = pizza.dough;
      state.pizzaSize = pizza.size;
      state.pizzaSauce = pizza.sauce;
      state.ingredients = state.ingredients.map((it) => {
        const ingredient = pizza.ingredients.find(
          (item) => item.value === it.value
        );
        return ingredient ? ingredient : it;
      });
    },

    [RESET_BUILDER_STATE](state) {
      Object.assign(state, getDefaultState());
    },
  },

  getters: {
    selectedPizzaIngredients(state) {
      return state.ingredients.filter((it) => it.count > 0);
    },

    pizzaPrice(state, getters) {
      const dough = state.doughList.find((it) => it.value === state.pizzaDough);
      const sauce = state.sauceList.find((it) => it.value === state.pizzaSauce);
      const size = state.sizeList.find((it) => it.value === state.pizzaSize);
      const ingredientsTotalPrice = getters.selectedPizzaIngredients.reduce(
        (acc, it) => {
          acc += it.count * it.price;
          return acc;
        },
        0
      );

      return (
        (dough.price + sauce.price + ingredientsTotalPrice) * size.multiplier
      );
    },

    isPizzaOrderReady(state, getters) {
      return Boolean(
        getters.selectedPizzaIngredients.length && state.pizzaName
      );
    },
  },
};
