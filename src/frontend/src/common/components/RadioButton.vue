<template>
  <label>
    <input
      :checked="isChecked"
      :name="name"
      :value="value"
      type="radio"
      class="visually-hidden"
      @change="$emit('change', $event.target.value)"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "RadioButton",

  props: {
    isChecked: {
      type: Boolean,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },
  },
};
</script>
