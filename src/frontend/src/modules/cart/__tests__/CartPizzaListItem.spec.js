import Vuex from "vuex";
import VueRouter from "vue-router";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import pizzaPayloadJson from "@/layouts/__tests__/fixtures/pizzaPayload.json";
import CartPizzaListItem from "@/modules/cart/components/CartPizzaListItem";
import routes from "@/router/routes.js";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("CartPizzaListItem", () => {
  let wrapper;
  let store;
  let propsData;
  let actions;
  let router;

  const createComponent = (options) => {
    wrapper = mount(CartPizzaListItem, {
      ...options,
      localVue,
      store,
      router,
    });
  };

  beforeEach(() => {
    router = new VueRouter({ routes });
    router.push("/cart");
    actions = {
      Cart: {
        INCREMENT_PIZZA_QUANTITY: jest.fn(),
        DECREMENT_PIZZA_QUANTITY: jest.fn(),
      },
      Builder: {
        CHANGE_BUILDER_STATE: jest.fn(),
      },
    };
    propsData = { pizza: pizzaPayloadJson };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    router = null;
    wrapper.destroy();
  });

  it("renders pizza image", () => {
    createComponent({ propsData });

    const image = wrapper.find('[data-test="pizza-image"]');
    expect(image.attributes("alt")).toBe(propsData.pizza.name);
  });

  it("renders pizza name", () => {
    createComponent({ propsData });

    const pizzaName = wrapper.find('[data-test="cart-pizza-name"]');
    expect(pizzaName.text()).toBe(propsData.pizza.name);
  });

  it("renders pizza size", () => {
    createComponent({ propsData });

    const pizzaSize = wrapper.find('[data-test="cart-pizza-size"]');
    expect(pizzaSize.text()).toBe(propsData.pizza.size.name);
  });

  it("renders pizza dough", () => {
    createComponent({ propsData });

    const pizzaSize = wrapper.find('[data-test="cart-pizza-dough"]');
    expect(pizzaSize.text()).toBe("на тонком тесте");
  });

  it("renders pizza sauce", () => {
    createComponent({ propsData });

    const pizzaSauce = wrapper.find('[data-test="cart-pizza-sauce"]');
    expect(pizzaSauce.text()).toBe("Соус: томатный");
  });

  it("renders pizza ingredients", () => {
    createComponent({ propsData });

    const pizzaIngredients = wrapper.find(
      '[data-test="cart-pizza-ingredients"]'
    );
    expect(pizzaIngredients.text()).toBe("Начинка: лосось");
  });

  it("renders pizza price", () => {
    createComponent({ propsData });

    const priceText = wrapper.find('[data-test="cart-pizza-price"]');
    expect(priceText.text()).toBe("400 ₽");
  });

  it("renders pizza quantity", () => {
    createComponent({ propsData });

    const pizzaQuantityInput = wrapper.find('[data-test="pizza-quantity"]');
    expect(+pizzaQuantityInput.element.value).toBe(propsData.pizza.quantity);
  });

  it("dispatches INCREMENT_PIZZA_QUANTITY store method on plus button click", async () => {
    createComponent({ propsData });

    const pizzaPlusButton = wrapper.find('[data-test="pizza-plus-button"]');
    await pizzaPlusButton.trigger("click");

    expect(actions.Cart.INCREMENT_PIZZA_QUANTITY).toHaveBeenCalled();
  });

  it("dispatches DECREMENT_PIZZA_QUANTITY store method on plus button click", async () => {
    createComponent({ propsData });

    const pizzaMinusButton = wrapper.find('[data-test="pizza-minus-button"]');
    await pizzaMinusButton.trigger("click");

    expect(actions.Cart.DECREMENT_PIZZA_QUANTITY).toHaveBeenCalled();
  });

  it("dispatches change builder store method and redirects to builder page when change pizza button clicked", async () => {
    createComponent({ propsData });

    const changeButton = wrapper.find('[data-test="cart-change-button"]');
    await changeButton.trigger("click");

    expect(actions.Builder.CHANGE_BUILDER_STATE).toHaveBeenCalled();
    expect(wrapper.vm.$route.path).toBe("/");
  });
});
