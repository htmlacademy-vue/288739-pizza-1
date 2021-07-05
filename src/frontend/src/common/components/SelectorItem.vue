<template>
  <div class="selector-item">
    <img v-if="imageSource" :src="imageSource" class="selector-item__image" />
    <div class="selector-item__info">
      <b class="selector-item__title">{{ title }}</b>
      <span v-if="description" class="selector-item__description">
        {{ description }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectorItem",

  props: {
    imageSource: {
      type: String,
      required: false,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss">
.selector-item {
  display: flex;
  flex-grow: 1;
  padding-bottom: 16px;

  &__image {
    margin-right: 5%;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
  }

  &__title {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
  }

  &__description {
    display: block;
    font-size: 11px;
    font-weight: 300;
    font-style: normal;
    line-height: 13px;
  }
}
</style>
