<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          :dough="pizza.dough"
          :selected-item="selectedDough"
          @select-dough="setSelectedDough"
        />

        <BuilderSizeSelector
          :sizes="pizza.sizes"
          :selected-item="selectedSize"
          @select-size="setSelectedSize"
        />

        <BuilderIngredientsSelector
          :sauces="pizza.sauces"
          :ingredients="pizza.ingredients"
          :selected-sauce="selectedSauce"
          @select-sauce="setSelectedSauce"
        />

        <BuilderPizzaView :dough="selectedDough" :sauce="selectedSauce" />
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
    pizza: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      selectedDough: this.pizza.dough[0],
      selectedSize: this.pizza.sizes[0],
      selectedSauce: this.pizza.sauces[0],
    };
  },

  methods: {
    setSelectedDough(dough) {
      this.selectedDough = dough;
    },

    setSelectedSize(size) {
      this.selectedSize = size;
    },

    setSelectedSauce(sauce) {
      this.selectedSauce = sauce;
    },
  },
};
</script>

<style lang="scss" scoped></style>
