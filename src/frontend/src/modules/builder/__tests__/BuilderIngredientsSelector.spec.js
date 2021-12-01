import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import sauceListJson from "@/modules/builder/__tests__/fixtures/sauceList.json";
import ingredientsJson from "@/modules/builder/__tests__/fixtures/ingredients.json";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderIngredientsSelector", () => {
  let wrapper;
  let store;

  const setStoreInitialState = () => {
    store.commit("Builder/SET_BUILDER_LIST", {
      list: "sauceList",
      value: sauceListJson,
    });

    store.commit("Builder/SET_BUILDER_LIST", {
      list: "ingredients",
      value: ingredientsJson,
    });

    store.commit("Builder/RESET_PIZZA_STATE");
  };

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, {
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

  it("does not render sauce selectors if there is no data", () => {
    createComponent();

    const sauceSelectorItems = wrapper.findAll(
      '[data-test="sauce-selector-item"]'
    );

    expect(sauceSelectorItems.length).toBe(0);
  });

  it("renders sauce list", () => {
    setStoreInitialState();
    createComponent();

    const sauceSelectorItems = wrapper.findAll(
      '[data-test="sauce-selector-item"]'
    );

    expect(sauceSelectorItems.length).toBe(sauceListJson.length);
  });

  it("renders first sauce selector as checked", () => {
    setStoreInitialState();
    createComponent();

    const sauceSelectorItems = wrapper.findAll(
      '[data-test="sauce-selector-item"]'
    );
    expect(sauceSelectorItems.at(0).props("isChecked")).toBeTruthy();
  });

  it("renders second dough selector as checked when clicked", async () => {
    setStoreInitialState();
    createComponent();

    const sauceSelectorItems = wrapper.findAll(
      '[data-test="sauce-selector-item"]'
    );
    await sauceSelectorItems.at(1).trigger("click");

    expect(sauceSelectorItems.at(1).props("isChecked")).toBeTruthy();
  });

  it("does not render ingredients if there is no data", () => {
    createComponent();

    const ingredientsItems = wrapper.findAll('[data-test="ingredients-item"]');

    expect(ingredientsItems.length).toBe(0);
  });

  it("renders ingredients list", () => {
    setStoreInitialState();
    createComponent();

    const ingredientsItems = wrapper.findAll('[data-test="ingredients-item"]');

    expect(ingredientsItems.length).toBe(ingredientsJson.length);
  });

  it("renders ingredient counter with value equals zero", () => {
    setStoreInitialState();
    createComponent();

    const firstIngredientsItemCounter = wrapper
      .findAll('[data-test="ingredients-item"]')
      .at(0)
      .find('[data-test="ingredient-counter"]');

    expect(firstIngredientsItemCounter.props().value).toBe(0);
  });
});
