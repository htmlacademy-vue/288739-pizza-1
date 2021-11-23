<template>
  <div class="content__dough">
    <div class="sheet">
      <h2
        class="title title--small sheet__title"
        data-test="dough-selector-title"
      >
        Выберите тесто
      </h2>

      <div class="sheet__content dough">
        <RadioButton
          v-for="dough in doughList"
          :key="dough.id"
          :value="dough.value"
          :is-checked="dough.value === pizza.dough.value"
          :class="`dough__input--${dough.value}`"
          class="dough__input"
          name="dough"
          @change="
            setPizzaProperty({
              property: 'dough',
              value: { ...dough, value: $event },
            })
          "
        >
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
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
  name: "BuilderDoughSelector",

  components: { RadioButton },

  computed: {
    ...mapState("Builder", ["doughList", "pizza"]),
  },

  methods: {
    ...mapMutations("Builder", { setPizzaProperty: SET_PIZZA_PROPERTY }),
  },
};
</script>
