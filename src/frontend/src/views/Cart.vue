<template>
  <form class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="isCartEmpty" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-else>
          <CartPizzaList />
          <CartAdditionalList />
          <CartForm />
        </template>
      </div>
    </main>

    <CartFooter v-if="!isCartEmpty" />
  </form>
</template>

<script>
import { mapState } from "vuex";

import CartPizzaList from "@/modules/cart/components/CartPizzaList";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartForm from "@/modules/cart/components/CartForm";
import CartFooter from "@/modules/cart/components/CartFooter";

export default {
  name: "Cart",

  components: {
    CartPizzaList,
    CartAdditionalList,
    CartForm,
    CartFooter,
  },

  computed: {
    ...mapState("Cart", ["cartPizzaList"]),

    isCartEmpty() {
      return !this.cartPizzaList.length;
    },
  },
};
</script>
