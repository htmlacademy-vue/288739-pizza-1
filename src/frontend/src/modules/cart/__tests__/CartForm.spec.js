import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import addressesJson from "@/modules/cart/__tests__/fixtures/addresses.json";
import CartForm from "@/modules/cart/components/CartForm";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartForm", () => {
  let wrapper;
  let store;

  const setUserAddresses = () => {
    store.commit("Addresses/SET_ADDRESSES", addressesJson);
  };

  const createComponent = (options) => {
    wrapper = mount(CartForm, {
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

  it("renders select with options without user addresses", () => {
    createComponent();

    const selectOptions = wrapper.findAll(
      '[data-test="cart-form-select"] option'
    );
    expect(selectOptions.length).toBe(2);
  });

  it("renders select with options with user addresses", () => {
    setUserAddresses();
    createComponent();

    const selectOptions = wrapper.findAll(
      '[data-test="cart-form-select"] option'
    );
    expect(selectOptions.length).toBe(2 + addressesJson.length);
  });

  it("renders select with first option selected on start", () => {
    createComponent();

    const select = wrapper.find('[data-test="cart-form-select"]');
    expect(select.element.value).toBe("1");
  });

  it("does not render cart address form if pickup option is chosen", () => {
    createComponent();

    const cartAddressForm = wrapper.findAll('[data-test="cart-address-form"]');
    expect(cartAddressForm.exists()).toBeFalsy();
  });

  it("renders cart address form if delivery option is chosen", async () => {
    createComponent();

    const selectOptions = wrapper.findAll(
      '[data-test="cart-form-select"] option'
    );
    await selectOptions.at(1).setSelected();

    const cartAddressForm = wrapper.findAll('[data-test="cart-address-form"]');
    expect(cartAddressForm.exists()).toBeTruthy();
  });

  it("renders empty phone input on start", () => {
    createComponent();

    const phoneInput = wrapper.find('[data-test="cart-phone"]');
    expect(phoneInput.element.value).toBe("");
  });

  it("renders filled phone input on input", () => {
    const PHONE_INPUT_TEXT = "+7 999-999-99-01";
    createComponent();

    const phoneInput = wrapper.find('[data-test="cart-phone"]');
    phoneInput.setValue(PHONE_INPUT_TEXT);

    expect(phoneInput.element.value).toBe(PHONE_INPUT_TEXT);
  });
});
