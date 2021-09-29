<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button
      :class="{ 'button--disabled': !isPizzaOrderReady }"
      :disabled="!isPizzaOrderReady"
      type="button"
      class="button"
      @click="addToCart"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ADD_TO_CART } from "@/store/mutations-types";

export default {
  name: "BuilderPriceCounter",

  computed: {
    ...mapGetters("Builder", ["pizzaPrice", "isPizzaOrderReady"]),
  },

  methods: {
    ...mapActions("Cart", { addToCart: ADD_TO_CART }),
  },
};
</script>
