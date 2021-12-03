<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce sauce">
          <p>Основной соус:</p>

          <AppRadioButton
            v-for="sauce in sauceList"
            :key="sauce.id"
            :value="sauce.value"
            :is-checked="sauce.value === pizza.sauce.value"
            class="radio ingredients__input"
            name="sauce"
            data-test="sauce-selector-item"
            @change="
              setPizzaProperty({
                property: 'sauce',
                value: { ...sauce, value: $event },
              })
            "
          >
            <span>{{ sauce.name }}</span>
          </AppRadioButton>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
              data-test="ingredients-item"
            >
              <AppDrag
                :transfer-data="ingredient"
                :is-draggable="ingredient.count < 3"
              >
                <AppSelectorItem :value="ingredient.value">
                  {{ ingredient.name }}
                </AppSelectorItem>
              </AppDrag>

              <AppItemCounter
                :value="ingredient.count"
                :min="0"
                :max="3"
                class="ingredients__counter"
                data-test="ingredient-counter"
                @input="
                  setIngredientCount({
                    ingredient: ingredient,
                    count: $event,
                  })
                "
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import {
  SET_INGREDIENT_COUNT,
  SET_PIZZA_PROPERTY,
} from "@/store/mutations-types";

import AppDrag from "@/common/components/AppDrag";
import AppRadioButton from "@/common/components/AppRadioButton";
import AppSelectorItem from "@/common/components/AppSelectorItem";
import AppItemCounter from "@/common/components/AppItemCounter";

export default {
  name: "BuilderIngredientsSelector",

  components: { AppRadioButton, AppSelectorItem, AppItemCounter, AppDrag },

  computed: {
    ...mapState("Builder", ["sauceList", "pizza", "ingredients"]),
  },

  methods: {
    ...mapMutations("Builder", { setPizzaProperty: SET_PIZZA_PROPERTY }),

    ...mapActions("Builder", {
      setIngredientCount: SET_INGREDIENT_COUNT,
    }),
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

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.radio {
  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 28px;

    &:before {
      @include p_center-v;

      display: block;

      box-sizing: border-box;
      width: 20px;
      height: 20px;

      content: "";
      transition: 0.3s;

      border: 1px solid $purple-400;
      border-radius: 50%;
      background-color: $white;
    }
  }

  &:hover {
    input:not(:checked):not(:disabled) + span {
      &:before {
        border-color: $purple-800;
      }
    }
  }

  input {
    display: none;

    &:checked + span {
      &:before {
        border: 6px solid $green-500;
      }
    }

    &:disabled {
      & + span {
        &:before {
          border-color: $purple-400;
          background-color: $silver-200;
        }
      }

      &:checked + span {
        &:before {
          border: 6px solid $purple-400;
        }
      }
    }
  }
}
</style>
