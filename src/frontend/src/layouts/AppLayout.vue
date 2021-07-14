<template>
  <div class="app-layout">
    <AppLayoutHeader :pizza="pizza" />
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
      pizza: null,
    };
  },

  methods: {
    onAddPizzaToCart(pizza) {
      this.pizza = pizza;
    },
  },
};
</script>

<style lang="scss" scoped></style>
