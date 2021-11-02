<template>
  <li class="order__item">
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="normalizedPizza.name"
      />

      <div class="product__text">
        <h2>{{ normalizedPizza.name }}</h2>

        <ul>
          <li>
            {{ normalizedPizza.size }},
            {{ normalizedPizza.dough }}
          </li>
          <li>Соус: {{ normalizedPizza.sauce }}</li>
          <li>Начинка: {{ normalizedPizza.ingredients }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price">
      <span v-if="normalizedPizza.quantity > 1"
        >{{ normalizedPizza.quantity }}x</span
      >
      <span>{{ normalizedPizza.price }} ₽</span>
    </p>
  </li>
</template>

<script>
export default {
  name: "OrderItemPizza",

  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },

  computed: {
    normalizedPizza() {
      return {
        ...this.pizza,
        dough:
          this.pizza.dough.value === "light"
            ? "на тонком тесте"
            : "на толстом тесте",
        size: this.pizza.size.name,
        sauce: this.pizza.sauce.name.toLowerCase(),
        ingredients: this.pizza.ingredients
          .map((it) => it.name.toLowerCase())
          .join(", "),
      };
    },
  },
};
</script>
