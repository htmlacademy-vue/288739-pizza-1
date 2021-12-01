import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import additionalListJson from "@/modules/cart/__tests__/fixtures/additionalList.json";
import CartAdditionalListItem from "@/modules/cart/components/CartAdditionalListItem";

const localVue = createLocalVue();
localVue.use(Vuex);

const additionalItem = additionalListJson[0];

describe("CartAdditionalListItem", () => {
  let wrapper;
  let store;
  let propsData;

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalListItem, {
      ...options,
      localVue,
      store,
    });
  };

  beforeEach(() => {
    propsData = { additional: additionalItem };
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders additional image", () => {
    createComponent({ propsData });

    const image = wrapper.find('[data-test="additional-image"]');
    expect(image.attributes("src")).toBe(additionalItem.image);
    expect(image.attributes("alt")).toBe(additionalItem.name);
  });

  it("renders additional name", () => {
    createComponent({ propsData });

    const name = wrapper.find('[data-test="additional-name"]');
    expect(name.text()).toContain(additionalItem.name);
  });

  it("renders additional price", () => {
    const PRICE_TEXT = "56 ₽/шт.";
    createComponent({ propsData });

    const priceText = wrapper.find('[data-test="additional-price-text"]');
    expect(priceText.text()).toBe(PRICE_TEXT);
  });

  it("renders additional quantity", () => {
    createComponent({ propsData });

    const additionalQuantityInput = wrapper.find(
      '[data-test="additional-quantity"]'
    );
    expect(+additionalQuantityInput.element.value).toBe(
      additionalItem.quantity
    );
  });

  it("renders disabled minus button if quantity is 0", () => {
    createComponent({ propsData });

    const additionalMinusButton = wrapper.find(
      '[data-test="additional-minus-button"]'
    );
    expect(additionalMinusButton.attributes("disabled")).toBeTruthy();
  });
});
