<template>
  <div class="app-layout">
    <component :is="layout" :pizza-price="pizzaPrice">
      <slot />
    </component>
  </div>
</template>

<script>
const defaultLayout = "AppLayoutMain";

export default {
  name: "AppLayout",

  props: {
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
