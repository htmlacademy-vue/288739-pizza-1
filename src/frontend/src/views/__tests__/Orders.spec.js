import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import ordersJson from "./fixtures/orders.json";
import Orders from "@/views/Orders";
import OrdersItem from "@/modules/orders/components/OrdersItem";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Orders", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(Orders, {
      ...options,
      localVue,
      store,
    });
  };

  beforeEach(() => {
    actions = {
      Orders: { query: jest.fn() },
      Addresses: { query: jest.fn() },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders empty orders message if there are no orders", () => {
    store.commit("Orders/SET_ORDERS", []);
    createComponent();

    const ordersEmptyBlock = wrapper.find('[data-test="orders-empty-message"]');
    expect(ordersEmptyBlock.exists()).toBeTruthy();
  });

  it("calls orders query method on start", () => {
    createComponent();
    expect(actions.Orders.query).toHaveBeenCalled();
  });

  it("calls addresses query method on start", () => {
    createComponent();
    expect(actions.Addresses.query).toHaveBeenCalled();
  });

  it("renders order list", () => {
    store.commit("Orders/SET_ORDERS", ordersJson);
    createComponent();

    const ordersEmptyBlock = wrapper.find('[data-test="orders-empty-message"]');
    expect(ordersEmptyBlock.exists()).toBeFalsy();

    const ordersItems = wrapper.findAllComponents(OrdersItem);

    expect(ordersItems.length).toBe(ordersJson.length);
  });
});
