<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        :value="pizzaName"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        data-test="pizza-name-input"
        @input="
          setPizzaProperty({ property: 'name', value: $event.target.value })
        "
      />
    </label>

    <div class="content__constructor">
      <AppDrop
        @drop="
          setIngredientCount({
            ingredient: $event,
            count: $event.count + 1,
          })
        "
      >
        <div :class="pizzaFoundationClass" class="pizza" data-test="pizza-view">
          <div class="pizza__wrapper">
            <transition-group name="drop" mode="out-in">
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
            </transition-group>
          </div>
        </div>
      </AppDrop>
    </div>

    <BuilderPriceCounter />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import {
  SET_INGREDIENT_COUNT,
  SET_PIZZA_PROPERTY,
} from "@/store/mutations-types";

import AppDrop from "@/common/components/AppDrop";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "BuilderPizzaView",

  components: { BuilderPriceCounter, AppDrop },

  computed: {
    ...mapState("Builder", ["pizza"]),

    ...mapGetters("Builder", ["selectedPizzaIngredients"]),

    pizzaName() {
      return this.pizza?.name || "";
    },

    pizzaFoundationClass() {
      return `pizza--foundation--${
        this.pizza?.dough.value === "light" ? "small" : "big"
      }-${this.pizza?.sauce.value}`;
    },
  },

  methods: {
    ...mapMutations("Builder", { setPizzaProperty: SET_PIZZA_PROPERTY }),

    ...mapActions("Builder", {
      setIngredientCount: SET_INGREDIENT_COUNT,
    }),
  },
};
</script>

<style lang="scss" scoped>
.drop-enter-active {
  animation: drop 0.7s;
}

.drop-leave-active {
  animation: drop 0.5s reverse;
}

@keyframes drop {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
