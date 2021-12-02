<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce sauce">
          <p>Основной соус:</p>

          <AppRadioButton
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
          </AppRadioButton>
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
                <AppSelectorItem :value="ingredient.value">
                  {{ ingredient.name }}
                </AppSelectorItem>
              </AppDrag>

              <AppItemCounter
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
import AppRadioButton from "@/common/components/AppRadioButton";
import AppSelectorItem from "@/common/components/AppSelectorItem";
import AppItemCounter from "@/common/components/AppItemCounter";

export default {
  name: "BuilderIngredientsSelector",

  components: { AppRadioButton, AppSelectorItem, AppItemCounter, AppDrag },

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
