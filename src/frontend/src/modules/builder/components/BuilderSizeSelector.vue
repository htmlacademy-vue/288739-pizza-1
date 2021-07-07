<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <div
          class="diameter__item"
          v-for="(size, index) in sizes"
          :key="size.name"
        >
          <RadioButton
            :id="`diameter-input${index}`"
            :is-checked="size.name === '32 см'"
            :value="getSizeValue(size.name)"
            name="diameter"
          />

          <SelectorItem
            :image-source="size.image"
            :image-style="{ 'max-width': `${33 * size.multiplier}%` }"
            :image-wrapper-style="{ 'background-color': '#e1ffd7' }"
            :title="size.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import SelectorItem from "@/common/components/SelectorItem";

export default {
  name: "BuilderSizeSelector",

  components: { RadioButton, SelectorItem },

  props: {
    sizes: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    getSizeValue(size) {
      switch (size) {
        case "23 см":
          return "small";
        case "32 см":
          return "normal";
        case "45 см":
          return "big";
        default:
          return "small";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.diameter {
  padding-bottom: 16px;
}

.diameter__item {
  display: flex;
  flex-grow: 1;
  position: relative;
}
</style>
