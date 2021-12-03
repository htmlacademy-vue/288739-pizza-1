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
        <div
          :class="pizzaFoundationClass"
          class="pizza"
          data-test="pizza-view"
        >
          <div class="pizza__wrapper">
            <transition-group
              name="drop"
              mode="out-in"
            >
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
.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--big-creamy {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--big-tomato {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--small-creamy {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--small-tomato {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--second {
    transform: rotate(45deg);
  }

  &--third {
    transform: rotate(-45deg);
  }

  &--ananas {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }

  &--bacon {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }

  &--chile {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }

  &--ham {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }

  &--onion {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }

  &--parmesan {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }

  &--salami {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }

  &--salmon {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }
}

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }
}

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
