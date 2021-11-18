<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <template v-if="orders.length">
      <OrdersItem
        v-for="order of orders"
        :order="order"
        :key="order.id"
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

export default {
  name: "Orders",

  components: { OrdersItem },

  computed: {
    ...mapState("Orders", ["orders"]),
  },

  methods: {
    ...mapActions("Orders", { getOrders: "query" }),
    ...mapActions("Addresses", { getAddresses: "query" }),
  },

  created() {
    this.getOrders();
    this.getAddresses();
  },
};
</script>
