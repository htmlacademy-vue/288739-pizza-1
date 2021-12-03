import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import doughListJson from "@/modules/builder/__tests__/fixtures/doughList.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import AppRadioButton from "@/common/components/AppRadioButton";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderDoughSelector", () => {
  let wrapper;
  let store;

  const setStoreInitialState = () => {
    store.commit("Builder/SET_BUILDER_LIST", {
      list: "doughList",
      value: doughListJson,
    });

    store.commit("Builder/RESET_PIZZA_STATE");
  };

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, {
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

  it("renders title", () => {
    createComponent();
    expect(
      wrapper.find('[data-test="dough-selector-title"]').exists()
    ).toBeTruthy();
  });

  it("does not render radio buttons if there is no data", () => {
    createComponent();
    expect(wrapper.findComponent(AppRadioButton).exists()).toBeFalsy();
  });

  it("renders dough list", () => {
    setStoreInitialState();
    createComponent();

    const radioButtons = wrapper.findAllComponents(AppRadioButton);
    expect(radioButtons).toHaveLength(doughListJson.length);
  });

  it("renders first dough selector as checked", () => {
    setStoreInitialState();
    createComponent();

    const radioButtons = wrapper.findAllComponents(AppRadioButton);
    expect(radioButtons.at(0).props("isChecked")).toBeTruthy();
  });

  it("renders second dough selector as checked when clicked", async () => {
    setStoreInitialState();
    createComponent();

    const radioButtons = wrapper.findAllComponents(AppRadioButton);
    await radioButtons.at(1).trigger("click");

    expect(radioButtons.at(1).props("isChecked")).toBeTruthy();
  });
});
