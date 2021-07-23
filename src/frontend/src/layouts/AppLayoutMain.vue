<template>
  <div class="app-layout-main">
    <AppLayoutHeader :pizza-price="pizzaPrice" />
    <Index
      :pizza-data="pizzaData"
      @add-to-cart="$emit('add-to-cart', $event)"
    />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import Index from "@/views/Index";

export default {
  name: "AppLayoutMain",

  components: {
    AppLayoutHeader,
    Index,
  },

  props: {
    pizzaData: {
      type: Object,
      required: true,
    },

    pizzaPrice: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped></style>
