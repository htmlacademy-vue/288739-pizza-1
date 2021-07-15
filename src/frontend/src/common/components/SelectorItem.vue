<template>
  <div :class="selectorItemClass" class="selector-item">
    <div :style="imageWrapperStyle" class="selector-item__image-wrapper">
      <img
        v-if="imageSource"
        :src="imageSource"
        :style="imageStyle"
        draggable="false"
        class="selector-item__image"
      />
    </div>

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

    imageStyle: {
      type: Object,
      required: false,
    },

    imageWrapperStyle: {
      type: Object,
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

    type: {
      type: String,
      required: false,
    },
  },

  computed: {
    selectorItemClass() {
      switch (this.type) {
        case "small":
          return "selector-item--small";
        case "big":
          return "selector-item--big";
        case "filling":
          return "selector-item--filling";
        default:
          return "selector-item--big";
      }
    },
  },
};
</script>

<style lang="scss">
.selector-item {
  display: flex;
  flex-grow: 1;

  &__image {
    &-wrapper {
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      margin-right: 5%;
      border-radius: 50%;
    }
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

  &--small {
    padding-bottom: 0;

    .selector-item__image-wrapper {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-right: 8%;
    }
  }

  &--filling {
    padding-bottom: 0;

    .selector-item__image-wrapper {
      flex-shrink: 0;
      align-items: center;
      width: 32px;
      height: 32px;
    }

    .selector-item__image {
      width: 26px;
      height: 26px;
    }

    .selector-item__title {
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
