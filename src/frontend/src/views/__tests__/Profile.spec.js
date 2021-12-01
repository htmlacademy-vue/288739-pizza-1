import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import addressesJson from "./fixtures/addresses.json";
import Profile from "@/views/Profile";
import ProfileUser from "@/modules/profile/components/ProfileUser";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";
import ProfileForm from "@/modules/profile/components/ProfileForm";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Profile", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(Profile, {
      ...options,
      localVue,
      store,
    });
  };

  beforeEach(() => {
    actions = { Addresses: { query: jest.fn() } };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders ProfileUser component", () => {
    createComponent();
    expect(wrapper.findComponent(ProfileUser).exists()).toBeTruthy();
  });

  it("does not render address components if there are no addresses", () => {
    store.commit("Addresses/SET_ADDRESSES", []);
    createComponent();
    const ProfileAddressComponents = wrapper.findAllComponents(ProfileAddress);

    expect(ProfileAddressComponents.length).toBe(0);
  });

  it("renders ProfileUser components", () => {
    store.commit("Addresses/SET_ADDRESSES", addressesJson);
    createComponent();
    const ProfileAddressComponents = wrapper.findAllComponents(ProfileAddress);

    expect(ProfileAddressComponents.length).toBe(addressesJson.length);
  });

  it("calls addresses query method on start", () => {
    createComponent();
    expect(actions.Addresses.query).toHaveBeenCalled();
  });

  it("does not render new address form on start", () => {
    createComponent();
    expect(wrapper.findComponent(ProfileForm).exists()).toBeFalsy();
  });

  it("renders new address form on add new address button click", async () => {
    createComponent();

    const openNewAddressFormButton = wrapper.find(
      '[data-test="open-new-address-form-button"]'
    );
    await openNewAddressFormButton.trigger("click");

    expect(wrapper.findComponent(ProfileForm).exists()).toBeTruthy();
  });
});
