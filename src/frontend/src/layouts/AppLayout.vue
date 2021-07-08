<template>
  <div class="app-layout">
    <AppLayoutHeader />
    <IndexHome :pizzaData="pizza" />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import IndexHome from "@/views/IndexHome";

export default {
  name: "AppLayout",

  components: {
    AppLayoutHeader,
    IndexHome,
  },

  props: {
    misc: {
      type: Array,
      required: true,
    },

    pizza: {
      type: Object,
      required: true,
    },

    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
