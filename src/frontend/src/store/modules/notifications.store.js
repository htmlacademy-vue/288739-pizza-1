import { ADD_NOTIFICATION, DELETE_ENTITY } from "@/store/mutations-types";
import { NOTIFICATION_LIVE_TIME } from "@/common/constants";

export default {
  namespaced: true,

  state: {
    notifications: [],
  },

  mutations: {
    [ADD_NOTIFICATION](state, notification) {
      state.notifications = [...state.notifications, notification];
    },
  },

  actions: {
    async createNotification({ commit }, { ...notification }) {
      const uniqueNotification = {
        ...notification,
        id: Date.now(),
      };

      commit(ADD_NOTIFICATION, uniqueNotification);

      setTimeout(
        () =>
          commit(
            DELETE_ENTITY,
            {
              module: "Notifications",
              entity: "notifications",
              id: uniqueNotification.id,
            },
            { root: true }
          ),
        NOTIFICATION_LIVE_TIME
      );
    },
  },
};
