import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import sizeListJson from "@/modules/builder/__tests__/fixtures/sizeList.json";
import doughListJson from "@/modules/builder/__tests__/fixtures/doughList.json";
import sauceListJson from "@/modules/builder/__tests__/fixtures/sauceList.json";
import ingredientsJson from "@/modules/builder/__tests__/fixtures/ingredients.json";
import addIngredientPayload from "@/modules/builder/__tests__/fixtures/addIngredientPayload.json";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

const localVue = createLocalVue();
localVue.use(Vuex);

const setStoreInitialState = (store) => {
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
  store.commit("Builder/SET_BUILDER_LIST", {
    list: "ingredients",
    value: ingredientsJson,
  });
  store.commit("Builder/RESET_PIZZA_STATE");
};

const setNewPizzaState = (store) => {
  store.commit("UPDATE_ENTITY", addIngredientPayload);
  store.commit("Builder/SET_PIZZA_PROPERTY", {
    property: "name",
    value: "TEST",
  });
};

describe("BuilderPriceCounter", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, {
      ...options,
      localVue,
      store,
    });
  };

  beforeEach(() => {
    actions = {
      Cart: {
        ADD_PIZZA_TO_CART: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders price text on start", () => {
    setStoreInitialState(store);
    createComponent();
    expect(wrapper.find('[data-test="price-text"]').text()).toContain("350 ₽");
  });

  it("renders disabled add to cart button on start", () => {
    setStoreInitialState(store);
    createComponent();

    const button = wrapper.find('[data-test="add-to-cart-button"]');

    expect(button.attributes("disabled")).toBeTruthy();
    expect(button.classes()).toContain("button--disabled");
  });

  it("dispatches addPizzaToCart method on button click when pizza is ready to be ordered", async () => {
    setStoreInitialState(store);
    setNewPizzaState(store);
    createComponent();

    const button = wrapper.find('[data-test="add-to-cart-button"]');
    await button.trigger("click");

    expect(actions.Cart.ADD_PIZZA_TO_CART).toHaveBeenCalled();
  });
});
