import { DELETE_ENTITY, SET_ORDERS } from "@/store/mutations-types";
import { getNormalizedOrder } from "@/common/helpers";

export default {
  namespaced: true,

  state: {
    orders: [],
  },

  mutations: {
    [SET_ORDERS](state, orders) {
      state.orders = orders;
    },
  },

  actions: {
    async query({ commit, rootState }) {
      const orders = await this.$api.orders.query();

      const { sauceList, doughList, sizeList, ingredients } = rootState.Builder;
      const builderData = { sauceList, doughList, sizeList, ingredients };
      const additionalList = rootState.Cart.additionalList;

      const normalizedOrders = orders.map((it) =>
        getNormalizedOrder(it, builderData, additionalList)
      );

      commit(SET_ORDERS, normalizedOrders);
    },

    async delete({ commit }, id) {
      await this.$api.orders.delete(id);

      commit(
        DELETE_ENTITY,
        {
          module: "Orders",
          entity: "orders",
          id,
        },
        { root: true }
      );
    },
  },
};
