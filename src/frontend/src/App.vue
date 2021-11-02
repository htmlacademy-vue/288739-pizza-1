<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>

    <AppNotifications />
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import AppNotifications from "@/common/components/AppNotifications.vue";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",

  components: { AppLayout, AppNotifications },

  created() {
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }

    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
