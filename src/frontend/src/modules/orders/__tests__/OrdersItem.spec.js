import Vuex from "vuex";
import VueRouter from "vue-router";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import orderJson from "@/modules/orders/__tests__/fixtures/order.json";
import OrdersItem from "@/modules/orders/components/OrdersItem";
import OrdersItemPizza from "@/modules/orders/components/OrdersItemPizza";
import OrdersItemMisc from "@/modules/orders/components/OrdersItemMisc";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("OrdersItem", () => {
  let wrapper;
  let store;
  let propsData;
  let actions;
  let mutations;
  let router;

  const createComponent = (options) => {
    wrapper = shallowMount(OrdersItem, {
      ...options,
      localVue,
      store,
      router,
    });
  };

  beforeEach(() => {
    router = new VueRouter();
    router.push("/orders");
    actions = {
      Orders: {
        delete: jest.fn(),
      },
    };
    mutations = {
      Cart: {
        REPEAT_ORDER: jest.fn(),
      },
    };
    propsData = { order: orderJson };
    store = generateMockStore(actions, mutations);
  });

  afterEach(() => {
    router = null;
    wrapper.destroy();
  });

  it("renders order number", () => {
    createComponent({ propsData });

    const orderNumber = wrapper.find('[data-test="order-number"]');
    expect(orderNumber.text()).toBe(`Заказ #${propsData.order.id}`);
  });

  it("renders order sum", () => {
    createComponent({ propsData });

    const orderSum = wrapper.find('[data-test="order-sum"]');
    expect(orderSum.text()).toContain(`1092 ₽`);
  });

  it("dispatches deleteOrder store method on delete button click", async () => {
    createComponent({ propsData });

    const deleteButton = wrapper.find('[data-test="order-delete-button"]');
    await deleteButton.trigger("click");

    expect(actions.Orders.delete).toHaveBeenCalled();
  });

  it("dispatches repeatOrder store method on repeat button click", async () => {
    createComponent({ propsData });

    const repeatButton = wrapper.find('[data-test="order-repeat-button"]');
    await repeatButton.trigger("click");

    expect(mutations.Cart.REPEAT_ORDER).toHaveBeenCalled();
  });

  it("redirects to cart view on repeat button click", async () => {
    createComponent({ propsData });

    const repeatButton = wrapper.find('[data-test="order-repeat-button"]');
    await repeatButton.trigger("click");

    expect(wrapper.vm.$route.path).toBe("/cart");
  });

  it("renders order pizza component", () => {
    createComponent({ propsData });
    expect(wrapper.findComponent(OrdersItemPizza).exists()).toBeTruthy();
  });

  it("renders order misc component", () => {
    createComponent({ propsData });

    const OrdersItemMiscComponents = wrapper.findAllComponents(OrdersItemMisc);
    expect(OrdersItemMiscComponents.length).toBe(
      propsData.order.orderMisc.length
    );
  });

  it("renders order address", () => {
    createComponent({ propsData });

    const orderAddress = wrapper.find('[data-test="order-address"]');
    expect(orderAddress.text()).toContain(propsData.order.orderAddress.name);
  });
});
