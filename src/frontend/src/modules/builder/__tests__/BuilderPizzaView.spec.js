import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import sizeListJson from "@/modules/builder/__tests__/fixtures/sizeList.json";
import doughListJson from "@/modules/builder/__tests__/fixtures/doughList.json";
import sauceListJson from "@/modules/builder/__tests__/fixtures/sauceList.json";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPizzaView", () => {
  let wrapper;
  let store;

  const setStoreInitialState = () => {
    store.commit("Builder/SET_BUILDER_LIST", {
      list: "doughList",
      value: doughListJson,
    });
    store.commit("Builder/SET_BUILDER_LIST", {
      list: "sauceList",
      value: sauceListJson,
    });
    store.commit("Builder/SET_BUILDER_LIST", {
      list: "sizeList",
      value: sizeListJson,
    });
    store.commit("Builder/RESET_PIZZA_STATE");
  };

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, {
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

  it("renders empty pizza name input", () => {
    setStoreInitialState();
    createComponent();

    const pizzaNameInput = wrapper.find('[data-test="pizza-name-input"]');
    expect(pizzaNameInput.element.value).toBe("");
  });

  it("renders pizza name input with text on input", async () => {
    const INPUT_VALUE = "test";

    setStoreInitialState();
    createComponent();

    const pizzaNameInput = wrapper.find('[data-test="pizza-name-input"]');
    pizzaNameInput.element.value = INPUT_VALUE;
    await pizzaNameInput.trigger("input");

    expect(pizzaNameInput.element.value).toBe(INPUT_VALUE);
  });

  it("renders BuilderPriceCounter", () => {
    setStoreInitialState();
    createComponent();

    const priceCounter = wrapper.findComponent(BuilderPriceCounter);
    expect(priceCounter.exists()).toBeTruthy();
  });

  it("renders pizza view", () => {
    setStoreInitialState();
    createComponent();

    const pizzaView = wrapper.find('[data-test="pizza-view"]');
    expect(pizzaView.classes()).toContain("pizza--foundation--small-tomato");
  });
});
