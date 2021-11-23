<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2
        class="title title--small sheet__title"
        data-test="size-selector-title"
      >
        Выберите размер
      </h2>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in sizeList"
          :key="size.id"
          :value="size.value"
          :is-checked="size.value === pizza.size.value"
          :class="`diameter__input--${size.value}`"
          class="diameter__input"
          name="diameter"
          @change="
            setPizzaProperty({
              property: 'size',
              value: { ...size, value: $event },
            })
          "
        >
          <span>{{ size.name }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { SET_PIZZA_PROPERTY } from "@/store/mutations-types";

import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",

  components: { RadioButton },

  computed: {
    ...mapState("Builder", ["sizeList", "pizza"]),
  },

  methods: {
    ...mapMutations("Builder", { setPizzaProperty: SET_PIZZA_PROPERTY }),
  },
};
</script>
