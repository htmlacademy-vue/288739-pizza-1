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

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;

  flex-wrap: wrap;
  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__phone {
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 19px;
  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}
</style>
