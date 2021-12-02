import Vuex from "vuex";
import VueRouter from "vue-router";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import pizzaPayloadJson from "@/layouts/__tests__/fixtures/pizzaPayload.json";
import userJson from "@/layouts/__tests__/fixtures/user.json";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const addPizzaToCart = (store) => {
  store.commit("Cart/ADD_PIZZA_TO_CART", pizzaPayloadJson);
};

const authenticateUser = (store) => {
  store.commit("Profile/SET_IS_AUTHENTICATED", true);
  store.commit("Profile/SET_USER", userJson);
};

describe("AppLayoutHeader", () => {
  let wrapper;
  let actions;
  let store;
  let router;

  const EMPTY_CART_PRICE_TEXT = "0 ₽";
  const CART_WITH_PIZZA_PRICE_TEXT = "400 ₽";
  const LOGIN_LINK_TEXT = "Войти";

  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
  };

  const mocks = {
    $notifier: {
      success: jest.fn(),
    },
  };

  beforeEach(() => {
    actions = {
      Profile: {
        logout: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    router = new VueRouter();
  });

  afterEach(() => {
    router = null;
    wrapper.destroy();
    wrapper = null;
  });

  it("renders empty cart total price", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.find('[data-test="header-cart"]').text()).toContain(
      EMPTY_CART_PRICE_TEXT
    );
  });

  it("renders cart total price if pizza added to cart", () => {
    addPizzaToCart(store);
    createComponent({ localVue, store, router });
    expect(wrapper.find('[data-test="header-cart"]').text()).toContain(
      CART_WITH_PIZZA_PRICE_TEXT
    );
  });

  it("redirects to cart page on cart link click", async () => {
    createComponent({ localVue, store, router });

    const cartLink = wrapper.find('[data-test="header-cart-link"]');
    await cartLink.trigger("click");

    expect(wrapper.vm.$route.path).toBe("/cart");
  });

  it("renders login link if user is not authenticated", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.find('[data-test="header-login"]').text()).toContain(
      LOGIN_LINK_TEXT
    );
  });

  it("renders profile link if user authenticated", () => {
    authenticateUser(store);
    createComponent({ localVue, store, router });
    expect(
      wrapper.find('[data-test="header-profile-link"]').exists()
    ).toBeTruthy();
  });

  it("redirects to profile page on profile link click", async () => {
    authenticateUser(store);
    createComponent({ localVue, store, router });

    const profileLink = wrapper.find('[data-test="header-profile-link"]');
    await profileLink.trigger("click");

    expect(wrapper.vm.$route.path).toBe("/profile");
  });

  it("redirects to login on click", async () => {
    createComponent({ localVue, store, router });

    const headerLoginLink = wrapper.find('[data-test="header-login"]');
    await headerLoginLink.trigger("click");
    expect(wrapper.vm.$route.path).toBe("/login");
  });

  it("logs out on click", async () => {
    authenticateUser(store);
    createComponent({ localVue, store, router, mocks });
    const headerLogoutLink = wrapper.find('[data-test="header-logout"]');
    await headerLogoutLink.trigger("click");
    expect(actions.Profile.logout).toHaveBeenCalled();
  });
});
