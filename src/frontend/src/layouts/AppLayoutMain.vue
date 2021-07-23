<template>
  <div class="app-layout-main">
    <AppLayoutHeader :pizza-price="pizzaPrice" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutMain",

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
