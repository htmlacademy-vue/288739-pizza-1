<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartAdditionalListItem
        v-for="cartAdditionalListItem in cartAdditionalList"
        :key="cartAdditionalListItem.id"
        :additional="cartAdditionalListItem"
      />
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

import CartAdditionalListItem from "@/modules/cart/components/CartAdditionalListItem";

export default {
  name: "CartAdditionalList",

  components: { CartAdditionalListItem },

  computed: {
    ...mapState("Cart", ["cartAdditionalList"]),
  },
};
</script>
