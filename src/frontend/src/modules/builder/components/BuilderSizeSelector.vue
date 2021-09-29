<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in sizeList"
          :key="size.id"
          :value="size.value"
          :is-checked="size.value === pizzaSize"
          :class="`diameter__input--${size.value}`"
          class="diameter__input"
          name="diameter"
          @change="setPizzaSize"
        >
          <span>{{ size.name }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { SET_PIZZA_SIZE } from "@/store/mutations-types";

import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",

  components: { RadioButton },

  computed: {
    ...mapState("Builder", ["sizeList", "pizzaSize"]),
  },

  methods: {
    ...mapMutations("Builder", { setPizzaSize: SET_PIZZA_SIZE }),
  },
};
</script>
