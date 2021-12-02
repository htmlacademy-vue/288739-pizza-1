<template>
  <span :class="`filling--${value}`" class="filling" data-test="selector-item">
    <slot />
  </span>
</template>

<script>
export default {
  name: "AppSelectorItem",

  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
