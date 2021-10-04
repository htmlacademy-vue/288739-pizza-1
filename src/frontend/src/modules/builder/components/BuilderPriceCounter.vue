<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button
      :class="{ 'button--disabled': !isPizzaOrderReady }"
      :disabled="!isPizzaOrderReady"
      type="button"
      class="button"
      @click="addPizzaToCart"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ADD_PIZZA_TO_CART } from "@/store/mutations-types";

export default {
  name: "BuilderPriceCounter",

  computed: {
    ...mapGetters("Builder", ["pizzaPrice", "isPizzaOrderReady"]),
  },

  methods: {
    ...mapActions("Cart", { addPizzaToCart: ADD_PIZZA_TO_CART }),
  },
};
</script>
