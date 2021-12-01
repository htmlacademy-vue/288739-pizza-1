import { mount } from "@vue/test-utils";
import orderJson from "@/modules/orders/__tests__/fixtures/order.json";
import OrdersItemPizza from "@/modules/orders/components/OrdersItemPizza";

describe("OrdersItemPizza", () => {
  let wrapper;
  let propsData;

  const createComponent = (options) => {
    wrapper = mount(OrdersItemPizza, options);
  };

  beforeEach(() => {
    propsData = { pizza: orderJson.orderPizzas[0] };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders pizza image", () => {
    createComponent({ propsData });

    const image = wrapper.find('[data-test="order-pizza-image"]');
    expect(image.attributes("alt")).toBe(propsData.pizza.name);
  });

  it("renders pizza name", () => {
    createComponent({ propsData });

    const pizzaName = wrapper.find('[data-test="order-pizza-name"]');
    expect(pizzaName.text()).toBe(propsData.pizza.name);
  });

  it("renders pizza size and dough", () => {
    createComponent({ propsData });

    const pizzaSizeAndDough = wrapper.find(
      '[data-test="order-pizza-size-and-dough"]'
    );
    expect(pizzaSizeAndDough.text()).toBe("23 см, на тонком тесте");
  });

  it("renders pizza sauce", () => {
    createComponent({ propsData });

    const pizzaSauce = wrapper.find('[data-test="order-pizza-sauce"]');
    expect(pizzaSauce.text()).toBe("Соус: томатный");
  });

  it("renders pizza ingredients", () => {
    createComponent({ propsData });

    const pizzaIngredients = wrapper.find(
      '[data-test="order-pizza-ingredients"]'
    );
    expect(pizzaIngredients.text()).toBe("Начинка: лосось");
  });

  it("renders pizza price", () => {
    createComponent({ propsData });

    const priceText = wrapper.find('[data-test="order-pizza-price"]');
    expect(priceText.text()).toBe(`${propsData.pizza.price} ₽`);
  });

  it("renders pizza quantity", () => {
    createComponent({ propsData });

    const pizzaQuantity = wrapper.find('[data-test="order-pizza-quantity"]');
    expect(pizzaQuantity.text()).toBe(`${propsData.pizza.quantity}x`);
  });
});
