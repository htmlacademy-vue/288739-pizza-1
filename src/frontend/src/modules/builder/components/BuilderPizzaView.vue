<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        :value="pizzaName"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        @input="setPizzaName($event.target.value)"
      />
    </label>

    <div class="content__constructor">
      <AppDrop
        @drop="
          changeIngredientCount({
            value: $event.value,
            count: $event.count + 1,
          })
        "
      >
        <div :class="pizzaFoundationClass" class="pizza">
          <div class="pizza__wrapper">
            <template v-for="ingredient in selectedPizzaIngredients">
              <div
                v-if="ingredient.count > 0"
                :key="`${ingredient.name}-1`"
                :class="`pizza__filling--${ingredient.value}`"
                class="pizza__filling"
              />
              <div
                v-if="ingredient.count > 1"
                :key="`${ingredient.name}-2`"
                :class="`pizza__filling--${ingredient.value}`"
                class="pizza__filling pizza__filling--second"
              />
              <div
                v-if="ingredient.count > 2"
                :key="`${ingredient.name}-3`"
                :class="`pizza__filling--${ingredient.value}`"
                class="pizza__filling pizza__filling--third"
              />
            </template>
          </div>
        </div>
      </AppDrop>
    </div>

    <BuilderPriceCounter />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import {
  CHANGE_INGREDIENT_COUNT,
  SET_PIZZA_NAME,
} from "@/store/mutations-types";

import AppDrop from "@/common/components/AppDrop";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "BuilderPizzaView",

  components: { BuilderPriceCounter, AppDrop },

  computed: {
    ...mapState("Builder", ["pizzaDough", "pizzaSauce", "pizzaName"]),

    ...mapGetters("Builder", ["selectedPizzaIngredients"]),

    pizzaFoundationClass() {
      return `pizza--foundation--${
        this.pizzaDough === "light" ? "small" : "big"
      }-${this.pizzaSauce}`;
    },
  },

  methods: {
    ...mapMutations("Builder", {
      setPizzaName: SET_PIZZA_NAME,
      changeIngredientCount: CHANGE_INGREDIENT_COUNT,
    }),
  },
};
</script>
