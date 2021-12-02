import { SET_USER, SET_IS_AUTHENTICATED } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    user: null,
    isAuthenticated: false,
  },

  mutations: {
    [SET_USER](state, user) {
      state.user = user;
    },

    [SET_IS_AUTHENTICATED](state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },

  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        this.$api.auth.logout();
      }

      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();

      commit(SET_IS_AUTHENTICATED, false);
      commit(SET_USER, null);
      commit("Addresses/SET_ADDRESSES", [], { root: true });
    },

    async getMe({ commit, dispatch }) {
      try {
        const user = await this.$api.auth.getMe();

        commit(SET_IS_AUTHENTICATED, true);
        commit(SET_USER, user);
      } catch (error) {
        dispatch("logout", false);
      }
    },
  },
};
