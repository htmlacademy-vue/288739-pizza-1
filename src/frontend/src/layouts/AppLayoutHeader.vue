<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart" data-test="header-cart">
      <router-link to="/cart" data-test="header-cart-link"
        >{{ orderPrice }} ₽</router-link
      >
    </div>
    <div class="header__user">
      <router-link
        v-if="!isAuthenticated"
        to="/login"
        class="header__login"
        data-test="header-login"
      >
        <span>Войти</span>
      </router-link>

      <template v-else>
        <router-link v-if="user" to="/profile" data-test="header-profile-link">
          <img :src="user.avatar" :alt="user.name" width="32" height="32" />
          <span>{{ user.name }}</span>
        </router-link>

        <a
          href="#"
          class="header__logout"
          data-test="header-logout"
          @click.prevent="$logout"
        >
          <span>Выйти</span>
        </a>
      </template>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { logout } from "@/common/mixins";

export default {
  name: "AppLayoutHeader",

  mixins: [logout],

  computed: {
    ...mapState("Profile", ["isAuthenticated", "user"]),
    ...mapGetters("Cart", ["orderPrice"]),
  },
};
</script>
