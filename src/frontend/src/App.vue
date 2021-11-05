<template>
  <div id="app">
    <AppLayout>
      <transition name="slide" mode="out-in" appear>
        <router-view />
      </transition>
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

.slide-enter-active {
  transition: all 0.5s;
}

.slide-enter {
  opacity: 0;
  margin-left: 50px;
}

.slide-leave-active {
  transition: all 0.5s;
  opacity: 0;
  margin-left: -80px;
}
</style>
