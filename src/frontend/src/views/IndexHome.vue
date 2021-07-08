<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          :dough="pizzaData.dough"
          :selected-item="order.dough"
          @select-dough="setPizzaDough"
        />

        <BuilderSizeSelector
          :sizes="pizzaData.sizes"
          :selected-item="order.size"
          @select-size="setPizzaSize"
        />

        <BuilderIngredientsSelector
          :sauces="pizzaData.sauces"
          :ingredients="pizzaData.ingredients"
          :selected-sauce="order.sauce"
          @select-sauce="setPizzaSauce"
        />

        <BuilderPizzaView :dough="order.dough" :sauce="order.sauce" />
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
      order: {
        dough: this.pizzaData.dough[0],
        size: this.pizzaData.sizes[0],
        sauce: this.pizzaData.sauces[0],
      },
    };
  },

  methods: {
    setPizzaDough(dough) {
      this.order.dough = dough;
    },

    setPizzaSize(size) {
      this.order.size = size;
    },

    setPizzaSauce(sauce) {
      this.order.sauce = sauce;
    },
  },
};
</script>

<style lang="scss" scoped></style>
