import {
  SET_ENTITY,
  SET_PIZZA_NAME,
  SET_PIZZA_DOUGH,
  SET_PIZZA_SIZE,
  SET_PIZZA_SAUCE,
  CHANGE_INGREDIENT_COUNT,
  RESET_BUILDER_STATE,
  CHANGE_BUILDER_STATE,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    ingredients: [],
    doughList: [],
    sizeList: [],
    sauceList: [],
    pizzaName: "",
    pizzaDough: "light",
    pizzaSize: "small",
    pizzaSauce: "tomato",
    pizzaId: Date.now(),
    pizzaQuantity: 1,
  },

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
      Object.assign(state, {
        ingredients: state.ingredients.map((it) => ({ ...it, count: 0 })),
        pizzaName: "",
        pizzaDough: "light",
        pizzaSize: "small",
        pizzaSauce: "tomato",
        pizzaId: Date.now(),
        pizzaQuantity: 1,
      });
    },
  },

  actions: {
    async query({ commit }) {
      const [dough, sauces, sizes, ingredients] = await Promise.all([
        this.$api.dough.query(),
        this.$api.sauces.query(),
        this.$api.sizes.query(),
        this.$api.ingredients.query(),
      ]);

      commit(
        SET_ENTITY,
        { module: "Builder", entity: "doughList", value: dough },
        { root: true }
      );

      commit(
        SET_ENTITY,
        { module: "Builder", entity: "sauceList", value: sauces },
        { root: true }
      );

      commit(
        SET_ENTITY,
        { module: "Builder", entity: "sizeList", value: sizes },
        { root: true }
      );

      commit(
        SET_ENTITY,
        { module: "Builder", entity: "ingredients", value: ingredients },
        { root: true }
      );
    },
  },

  getters: {
    selectedPizzaIngredients(state) {
      return state.ingredients.filter((it) => it.count > 0);
    },

    pizzaPrice(state, getters) {
      const doughPrice =
        state.doughList.find((it) => it.value === state.pizzaDough)?.price || 0;
      const saucePrice =
        state.sauceList.find((it) => it.value === state.pizzaSauce)?.price || 0;
      const sizeMultiplier =
        state.sizeList.find((it) => it.value === state.pizzaSize)?.multiplier ||
        1;
      const ingredientsTotalPrice = getters.selectedPizzaIngredients.reduce(
        (acc, it) => {
          acc += it.count * it.price;
          return acc;
        },
        0
      );

      return (doughPrice + saucePrice + ingredientsTotalPrice) * sizeMultiplier;
    },

    isPizzaOrderReady(state, getters) {
      return Boolean(
        getters.selectedPizzaIngredients.length && state.pizzaName
      );
    },
  },
};
