<template>
  <div class="content__result">
    <p data-test="price-text">Итого: {{ pizzaPrice }} ₽</p>
    <button
      :class="{ 'button--disabled': !isPizzaOrderReady }"
      :disabled="!isPizzaOrderReady"
      type="button"
      class="button"
      data-test="add-to-cart-button"
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

<style lang="scss" scoped>
.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}

.button {
  $bl: &;

  @include b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: $white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: $shadow-medium;

  background-color: $green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: $green-400;
  }

  &:active:not(:disabled) {
    background-color: $green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &:disabled {
    background-color: $green-300;
    color: rgba($white, 0.2);
    cursor: default;
  }
}
</style>
