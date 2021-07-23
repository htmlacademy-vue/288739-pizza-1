<template>
  <div id="app">
    <AppLayout
      :pizza-data="pizza"
      :pizza-price="pizzaPrice"
      @add-to-cart="onAddPizzaToCart"
    >
      <router-view />
    </AppLayout>
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
      pizzaPrice: 0,
    };
  },

  methods: {
    onAddPizzaToCart(pizzaPrice) {
      this.pizzaPrice = pizzaPrice;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
