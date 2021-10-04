<template>
  <ul class="cart-list sheet">
    <CartPizzaListItem
      v-for="cartPizzaListItem in cartPizzaList"
      :key="cartPizzaListItem.id"
      :pizza="cartPizzaListItem"
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
    ...mapState("Cart", ["cartPizzaList"]),
  },
};
</script>
