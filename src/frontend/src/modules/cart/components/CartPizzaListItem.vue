<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        :alt="pizza.name"
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        data-test="pizza-image"
      />
      <div class="product__text">
        <h2 data-test="cart-pizza-name">{{ pizza.name }}</h2>
        <ul>
          <li>
            <span data-test="cart-pizza-size">{{ pizzaSize }} см</span>,
            <span data-test="cart-pizza-dough">{{ pizzaDough }}</span>
          </li>
          <li data-test="cart-pizza-sauce">Соус: {{ pizzaSauce }}</li>
          <li data-test="cart-pizza-ingredients">
            Начинка: {{ pizzaIngredients }}
          </li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        data-test="pizza-minus-button"
        @click="decrementPizzaQuantity(pizza)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>

      <input
        :value="pizza.quantity"
        type="text"
        name="counter"
        class="counter__input"
        readonly
        data-test="pizza-quantity"
      />

      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        data-test="pizza-plus-button"
        @click="incrementPizzaQuantity(pizza)"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b data-test="cart-pizza-price">{{ pizzaTotalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        data-test="cart-change-button"
        @click="changePizza"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { PIZZA_SIZE_NUMBER } from "@/common/constants";
import { mapActions } from "vuex";
import {
  CHANGE_BUILDER_STATE,
  DECREMENT_PIZZA_QUANTITY,
  INCREMENT_PIZZA_QUANTITY,
} from "@/store/mutations-types";

export default {
  name: "CartPizzaListItem",

  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },

  computed: {
    pizzaSize() {
      return PIZZA_SIZE_NUMBER[this.pizza.size.value];
    },

    pizzaDough() {
      if (this.pizza.dough.value === "light") {
        return "на тонком тесте";
      } else {
        return "на толстом тесте";
      }
    },

    pizzaSauce() {
      return this.pizza.sauce.name.toLowerCase();
    },

    pizzaIngredients() {
      const ingredients = this.pizza.ingredients.map((it) =>
        it.name.toLowerCase()
      );
      return ingredients.join(", ");
    },

    pizzaTotalPrice() {
      return this.pizza.price * this.pizza.quantity;
    },
  },

  methods: {
    ...mapActions("Builder", { changeBuilderState: CHANGE_BUILDER_STATE }),

    ...mapActions("Cart", {
      incrementPizzaQuantity: INCREMENT_PIZZA_QUANTITY,
      decrementPizzaQuantity: DECREMENT_PIZZA_QUANTITY,
    }),

    changePizza() {
      this.changeBuilderState(this.pizza);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
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
