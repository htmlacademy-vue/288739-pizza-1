<template>
  <div class="app-layout-default">
    <AppLayoutHeader :pizza-price="pizzaPrice" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutDefault",

  components: {
    AppLayoutHeader,
  },

  props: {
    pizzaPrice: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped></style>
