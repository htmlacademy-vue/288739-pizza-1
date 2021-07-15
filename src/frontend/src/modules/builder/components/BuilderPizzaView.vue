<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        v-model="pizzaName"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

    <div class="content__constructor">
      <AppDrop @drop="onIngredientDrop">
        <div :class="pizzaFoundationClass" class="pizza">
          <div class="pizza__wrapper">
            <template v-for="ingredient in pizza.ingredients">
              <div
                v-if="ingredient.count > 0"
                :key="ingredient.name"
                :class="getIngredientClass(ingredient)"
                class="pizza__filling"
              />
            </template>
          </div>
        </div>
      </AppDrop>
    </div>

    <div class="content__result">
      <BuilderPriceCounter :price="pizzaPrice" />

      <button
        :disabled="!isPizzaOrderReady"
        :class="{ 'button--disabled': !isPizzaOrderReady }"
        type="button"
        class="button"
        @click="addToCart"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script>
import { FILLINGS, DOUGHS, SAUCES } from "@/common/constants";

import AppDrop from "@/common/components/AppDrop";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "BuilderPizzaView",

  components: { BuilderPriceCounter, AppDrop },

  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      pizzaName: "",
    };
  },

  computed: {
    isPizzaOrderReady() {
      return this.pizza.ingredients.length !== 0 && this.pizzaName !== "";
    },

    pizzaFoundationClass() {
      const dough = DOUGHS.find((it) => it.name === this.pizza.dough.name);
      const sauce = SAUCES.find((it) => it.name === this.pizza.sauce.name);

      return `pizza--foundation--${dough.size}-${sauce.value}`;
    },

    ingredientsTotalPrice() {
      return this.pizza.ingredients.reduce(
        (acc, ingredient) => acc + ingredient.price * ingredient.count,
        0
      );
    },

    pizzaPrice() {
      return (
        (this.pizza.dough.price +
          this.pizza.sauce.price +
          this.ingredientsTotalPrice) *
        this.pizza.size.multiplier
      );
    },
  },

  methods: {
    getIngredientClass(ingredient) {
      const filling = FILLINGS.find((it) => it.name === ingredient.name);

      const nameClass = `pizza__filling--${filling.value}`;

      let countClass = "";

      if (ingredient.count === 2) {
        countClass = "pizza__filling--second";
      } else if (ingredient.count === 3) {
        countClass = "pizza__filling--third";
      } else {
        countClass = "";
      }

      return [nameClass, countClass];
    },

    addToCart() {
      this.$emit("add-to-cart", this.pizzaPrice);
    },

    onIngredientDrop(droppedIngredient) {
      this.$emit("add-ingredient", droppedIngredient);
    },
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

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
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
</style>
