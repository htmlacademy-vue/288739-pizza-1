import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import addressJson from "@/modules/profile/__tests__/fixtures/address.json";
import userJson from "@/layouts/__tests__/fixtures/user.json";
import ProfileForm from "@/modules/profile/components/ProfileForm";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ProfileForm", () => {
  let wrapper;
  let store;
  let propsData;

  const createComponent = (options) => {
    wrapper = mount(ProfileForm, {
      ...options,
      localVue,
      store,
    });
  };

  const authenticateUser = () => {
    store.commit("Profile/SET_IS_AUTHENTICATED", true);
    store.commit("Profile/SET_USER", userJson);
  };

  beforeEach(() => {
    propsData = { address: addressJson, number: 1 };
    store = generateMockStore();
    authenticateUser();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("emits submit event on save button click", async () => {
    createComponent({ propsData });

    const addressForm = wrapper.find('[data-test="address-form"]');
    await addressForm.trigger("submit");

    expect(wrapper.emitted("submit")).toBeTruthy();
  });

  it("renders address number", () => {
    createComponent({ propsData });

    const addressNumber = wrapper.find('[data-test="address-number"]');
    expect(addressNumber.text()).toBe(`Адрес №${propsData.number}`);
  });

  it("renders address name input", () => {
    createComponent({ propsData });

    const nameInput = wrapper.find('[data-test="address-name-input"]');
    expect(nameInput.element.value).toBe(propsData.address.name);
  });

  it("renders address street input", () => {
    createComponent({ propsData });

    const streetInput = wrapper.find('[data-test="address-street-input"]');
    expect(streetInput.element.value).toBe(propsData.address.street);
  });

  it("renders address building input", () => {
    createComponent({ propsData });

    const buildingInput = wrapper.find('[data-test="address-building-input"]');
    expect(buildingInput.element.value).toBe(propsData.address.building);
  });

  it("renders address flat input", () => {
    createComponent({ propsData });

    const flatInput = wrapper.find('[data-test="address-flat-input"]');
    expect(flatInput.element.value).toBe(propsData.address.flat);
  });

  it("renders address comment input", () => {
    createComponent({ propsData });

    const commentInput = wrapper.find('[data-test="address-comment-input"]');
    expect(commentInput.element.value).toBe(propsData.address.comment);
  });

  it("emits close event on delete button click", async () => {
    createComponent({ propsData });

    const deleteButton = wrapper.find('[data-test="address-delete-button"]');
    await deleteButton.trigger("click");

    expect(wrapper.emitted("close")).toBeTruthy();
  });
});
