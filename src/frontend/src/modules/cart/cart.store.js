import {
  DELETE_ENTITY,
  UPDATE_ENTITY,
  SET_ADDITIONAL_LIST,
  ADD_PIZZA_TO_CART,
  INCREMENT_PIZZA_QUANTITY,
  DECREMENT_PIZZA_QUANTITY,
  INCREMENT_ADDITIONAL_QUANTITY,
  DECREMENT_ADDITIONAL_QUANTITY,
  RESET_CART_STATE,
  SET_ADDRESS_PROPERTY,
  SET_ADDRESS,
  SET_PHONE,
  REPEAT_ORDER,
} from "@/store/mutations-types";

const module = "Cart";

export default {
  namespaced: true,

  state: {
    pizzaList: [],
    additionalList: [],
    address: null,
    phone: "",
  },

  mutations: {
    [ADD_PIZZA_TO_CART](state, pizza) {
      let pizzaListItem = state.pizzaList.find((item) => item.id === pizza.id);

      if (pizzaListItem) {
        Object.assign(pizzaListItem, pizza);
      } else {
        state.pizzaList.push(pizza);
      }
    },

    [SET_ADDITIONAL_LIST](state, additionalList) {
      state.additionalList = additionalList;
    },

    [RESET_CART_STATE](state) {
      Object.assign(state, {
        pizzaList: [],
        additionalList: state.additionalList.map((it) => ({
          ...it,
          quantity: 0,
        })),
        address: null,
        phone: "",
      });
    },

    [SET_ADDRESS_PROPERTY](state, { property, value }) {
      state.address[property] = value;
    },

    [INCREMENT_ADDITIONAL_QUANTITY](state, additional) {
      const additionalListItem = state.additionalList.find(
        (it) => it.id === additional.id
      );
      additionalListItem.quantity += 1;
    },

    [DECREMENT_ADDITIONAL_QUANTITY](state, additional) {
      const additionalListItem = state.additionalList.find(
        (it) => it.id === additional.id
      );
      if (additionalListItem.quantity !== 0) {
        additionalListItem.quantity -= 1;
      }
    },

    [REPEAT_ORDER](state, order) {
      state.pizzaList = order.pizzaList;

      state.additionalList = state.additionalList.map((it) => {
        const orderAdditionalItem = order.additionalList.find(
          (item) => item.id === it.id
        );
        return { ...it, quantity: orderAdditionalItem?.quantity || 0 };
      });
    },

    [SET_ADDRESS](state, address) {
      state.address = address;
    },

    [SET_PHONE](state, phone) {
      state.phone = phone;
    },
  },

  actions: {
    async query({ commit }) {
      const data = await this.$api.misc.query();
      commit(SET_ADDITIONAL_LIST, data);
    },

    async submitOrder({ state, rootState }) {
      const userId = rootState.Profile.user?.id ?? null;

      const pizzaList = state.pizzaList.map((pizza) => ({
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

      const additionalList = state.additionalList
        .filter((it) => it.quantity > 0)
        .map((it) => ({
          miscId: it.id,
          quantity: it.quantity,
        }));

      const cartAddress = state.address;

      let address = null;

      if (cartAddress) {
        address = cartAddress.id ? { id: cartAddress.id } : cartAddress;
      }

      const order = {
        userId,
        phone: state.phone,
        pizzas: pizzaList,
        misc: additionalList,
        address,
      };

      await this.$api.orders.post(order);
    },

    [ADD_PIZZA_TO_CART]({ rootState, rootGetters, commit, dispatch }) {
      const builderPizza = rootState.Builder.pizza;

      const normalizedPizza = {
        id: builderPizza.id,
        name: builderPizza.name,
        dough: builderPizza.dough,
        size: builderPizza.size,
        sauce: builderPizza.sauce,
        ingredients: rootGetters["Builder/selectedPizzaIngredients"],
        price: rootGetters["Builder/pizzaPrice"],
        quantity: builderPizza.quantity,
      };

      commit(ADD_PIZZA_TO_CART, normalizedPizza);

      dispatch("Builder/RESET_BUILDER_STATE", null, { root: true });
    },

    [INCREMENT_PIZZA_QUANTITY]({ commit }, pizza) {
      commit(
        UPDATE_ENTITY,
        {
          module,
          entity: "pizzaList",
          value: { ...pizza, quantity: pizza.quantity + 1 },
        },
        { root: true }
      );
    },

    [DECREMENT_PIZZA_QUANTITY]({ commit }, pizza) {
      if (pizza.quantity === 1) {
        commit(
          DELETE_ENTITY,
          {
            module,
            entity: "pizzaList",
            id: pizza.id,
          },
          { root: true }
        );
      } else {
        commit(
          UPDATE_ENTITY,
          {
            module,
            entity: "pizzaList",
            value: { ...pizza, quantity: pizza.quantity - 1 },
          },
          { root: true }
        );
      }
    },
  },

  getters: {
    pizzaListPrice(state) {
      return state.pizzaList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },

    additionalListPrice(state) {
      return state.additionalList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },

    orderPrice(state, getters) {
      return getters.pizzaListPrice + getters.additionalListPrice;
    },
  },
};
