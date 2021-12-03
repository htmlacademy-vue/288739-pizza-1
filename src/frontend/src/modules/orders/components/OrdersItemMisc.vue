<template>
  <li>
    <img
      :src="misc.image"
      :alt="misc.name"
      width="20"
      height="30"
      data-test="order-misc-image"
    />

    <p>
      <span data-test="order-misc-name">{{ misc.name }}</span>
      <b>
        <span v-if="misc.quantity > 1" data-test="order-misc-quantity">
          {{ misc.quantity }}x
        </span>
        <span data-test="order-misc-price">{{ misc.price }} ₽</span>
      </b>
    </p>
  </li>
</template>

<script>
export default {
  name: "OrdersItemMisc",

  props: {
    misc: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.order__additional {
  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}
</style>
