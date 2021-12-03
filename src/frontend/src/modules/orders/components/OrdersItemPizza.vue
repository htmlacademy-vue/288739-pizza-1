<template>
  <li class="order__item">
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="normalizedPizza.name"
        data-test="order-pizza-image"
      />

      <div class="product__text">
        <h2 data-test="order-pizza-name">{{ normalizedPizza.name }}</h2>

        <ul>
          <li data-test="order-pizza-size-and-dough">
            {{ normalizedPizza.size }}, {{ normalizedPizza.dough }}
          </li>
          <li data-test="order-pizza-sauce">
            Соус: {{ normalizedPizza.sauce }}
          </li>
          <li data-test="order-pizza-ingredients">
            Начинка: {{ normalizedPizza.ingredients }}
          </li>
        </ul>
      </div>
    </div>

    <p class="order__price">
      <span
        v-if="normalizedPizza.quantity > 1"
        data-test="order-pizza-quantity"
      >
        {{ normalizedPizza.quantity }}x</span
      >
      <span data-test="order-pizza-price">{{ normalizedPizza.price }} ₽</span>
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

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
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
</style>
