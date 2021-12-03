<template>
  <ul
    class="cart-list sheet"
    data-test="pizza-list"
  >
    <CartPizzaListItem
      v-for="pizza in pizzaList"
      :key="pizza.id"
      :pizza="pizza"
    />
  </ul>
</template>

<script>
import { mapState } from "vuex";

import CartPizzaListItem from "@/modules/cart/components/CartPizzaListItem";

export default {
  name: "CartPizzaList",

  components: { CartPizzaListItem },

  computed: {
    ...mapState("Cart", ["pizzaList"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

.cart-list {
  @include clear-list;

  padding: 15px 0;
}
</style>
