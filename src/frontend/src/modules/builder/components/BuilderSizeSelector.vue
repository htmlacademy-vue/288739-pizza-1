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
        <AppRadioButton
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
  name: "BuilderSizeSelector",

  components: { AppRadioButton },

  computed: {
    ...mapState("Builder", ["sizeList", "pizza"]),
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

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-image: url("~@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
