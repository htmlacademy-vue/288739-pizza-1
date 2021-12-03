<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <template v-if="orders.length">
      <OrdersItem
        v-for="order of orders"
        :key="order.id"
        :order="order"
        data-test="orders-item"
      />
    </template>

    <p v-else data-test="orders-empty-message">
      Вы не сделали ещё ни одного заказа.
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrdersItem from "@/modules/orders/components/OrdersItem";
import { auth } from "@/middlewares";

export default {
  name: "Orders",

  layout: "AppLayoutWithSidebar",

  middlewares: [auth],

  components: { OrdersItem },

  computed: {
    ...mapState("Orders", ["orders"]),
  },

  created() {
    this.getOrders();
    this.getAddresses();
  },

  methods: {
    ...mapActions("Orders", { getOrders: "query" }),
    ...mapActions("Addresses", { getAddresses: "query" }),
  },
};
</script>

<style lang="scss" scoped>
.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }
}
</style>
