import {
  SET_ADDRESSES,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    addresses: [],
  },

  mutations: {
    [SET_ADDRESSES](state, addresses) {
      state.addresses = addresses;
    },
  },

  actions: {
    async query({ commit }) {
      const addresses = await this.$api.addresses.query();
      commit(SET_ADDRESSES, addresses);
    },

    async post({ state, commit }, body) {
      const data = await this.$api.addresses.post(body);
      commit(SET_ADDRESSES, [...state.addresses, data]);
    },

    async delete({ commit }, id) {
      await this.$api.addresses.delete(id);

      commit(
        DELETE_ENTITY,
        {
          module: "Addresses",
          entity: "addresses",
          id,
        },
        { root: true }
      );
    },

    async put({ state, commit }, body) {
      await this.$api.addresses.put(body);

      const address = state.addresses.find((it) => it.id === body.id);

      if (address) {
        commit(
          UPDATE_ENTITY,
          {
            module: "Addresses",
            entity: "addresses",
            value: body,
          },
          { root: true }
        );
      } else {
        commit(SET_ADDRESSES, [...state.addresses, body]);
      }
    },
  },

  getters: {
    getAddressByName: (state) => (name) => {
      return state.addresses.find((it) => it.name === name);
    },
  },
};
