<template>
  <div class="cart__additional">
    <ul class="additional-list" data-test="additional-list">
      <CartAdditionalListItem
        v-for="additional in additionalList"
        :key="additional.id"
        :additional="additional"
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
    ...mapState("Cart", ["additionalList"]),
  },
};
</script>
