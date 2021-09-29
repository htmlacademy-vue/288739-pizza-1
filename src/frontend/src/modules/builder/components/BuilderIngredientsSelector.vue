<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce sauce">
          <p>Основной соус:</p>

          <RadioButton
            v-for="sauce in sauceList"
            :key="sauce.id"
            :value="sauce.value"
            :is-checked="sauce.value === pizzaSauce"
            class="radio ingredients__input"
            name="sauce"
            @change="setPizzaSauce"
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
                @input="
                  changeIngredientCount({
                    value: ingredient.value,
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
import { mapState, mapMutations } from "vuex";
import {
  CHANGE_INGREDIENT_COUNT,
  SET_PIZZA_SAUCE,
} from "@/store/mutations-types";

import AppDrag from "@/common/components/AppDrag";
import RadioButton from "@/common/components/RadioButton";
import SelectorItem from "@/common/components/SelectorItem";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "BuilderIngredientsSelector",

  components: { RadioButton, SelectorItem, ItemCounter, AppDrag },

  computed: {
    ...mapState("Builder", ["sauceList", "pizzaSauce", "ingredients"]),
  },

  methods: {
    ...mapMutations("Builder", {
      setPizzaSauce: SET_PIZZA_SAUCE,
      changeIngredientCount: CHANGE_INGREDIENT_COUNT,
    }),
  },
};
</script>
