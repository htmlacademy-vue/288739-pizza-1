import Vue from "vue";
import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import pizzaPayloadJson from "@/layouts/__tests__/fixtures/pizzaPayload.json";
import Cart from "@/views/Cart";
import CartPizzaList from "@/modules/cart/components/CartPizzaList";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartForm from "@/modules/cart/components/CartForm";
import CartFooter from "@/modules/cart/components/CartFooter";
import CartModal from "@/modules/cart/components/CartModal";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Cart", () => {
  let wrapper;
  let store;
  let actions;

  const addPizzaToCart = (payload) => {
    store.commit("Cart/ADD_PIZZA_TO_CART", payload);
  };

  const createComponent = (options) => {
    wrapper = shallowMount(Cart, { ...options, localVue, store });
  };

  beforeEach(() => {
    actions = {
      Cart: {
        submitOrder: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders empty cart message if cart is empty", () => {
    createComponent();

    const emptyCartBlock = wrapper.find('[data-test="cart-empty"]');
    expect(emptyCartBlock.text()).toContain("В корзине нет ни одного товара");
  });

  it("does not render footer if cart is empty", () => {
    createComponent();
    expect(wrapper.findComponent(CartFooter).exists()).toBeFalsy();
  });

  it("does not render cart modal on start", () => {
    createComponent();
    expect(wrapper.findComponent(CartModal).exists()).toBeFalsy();
  });

  it("renders cart components if cart is not empty", () => {
    addPizzaToCart(pizzaPayloadJson);
    createComponent();

    expect(wrapper.findComponent(CartPizzaList).exists()).toBeTruthy();
    expect(wrapper.findComponent(CartAdditionalList).exists()).toBeTruthy();
    expect(wrapper.findComponent(CartForm).exists()).toBeTruthy();
    expect(wrapper.findComponent(CartFooter).exists()).toBeTruthy();
  });

  it("submits order on cart form submit", async () => {
    addPizzaToCart(pizzaPayloadJson);
    createComponent();

    const cartForm = wrapper.find('[data-test="cart-form"]');
    await cartForm.trigger("submit");

    expect(actions.Cart.submitOrder).toHaveBeenCalled();
  });

  it("renders cart modal on form submit", async () => {
    addPizzaToCart(pizzaPayloadJson);
    createComponent();

    const cartForm = wrapper.find('[data-test="cart-form"]');
    await cartForm.trigger("submit");
    await Vue.nextTick();

    expect(wrapper.findComponent(CartModal).exists()).toBeTruthy();
  });
});
