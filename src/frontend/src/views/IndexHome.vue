<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          :dough="pizzaData.dough"
          :selected-item="pizza.dough"
          @select-dough="setPizzaDough"
        />

        <BuilderSizeSelector
          :sizes="pizzaData.sizes"
          :selected-item="pizza.size"
          @select-size="setPizzaSize"
        />

        <BuilderIngredientsSelector
          :sauces="pizzaData.sauces"
          :ingredientsData="pizzaData.ingredients"
          :selected-sauce="pizza.sauce"
          @select-sauce="setPizzaSauce"
          @change-ingredient-count="onIngredientCountChange"
        />

        <BuilderPizzaView :pizza="pizza" @add-to-cart="onAddToCart" />
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "IndexHome",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },

  props: {
    pizzaData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      pizza: {
        dough: this.pizzaData.dough[0],
        size: this.pizzaData.sizes[0],
        sauce: this.pizzaData.sauces[0],
        ingredients: [],
      },
    };
  },

  methods: {
    setPizzaDough(dough) {
      this.pizza.dough = dough;
    },

    setPizzaSize(size) {
      this.pizza.size = size;
    },

    setPizzaSauce(sauce) {
      this.pizza.sauce = sauce;
    },

    onIngredientCountChange({ count, ingredient }) {
      const ingredientItemIndex = this.pizza.ingredients.findIndex(
        (it) => it.name === ingredient.name
      );

      const ingredientObject = {
        name: ingredient.name,
        price: ingredient.price,
        count: count,
      };

      if (ingredientItemIndex === -1 && count > 0) {
        this.$set(
          this.pizza.ingredients,
          this.pizza.ingredients.length,
          ingredientObject
        );
      } else if (ingredientItemIndex !== -1 && count === 0) {
        this.$delete(this.pizza.ingredients, ingredientItemIndex);
      } else if (ingredientItemIndex !== -1 && count > 0) {
        this.$set(
          this.pizza.ingredients,
          ingredientItemIndex,
          ingredientObject
        );
      }
    },

    onAddToCart() {
      this.$emit("add-to-cart", this.pizza);
    },
  },
};
</script>

<style lang="scss" scoped></style>
