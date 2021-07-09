<template>
  <p>Итого: {{ this.price }} ₽</p>
</template>

<script>
export default {
  name: "BuilderPriceCounter",

  props: {
    price: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped></style>
