<template>
  <div class="user">
    <picture>
      <img
        :src="user.avatar"
        :alt="user.name"
        width="72"
        height="72"
        data-test="user-image"
      />
    </picture>

    <div class="user__name">
      <span data-test="user-name">{{ user.name }}</span>
    </div>

    <p class="user__phone">
      Контактный телефон: <span data-test="user-phone">{{ user.phone }}</span>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProfileUser",

  computed: {
    ...mapState("Profile", ["user"]),
  },
};
</script>
