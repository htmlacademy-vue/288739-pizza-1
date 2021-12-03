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
        <AppRadioButton
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
        </AppRadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { SET_PIZZA_PROPERTY } from "@/store/mutations-types";

import AppRadioButton from "@/common/components/AppRadioButton";

export default {
  name: "BuilderDoughSelector",

  components: { AppRadioButton },

  computed: {
    ...mapState("Builder", ["doughList", "pizza"]),
  },

  methods: {
    ...mapMutations("Builder", { setPizzaProperty: SET_PIZZA_PROPERTY }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--small {
    @include b-s18-h21;
  }
}

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
