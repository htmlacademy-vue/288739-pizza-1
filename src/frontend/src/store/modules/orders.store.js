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

    async post({ rootState }) {
      const userId = rootState.Auth.user?.id ?? null;

      const pizzaList = rootState.Cart.pizzaList.map((pizza) => ({
        name: pizza.name,
        sauceId: pizza.sauce.id,
        doughId: pizza.dough.id,
        sizeId: pizza.size.id,
        quantity: pizza.quantity,
        ingredients: pizza.ingredients.map((it) => ({
          ingredientId: it.id,
          quantity: it.count,
        })),
      }));

      const additionalList = rootState.Cart.additionalList
        .filter((it) => it.quantity > 0)
        .map((it) => ({
          miscId: it.id,
          quantity: it.quantity,
        }));

      const cartAddress = rootState.Cart.address;

      let address = null;

      if (cartAddress) {
        address = cartAddress.id ? { id: cartAddress.id } : cartAddress;
      }

      const order = {
        userId,
        phone: rootState.Cart.phone,
        pizzas: pizzaList,
        misc: additionalList,
        address,
      };

      await this.$api.orders.post(order);
    },
  },
};
