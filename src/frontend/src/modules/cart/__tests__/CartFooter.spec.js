import Vuex from "vuex";
import VueRouter from "vue-router";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import pizzaPayloadJson from "@/layouts/__tests__/fixtures/pizzaPayload.json";
import CartFooter from "@/modules/cart/components/CartFooter";
import routes from "@/router/routes.js";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("CartFooter", () => {
  let wrapper;
  let store;
  let router;

  const addPizzaToCart = () => {
    store.commit("Cart/ADD_PIZZA_TO_CART", pizzaPayloadJson);
  };

  const createComponent = (options) => {
    wrapper = mount(CartFooter, {
      ...options,
      localVue,
      store,
      router,
    });
  };

  beforeEach(() => {
    router = new VueRouter({ routes });
    router.push("/cart");
    store = generateMockStore();
  });

  afterEach(() => {
    router = null;
    wrapper.destroy();
  });

  it("redirects to index page when more button clicked", async () => {
    createComponent();

    const moreButton = wrapper.find('[data-test="footer-more-button"]');
    await moreButton.trigger("click");

    expect(wrapper.vm.$route.path).toBe("/");
  });

  it("renders order price", async () => {
    addPizzaToCart();
    createComponent();

    const priceText = wrapper.find('[data-test="footer-price-text"]');

    expect(priceText.text()).toContain("400 ₽");
  });
});
