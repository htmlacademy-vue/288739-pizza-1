<template>
  <ul v-if="notifications.length" class="notifications__wrapper">
    <li
      v-for="notification in notifications"
      :key="notification.id"
      :class="getNotificationClass(notification.type)"
      class="notification"
    >
      {{ notification.text }}
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppNotifications",

  computed: {
    ...mapState("Notifications", ["notifications"]),
  },

  methods: {
    getNotificationClass(notificationType) {
      switch (notificationType) {
        case "error":
          return "notification--error";
        case "success":
          return "notification--success";
        case "warning":
          return "notification--warning";
        default:
          return "";
      }
    },
  },
};
</script>
