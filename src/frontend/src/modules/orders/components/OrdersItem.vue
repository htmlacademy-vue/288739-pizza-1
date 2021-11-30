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

    <ul class="order__additional" v-if="order.orderMisc">
      <OrdersItemMisc
        v-for="misc in order.orderMisc"
        :key="misc.id"
        :misc="misc"
      />
    </ul>

    <p class="order__address" v-if="order.addressId" data-test="order-address">
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

      this.$router.push({ name: "Cart" });
    },
  },
};
</script>
