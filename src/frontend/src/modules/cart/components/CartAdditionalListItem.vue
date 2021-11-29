<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="additional.image"
        :alt="additional.name"
        width="39"
        height="60"
        data-test="additional-image"
      />
      <span data-test="additional-name">{{ additional.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <button
          :disabled="!additional.quantity"
          class="counter__button counter__button--minus"
          type="button"
          data-test="additional-minus-button"
          @click="decrementAdditionalQuantity(additional)"
        >
          <span class="visually-hidden">Меньше</span>
        </button>

        <input
          :value="additional.quantity"
          class="counter__input"
          type="text"
          name="counter"
          readonly
          data-test="additional-quantity"
        />

        <button
          class="counter__button counter__button--plus counter__button--orange"
          type="button"
          data-test="additional-plus-button"
          @click="incrementAdditionalQuantity(additional)"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="additional-list__price">
        <b data-test="additional-price-text">{{ additional.price }} ₽/шт.</b>
      </div>
    </div>
  </li>
</template>

<script>
import { mapMutations } from "vuex";

import {
  DECREMENT_ADDITIONAL_QUANTITY,
  INCREMENT_ADDITIONAL_QUANTITY,
} from "@/store/mutations-types";

export default {
  name: "CartAdditionalListItem",

  props: {
    additional: {
      type: Object,
      required: true,
    },
  },

  computed: {
    additionalTotalPrice() {
      return this.additional.price * this.additional.quantity;
    },
  },

  methods: {
    ...mapMutations("Cart", {
      incrementAdditionalQuantity: INCREMENT_ADDITIONAL_QUANTITY,
      decrementAdditionalQuantity: DECREMENT_ADDITIONAL_QUANTITY,
    }),
  },
};
</script>
