<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b data-test="order-number">Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span data-test="order-sum">Сумма заказа: {{ orderTotalPrice }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          data-test="order-delete-button"
          @click="deleteOrder(order.id)"
        >
          Удалить
        </button>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button"
          data-test="order-repeat-button"
          @click="onRepeatOrderButtonClick"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <OrdersItemPizza
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        :pizza="pizza"
      />
    </ul>

    <ul v-if="order.orderMisc" class="order__additional">
      <OrdersItemMisc
        v-for="misc in order.orderMisc"
        :key="misc.id"
        :misc="misc"
      />
    </ul>

    <p v-if="order.addressId" class="order__address" data-test="order-address">
      Адрес доставки: {{ orderAddressName }}
    </p>
  </section>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { REPEAT_ORDER } from "@/store/mutations-types";

import OrdersItemPizza from "@/modules/orders/components/OrdersItemPizza";
import OrdersItemMisc from "@/modules/orders/components/OrdersItemMisc";

export default {
  name: "OrdersItem",

  components: { OrdersItemPizza, OrdersItemMisc },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    orderAddressName() {
      return this.order.orderAddress?.name || "";
    },

    orderTotalPrice() {
      const pizzasPrice = this.order.orderPizzas.reduce(
        (acc, it) => acc + it.price * it.quantity,
        0
      );

      const miscPrice = this.order.orderMisc.reduce(
        (acc, it) => acc + it.price * it.quantity,
        0
      );

      return pizzasPrice + miscPrice;
    },
  },

  methods: {
    ...mapMutations("Cart", { repeatOrder: REPEAT_ORDER }),
    ...mapActions("Orders", { deleteOrder: "delete" }),

    onRepeatOrderButtonClick() {
      this.repeatOrder({
        pizzaList: this.order.orderPizzas,
        additionalList: this.order.orderMisc,
      });

      this.$router.push("/cart");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;
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

  &--border {
    background-color: transparent;
    border: 1px solid $green-500;
    color: $black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: $green-500;
      border-color: $green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $green-600;
      border-color: $green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }
}
</style>
