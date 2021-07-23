<template>
  <div id="app">
    <AppLayout :pizza-price="pizzaPrice">
      <router-view :pizza-data="pizza" @add-to-cart="onAddPizzaToCart" />
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
