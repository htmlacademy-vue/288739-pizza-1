<template>
  <div class="counter">
    <button
      :disabled="value <= min"
      type="button"
      class="counter__button counter__button--minus"
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
      @input="$emit('input', Number($event.target.value))"
    />

    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="value >= max"
      @click="$emit('input', value + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",

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
