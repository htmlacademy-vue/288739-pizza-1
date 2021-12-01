import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import pizzaPayloadJson from "@/layouts/__tests__/fixtures/pizzaPayload.json";
import CartPizzaList from "@/modules/cart/components/CartPizzaList";
import CartPizzaListItem from "@/modules/cart/components/CartPizzaListItem";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartPizzaList", () => {
  let wrapper;
  let store;

  const addPizzaToCart = () => {
    store.commit("Cart/ADD_PIZZA_TO_CART", pizzaPayloadJson);
  };

  const createComponent = (options) => {
    wrapper = mount(CartPizzaList, {
      ...options,
      localVue,
      store,
    });
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders empty pizza list when cart is empty", () => {
    createComponent();
    expect(wrapper.find('[data-test="pizza-list"]').exists()).toBeTruthy();
    expect(wrapper.findComponent(CartPizzaListItem).exists()).toBeFalsy();
  });

  it("renders pizza list with items when cart is not empty", () => {
    addPizzaToCart();
    createComponent();

    expect(wrapper.find('[data-test="pizza-list"]').exists()).toBeTruthy();
    const listItems = wrapper.findAllComponents(CartPizzaListItem);
    expect(listItems.length).toBe(1);
  });
});
