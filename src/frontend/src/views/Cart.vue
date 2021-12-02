<template>
  <form class="layout-form" data-test="cart-form" @submit.prevent="onSubmit">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          v-if="isCartEmpty"
          class="sheet cart__empty"
          data-test="cart-empty"
        >
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

    <transition name="fade" mode="out-in" appear>
      <CartModal v-if="isModalShown" @close="onModalClose" />
    </transition>
  </form>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { RESET_CART_STATE } from "@/store/mutations-types";

import CartPizzaList from "@/modules/cart/components/CartPizzaList";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartForm from "@/modules/cart/components/CartForm";
import CartFooter from "@/modules/cart/components/CartFooter";
import CartModal from "@/modules/cart/components/CartModal";

export default {
  name: "Cart",

  layout: "AppLayoutMain",

  components: {
    CartPizzaList,
    CartAdditionalList,
    CartForm,
    CartFooter,
    CartModal,
  },

  data() {
    return {
      isModalShown: false,
    };
  },

  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
    ...mapState("Cart", ["pizzaList"]),

    isCartEmpty() {
      return !this.pizzaList.length;
    },
  },

  mounted() {
    if (this.isAuthenticated) {
      this.getAddresses();
    }
  },

  methods: {
    ...mapActions("Addresses", { getAddresses: "query" }),
    ...mapActions("Cart", ["submitOrder"]),
    ...mapMutations("Cart", { resetCartState: RESET_CART_STATE }),

    onModalClose() {
      this.resetCartState();
      this.isModalShown = false;
      setTimeout(() => {
        if (this.isAuthenticated) {
          this.$router.push("/orders");
        } else {
          this.$router.push("/");
        }
      }, 700);
    },

    async onSubmit() {
      await this.submitOrder();
      this.isModalShown = true;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
