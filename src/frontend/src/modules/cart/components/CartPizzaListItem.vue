<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        :alt="pizza.name"
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ pizzaSize }} см, {{ pizzaDough }}</li>
          <li>Соус: {{ pizzaSauce }}</li>
          <li>Начинка: {{ pizzaIngredients }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
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
      />

      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        @click="incrementPizzaQuantity(pizza)"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ pizzaTotalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="changePizza">
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
