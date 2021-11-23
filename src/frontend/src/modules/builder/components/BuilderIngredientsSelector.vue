<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce sauce">
          <p>Основной соус:</p>

          <RadioButton
            v-for="sauce in sauceList"
            :key="sauce.id"
            :value="sauce.value"
            :is-checked="sauce.value === pizza.sauce.value"
            class="radio ingredients__input"
            name="sauce"
            data-test="sauce-selector-item"
            @change="
              setPizzaProperty({
                property: 'sauce',
                value: { ...sauce, value: $event },
              })
            "
          >
            <span>{{ sauce.name }}</span>
          </RadioButton>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
              data-test="ingredients-item"
            >
              <AppDrag
                :transfer-data="ingredient"
                :is-draggable="ingredient.count < 3"
              >
                <SelectorItem :value="ingredient.value">
                  {{ ingredient.name }}
                </SelectorItem>
              </AppDrag>

              <ItemCounter
                :value="ingredient.count"
                :min="0"
                :max="3"
                class="ingredients__counter"
                data-test="ingredient-counter"
                @input="
                  setIngredientCount({
                    ingredient: ingredient,
                    count: $event,
                  })
                "
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import {
  SET_INGREDIENT_COUNT,
  SET_PIZZA_PROPERTY,
} from "@/store/mutations-types";

import AppDrag from "@/common/components/AppDrag";
import RadioButton from "@/common/components/RadioButton";
import SelectorItem from "@/common/components/SelectorItem";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "BuilderIngredientsSelector",

  components: { RadioButton, SelectorItem, ItemCounter, AppDrag },

  computed: {
    ...mapState("Builder", ["sauceList", "pizza", "ingredients"]),
  },

  methods: {
    ...mapMutations("Builder", { setPizzaProperty: SET_PIZZA_PROPERTY }),

    ...mapActions("Builder", {
      setIngredientCount: SET_INGREDIENT_COUNT,
    }),
  },
};
</script>
