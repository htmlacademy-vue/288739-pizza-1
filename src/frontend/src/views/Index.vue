<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector :dough="pizza.dough" />

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <div
                  class="diameter__item"
                  v-for="(size, index) in pizza.sizes"
                  :key="size.name"
                >
                  <RadioButton
                    :id="`diameter-input${index}`"
                    :is-checked="size.name === '32 см'"
                    :value="getSizeValue(size.name)"
                    name="diameter"
                  />

                  <SelectorItem
                    :image-source="size.image"
                    :image-style="{ 'max-width': `${33 * size.multiplier}%` }"
                    :image-wrapper-style="{ 'background-color': '#e1ffd7' }"
                    :title="size.name"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="content__ingridients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингридиенты
              </h2>

              <div class="sheet__content ingridients">
                <div class="ingridients__sauce sauce">
                  <p>Основной соус:</p>

                  <div
                    class="sauce__item"
                    v-for="(sauce, index) in pizza.sauces"
                    :key="sauce.name"
                  >
                    <RadioButton
                      :id="`sauce-input${index}`"
                      :is-checked="sauce.name === 'Томатный'"
                      :value="sauce.name === 'Томатный' ? 'tomato' : 'creamy'"
                      name="sauce"
                      size="small"
                    />

                    <SelectorItem :title="sauce.name" type="small" />
                  </div>
                </div>

                <div class="ingridients__filling">
                  <p>Начинка:</p>

                  <ul class="ingridients__list">
                    <li
                      v-for="ingredient in pizza.ingredients"
                      :key="ingredient.name"
                      class="ingridients__item"
                    >
                      <SelectorItem
                        :image-source="ingredient.image"
                        :title="ingredient.name"
                        type="filling"
                      />

                      <ItemCounter />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button button--disabled" disabled>
                Готовьте!
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import RadioButton from "@/common/components/RadioButton";
import SelectorItem from "@/common/components/SelectorItem";
import ItemCounter from "@/common/components/ItemCounter";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";

export default {
  name: "Index",

  components: { BuilderDoughSelector, RadioButton, SelectorItem, ItemCounter },

  data() {
    return {
      misc,
      pizza,
      user,
    };
  },

  methods: {
    getSizeValue(size) {
      switch (size) {
        case "23 см":
          return "small";
        case "32 см":
          return "normal";
        case "45 см":
          return "big";
        default:
          return "small";
      }
    },
  },
};
</script>

<style lang="scss">
.diameter {
  padding-bottom: 16px;
}

.diameter__item {
  display: flex;
  flex-grow: 1;
  position: relative;
}

.sauce__item {
  display: flex;
  position: relative;
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingridients__counter {
  width: 54px;
  margin-left: 36px;
}
</style>
