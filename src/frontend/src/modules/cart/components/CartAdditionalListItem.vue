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

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}

.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: $purple-100;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $black;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $purple-200;
    }

    &:active:not(:disabled) {
      background-color: $purple-300;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    background-color: $green-500;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $white;
    }

    &::after {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: $white;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }

    &:active:not(:disabled) {
      background-color: $green-600;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--orange {
    background-color: $orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: $orange-100;
    }

    &:active:not(:disabled) {
      background-color: $orange-300;
    }
  }
}

.counter__input {
  @include r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset $shadow-regular;
  }
}
</style>
