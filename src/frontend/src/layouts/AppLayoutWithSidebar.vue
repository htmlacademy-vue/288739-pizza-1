<template>
  <div>
    <AppLayoutHeader />

    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link to="/" class="logo layout__logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>

        <router-link
          class="layout__link"
          active-class="layout__link--active"
          to="/orders"
          data-test="sidebar-orders-link"
        >
          История заказов
        </router-link>

        <router-link
          class="layout__link"
          active-class="layout__link--active"
          to="/profile"
          data-test="sidebar-profile-link"
        >
          Мои данные
        </router-link>
      </div>

      <slot />
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutWithSidebar",

  components: { AppLayoutHeader },
};
</script>
