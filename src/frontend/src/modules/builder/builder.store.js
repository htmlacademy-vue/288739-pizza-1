import {
  UPDATE_ENTITY,
  SET_PIZZA,
  SET_INGREDIENTS,
  SET_PIZZA_PROPERTY,
  SET_BUILDER_LIST,
  SET_INGREDIENT_COUNT,
  RESET_BUILDER_STATE,
  RESET_PIZZA_STATE,
  RESET_INGREDIENTS_STATE,
  CHANGE_BUILDER_STATE,
} from "@/store/mutations-types";

import { BUILDER_DEFAULTS } from "@/common/constants";

const module = "Builder";

export default {
  namespaced: true,

  state: {
    ingredients: [],
    doughList: [],
    sizeList: [],
    sauceList: [],
    pizza: null,
  },

  mutations: {
    [SET_PIZZA](state, pizza) {
      state.pizza = pizza;
    },

    [SET_INGREDIENTS](state, ingredients) {
      state.ingredients = ingredients;
    },

    [SET_PIZZA_PROPERTY](state, { property, value }) {
      state.pizza[property] = value;
    },

    [SET_BUILDER_LIST](state, { list, value }) {
      state[list] = value;
    },

    [RESET_PIZZA_STATE](state) {
      const defaultDough = state.doughList.find(
        (it) => it.id === BUILDER_DEFAULTS.doughId
      );
      const defaultSize = state.sizeList.find(
        (it) => it.id === BUILDER_DEFAULTS.sizeId
      );
      const defaultSauce = state.sauceList.find(
        (it) => it.id === BUILDER_DEFAULTS.sauceId
      );

      const defaultPizzaState = {
        name: "",
        id: Date.now(),
        quantity: 1,
        dough: defaultDough,
        size: defaultSize,
        sauce: defaultSauce,
      };

      state.pizza = defaultPizzaState;
    },

    [RESET_INGREDIENTS_STATE](state) {
      state.ingredients = state.ingredients.map((it) => ({ ...it, count: 0 }));
    },
  },

  actions: {
    async query({ commit }) {
      const [doughList, sauceList, sizeList, ingredients] = await Promise.all([
        this.$api.dough.query(),
        this.$api.sauces.query(),
        this.$api.sizes.query(),
        this.$api.ingredients.query(),
      ]);

      commit(SET_BUILDER_LIST, { list: "doughList", value: doughList });
      commit(SET_BUILDER_LIST, { list: "sauceList", value: sauceList });
      commit(SET_BUILDER_LIST, { list: "sizeList", value: sizeList });
      commit(SET_BUILDER_LIST, { list: "ingredients", value: ingredients });
      commit(RESET_PIZZA_STATE);
    },

    [CHANGE_BUILDER_STATE]({ commit, state }, builderState) {
      const { ingredients, ...pizza } = builderState;

      commit(SET_PIZZA, pizza);

      const normalizedIngredients = state.ingredients.map((it) => {
        const ingredient = ingredients.find((item) => item.value === it.value);
        return ingredient ? ingredient : it;
      });

      commit(SET_INGREDIENTS, normalizedIngredients);
    },

    [SET_INGREDIENT_COUNT]({ commit }, { ingredient, count }) {
      commit(
        UPDATE_ENTITY,
        {
          module,
          entity: "ingredients",
          value: { ...ingredient, count },
        },
        { root: true }
      );
    },

    [RESET_BUILDER_STATE]({ commit }) {
      commit(RESET_PIZZA_STATE);
      commit(RESET_INGREDIENTS_STATE);
    },
  },

  getters: {
    selectedPizzaIngredients(state) {
      return state.ingredients.filter((it) => it.count > 0);
    },

    pizzaPrice(state, getters) {
      const doughPrice = state.pizza?.dough.price || 0;
      const saucePrice = state.pizza?.sauce.price || 0;
      const sizeMultiplier = state.pizza?.size.multiplier || 1;
      const ingredientsTotalPrice = getters.selectedPizzaIngredients.reduce(
        (acc, it) => acc + it.count * it.price,
        0
      );

      return (doughPrice + saucePrice + ingredientsTotalPrice) * sizeMultiplier;
    },

    isPizzaOrderReady(state, getters) {
      return Boolean(
        getters.selectedPizzaIngredients.length && state.pizza.name
      );
    },
  },
};
