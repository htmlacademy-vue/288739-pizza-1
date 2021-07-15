<template>
  <div class="app-layout">
    <AppLayoutHeader :pizza-price="pizzaPrice" />
    <Index :pizza-data="pizzaData" @add-to-cart="onAddPizzaToCart" />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import Index from "@/views/Index";

export default {
  name: "AppLayout",

  components: {
    AppLayoutHeader,
    Index,
  },

  props: {
    miscData: {
      type: Array,
      required: true,
    },

    pizzaData: {
      type: Object,
      required: true,
    },

    userData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
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

<style lang="scss" scoped></style>
