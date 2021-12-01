<template>
  <span :class="`filling--${value}`" class="filling" data-test="selector-item">
    <slot />
  </span>
</template>

<script>
export default {
  name: "SelectorItem",

  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
