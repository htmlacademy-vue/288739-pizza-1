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

<style lang="scss" scoped>
.notifications__wrapper {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 100;
  display: grid;
  grid-gap: 10px;
  width: auto;
  max-width: 300px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.notification {
  display: flex;
  align-items: center;
  min-height: 32px;
  padding: 8px;
  font-size: 16px;
  color: $white;
  background-color: $info;
  border-radius: 4px;
  animation-name: notification-show;
  animation-duration: 250ms;
  animation-timing-function: ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);

  &--error {
    background-color: $red-800;
  }

  &--success {
    background-color: $green-400;
  }

  &--warning {
    background-color: $orange-100;
  }
}

@keyframes notification-show {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
