<template>
  <div id="app">
    <AppLayout :miscData="misc" :pizzaData="pizza" :userData="user" />
  </div>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",

  components: {
    AppLayout,
  },

  data() {
    return {
      misc,
      pizza,
      user,
    };
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
