<template>
  <div class="counter">
    <button
      :disabled="value <= min"
      type="button"
      class="counter__button counter__button--minus"
      data-test="minus-button"
      @click="$emit('input', value - 1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      :value="value"
      type="text"
      name="counter"
      class="counter__input"
      readonly
    />

    <button
      type="button"
      class="counter__button counter__button--plus"
      data-test="plus-button"
      :disabled="value >= max"
      @click="$emit('input', value + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AppItemCounter",

  props: {
    value: {
      type: Number,
      default: 0,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: 3,
    },
  },
};
</script>
