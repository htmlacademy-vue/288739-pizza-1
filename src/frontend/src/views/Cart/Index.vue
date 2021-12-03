<template>
  <form
    class="layout-form"
    data-test="cart-form"
    @submit.prevent="onSubmit"
  >
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

    <transition
      name="fade"
      mode="out-in"
      appear
    >
      <CartModal
        v-if="isModalShown"
        @close="onModalClose"
      />
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
  name: "CartIndex",

  components: {
    CartPizzaList,
    CartAdditionalList,
    CartForm,
    CartFooter,
    CartModal,
  },

  layout: "AppLayoutMain",

  data() {
    return {
      isModalShown: false,
    };
  },

  computed: {
    ...mapState("Profile", ["isAuthenticated"]),
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

<style lang="scss" scoped>
.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }
}

.container {
  width: 770px;
  margin: 0 auto;
}

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cart__title {
  margin-bottom: 15px;
}

.cart__empty {
  padding: 20px 30px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
