<template>
  <section class="footer">
    <div class="footer__more">
      <router-link to="/" class="button button--border button--arrow">
        Хочу еще одну
      </router-link>
    </div>

    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>

    <div class="footer__price">
      <b>Итого: {{ orderPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <button type="submit" class="button" @click.prevent="onOrderSubmit">
        Оформить заказ
      </button>
    </div>

    <CartModal v-if="isModalShown" @close="onModalClose" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import CartModal from "@/modules/cart/components/CartModal";

export default {
  name: "CartFooter",

  components: { CartModal },

  data() {
    return {
      isModalShown: false,
    };
  },

  computed: {
    ...mapGetters("Cart", ["orderPrice"]),
  },

  methods: {
    onOrderSubmit() {
      this.isModalShown = true;
    },

    onModalClose() {
      this.isModalShown = false;
    },
  },
};
</script>
