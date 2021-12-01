import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import addressJson from "@/modules/profile/__tests__/fixtures/address.json";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";
import ProfileForm from "@/modules/profile/components/ProfileForm";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ProfileAddress", () => {
  let wrapper;
  let store;
  let propsData;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(ProfileAddress, {
      ...options,
      localVue,
      store,
    });
  };

  beforeEach(() => {
    actions = {
      Addresses: {
        delete: jest.fn(),
        put: jest.fn(),
      },
    };
    propsData = { address: addressJson, number: 1 };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders address info card on start", () => {
    createComponent({ propsData });

    const addressInfoCard = wrapper.find('[data-test="address-info-card"]');
    expect(addressInfoCard.exists()).toBeTruthy();
  });

  it("renders address number and name", () => {
    createComponent({ propsData });

    const numberAndName = wrapper.find('[data-test="address-number-and-name"]');
    expect(numberAndName.text()).toBe(
      `Адрес №${propsData.number}. ${propsData.address.name}`
    );
  });

  it("renders address edit form on edit button click", async () => {
    createComponent({ propsData });

    const editButton = wrapper.find('[data-test="address-edit-button"]');
    await editButton.trigger("click");

    expect(wrapper.findComponent(ProfileForm).exists()).toBeTruthy();
  });

  it("renders full address", () => {
    createComponent({ propsData });

    const fullAddress = wrapper.find('[data-test="address-full"]');
    expect(fullAddress.text()).toBe(
      `${propsData.address.street}, д. ${propsData.address.building} , оф. ${propsData.address.flat}`
    );
  });

  it("renders address comment", () => {
    createComponent({ propsData });

    const comment = wrapper.find('[data-test="address-comment"]');
    expect(comment.text()).toBe(propsData.address.comment);
  });
});
