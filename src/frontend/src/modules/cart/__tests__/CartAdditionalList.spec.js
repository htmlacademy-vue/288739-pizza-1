import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import additionalListJson from "@/modules/cart/__tests__/fixtures/additionalList.json";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartAdditionalListItem from "@/modules/cart/components/CartAdditionalListItem";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartAdditionalList", () => {
  let wrapper;
  let store;

  const setStoreInitialState = () => {
    store.commit("Cart/SET_ADDITIONAL_LIST", additionalListJson);
  };

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalList, {
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

  it("renders empty additional list when cart is empty", () => {
    createComponent();
    expect(wrapper.find('[data-test="additional-list"]').exists()).toBeTruthy();
    expect(wrapper.findComponent(CartAdditionalListItem).exists()).toBeFalsy();
  });

  it("renders additional list with items when cart is not empty", () => {
    setStoreInitialState();
    createComponent();

    expect(wrapper.find('[data-test="additional-list"]').exists()).toBeTruthy();
    const listItems = wrapper.findAllComponents(CartAdditionalListItem);
    expect(listItems.length).toBe(additionalListJson.length);
  });
});
