<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector :dough="pizza.dough" />

        <BuilderSizeSelector :sizes="pizza.sizes" />

        <BuilderIngredientsSelector
          :sauces="pizza.sauces"
          :ingredients="pizza.ingredients"
        />

        <BuilderPizzaView />
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
};
</script>

<style lang="scss" scoped></style>
