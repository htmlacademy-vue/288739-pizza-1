<template>
  <span :class="`filling--${value}`" class="filling">
    <slot />
  </span>
</template>

<script>
export default {
  name: "SelectorItem",

  props: {
    value: String,
  },
};
</script>
