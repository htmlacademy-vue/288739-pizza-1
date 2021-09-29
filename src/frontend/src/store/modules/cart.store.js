import { ADD_TO_CART } from "@/store/mutations-types";

import misc from "@/static/misc.json";
import { normalizeMisc } from "@/common/helpers";

const getDefaultState = () => ({
  cart: [],
  misc: misc.map(normalizeMisc),
});

export default {
  namespaced: true,

  state: getDefaultState(),

  mutations: {
    [ADD_TO_CART](state, order) {
      state.cart.push(order);
    },
  },

  getters: {
    orderPrice(state) {
      const pizzaPrice = state.cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const miscPrice = state.misc.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      return pizzaPrice + miscPrice;
    },
  },

  actions: {
    [ADD_TO_CART]({ rootState, rootGetters, commit }) {
      commit(ADD_TO_CART, {
        id: Date.now(),
        name: rootState.Builder.pizzaName,
        dough: rootState.Builder.pizzaDough,
        size: rootState.Builder.pizzaSize,
        sauce: rootState.Builder.pizzaSauce,
        ingredients: rootGetters["Builder/selectedPizzaIngredients"],
        price: rootGetters["Builder/pizzaPrice"],
        quantity: 1,
      });

      commit("Builder/RESET_BUILDER_STATE", null, { root: true });
    },
  },
};
