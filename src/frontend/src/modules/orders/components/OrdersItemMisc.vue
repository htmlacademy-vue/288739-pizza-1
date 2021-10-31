<template>
  <li>
    <img :src="misc.image" :alt="misc.name" width="20" height="30" />

    <p>
      <span>{{ misc.name }}</span>
      <b>
        <span v-if="misc.quantity > 1">{{ misc.quantity }}x</span>
        <span>{{ misc.price }} ₽</span>
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
