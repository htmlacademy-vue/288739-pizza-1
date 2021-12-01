import { mount } from "@vue/test-utils";
import orderJson from "@/modules/orders/__tests__/fixtures/order.json";
import OrdersItemMisc from "@/modules/orders/components/OrdersItemMisc";

describe("OrdersItemMisc", () => {
  let wrapper;
  let propsData;

  const createComponent = (options) => {
    wrapper = mount(OrdersItemMisc, options);
  };

  beforeEach(() => {
    propsData = { misc: orderJson.orderMisc[0] };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders misc image", () => {
    createComponent({ propsData });

    const image = wrapper.find('[data-test="order-misc-image"]');
    expect(image.attributes("src")).toBe(propsData.misc.image);
    expect(image.attributes("alt")).toBe(propsData.misc.name);
  });

  it("renders misc name", () => {
    createComponent({ propsData });

    const name = wrapper.find('[data-test="order-misc-name"]');
    expect(name.text()).toBe(propsData.misc.name);
  });

  it("renders misc quantity", () => {
    createComponent({ propsData });

    const quantity = wrapper.find('[data-test="order-misc-quantity"]');
    expect(quantity.text()).toBe(`${propsData.misc.quantity}x`);
  });

  it("renders misc price", () => {
    createComponent({ propsData });

    const price = wrapper.find('[data-test="order-misc-price"]');
    expect(price.text()).toBe(`${propsData.misc.price} ₽`);
  });
});
