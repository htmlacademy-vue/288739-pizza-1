<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <div
          class="dough__item"
          v-for="(dough, index) in dough"
          :key="dough.name"
        >
          <RadioButton
            :id="`dough-input${index}`"
            :is-checked="dough.name === selectedItem.name"
            :value="dough.name === 'Тонкое' ? 'light' : 'large'"
            name="dough"
            @select="onSelect(dough)"
          />

          <SelectorItem
            :image-source="dough.image"
            :title="dough.name"
            :description="dough.description"
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
  name: "BuilderDoughSelector",

  components: { RadioButton, SelectorItem },

  props: {
    dough: {
      type: Array,
      default: () => [],
    },

    selectedItem: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onSelect(selectedItem) {
      this.$emit("select-dough", selectedItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.dough {
  padding-bottom: 16px;
}

.dough__item {
  display: flex;
  flex-grow: 1;
  position: relative;
}
</style>
