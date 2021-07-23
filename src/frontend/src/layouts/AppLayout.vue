<template>
  <div class="app-layout">
    <component
      :is="layout"
      :pizza-data="pizzaData"
      :pizza-price="pizzaPrice"
      @add-to-cart="$emit('add-to-cart', $event)"
    >
      <slot />
    </component>
  </div>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",

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

  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
