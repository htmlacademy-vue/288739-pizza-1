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
          :ingredients="pizza.ingredients"
          :sauces="pizzaData.sauces"
          :selected-sauce="pizza.sauce"
          @select-sauce="setPizzaSauce"
          @update-ingredient="onUpdateIngredient"
        />

        <BuilderPizzaView
          :pizza="pizza"
          @add-to-cart="onAddToCart"
          @add-ingredient="addIngredient"
        />
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
  name: "Index",

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
        ingredients: this.pizzaData.ingredients.map((ingredient) => ({
          ...ingredient,
          count: 0,
        })),
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

    addIngredient(ingredient) {
      const ingredientItemIndex = this.pizza.ingredients.findIndex(
        (it) => it.name === ingredient.name
      );

      const currentIngredientCount =
        this.pizza.ingredients[ingredientItemIndex].count;

      this.$set(this.pizza.ingredients, ingredientItemIndex, {
        ...ingredient,
        count: currentIngredientCount + 1,
      });
    },

    onAddToCart(pizzaPrice) {
      this.$emit("add-to-cart", pizzaPrice);
    },

    onUpdateIngredient(ingredient) {
      const ingredientItemIndex = this.pizza.ingredients.findIndex(
        (it) => it.name === ingredient.name
      );

      this.$set(this.pizza.ingredients, ingredientItemIndex, ingredient);
    },
  },
};
</script>

<style lang="scss" scoped></style>
