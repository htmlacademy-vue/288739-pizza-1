<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce sauce">
          <p>Основной соус:</p>

          <div
            class="sauce__item"
            v-for="(sauce, index) in sauces"
            :key="sauce.name"
          >
            <RadioButton
              :id="`sauce-input${index}`"
              :is-checked="sauce.name === selectedSauce.name"
              :value="sauce.name === 'Томатный' ? 'tomato' : 'creamy'"
              name="sauce"
              size="small"
              @select="onSauceSelect(sauce)"
            />

            <SelectorItem :title="sauce.name" type="small" />
          </div>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="(ingredient, index) in ingredients"
              :key="ingredient.name"
              class="ingredients__item"
            >
              <AppDrop @drop="$emit('drop', $event)">
                <AppDrag
                  :transfer-data="ingredient"
                  :is-draggable="ingredient.count < 3"
                >
                  <SelectorItem
                    :image-source="ingredient.image"
                    :title="ingredient.name"
                    type="filling"
                  />
                </AppDrag>
              </AppDrop>

              <ItemCounter :count.sync="ingredients[index].count" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDrag from "@/common/components/AppDrag";
import AppDrop from "@/common/components/AppDrop";
import RadioButton from "@/common/components/RadioButton";
import SelectorItem from "@/common/components/SelectorItem";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "BuilderIngredientsSelector",

  components: { RadioButton, SelectorItem, ItemCounter, AppDrag, AppDrop },

  props: {
    ingredients: {
      type: Array,
      default: () => [],
    },

    sauces: {
      type: Array,
      default: () => [],
    },

    selectedSauce: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onSauceSelect(selectedItem) {
      this.$emit("select-sauce", selectedItem);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins/mixins.scss";

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.sauce__item {
  display: flex;
  position: relative;
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__counter {
  width: 54px;
  margin-left: 36px;
}

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
  position: relative;
}
</style>
