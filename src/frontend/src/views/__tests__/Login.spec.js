import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Login from "@/views/Login/Index";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("Cart", () => {
  let wrapper;
  let store;
  let actions;
  let router;

  const createComponent = (options) => {
    wrapper = shallowMount(Login, {
      ...options,
      localVue,
      store,
      router,
    });
  };

  beforeEach(() => {
    router = new VueRouter();
    router.push("/login");
    actions = {
      Profile: {
        login: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    router = null;
    wrapper.destroy();
  });

  it("renders empty login email input", () => {
    createComponent();
    const loginEmailInput = wrapper.find('[data-test="login-email-input"]');
    expect(loginEmailInput.exists()).toBeTruthy();
    expect(loginEmailInput.element.value).toBe("");
  });

  it("renders empty login password input", () => {
    createComponent();
    const loginPasswordInput = wrapper.find(
      '[data-test="login-password-input"]'
    );
    expect(loginPasswordInput.exists()).toBeTruthy();
    expect(loginPasswordInput.element.value).toBe("");
  });

  it("dispatches login method on login form submit", async () => {
    createComponent();

    const loginEmailInput = wrapper.find('[data-test="login-email-input"]');
    await loginEmailInput.setValue("user@example.com");

    const loginPasswordInput = wrapper.find(
      '[data-test="login-password-input"]'
    );
    await loginPasswordInput.setValue("password");

    const loginSubmitButton = wrapper.find('[data-test="login-submit-button"]');
    await loginSubmitButton.trigger("submit");

    expect(actions.Profile.login).toHaveBeenCalled();
  });

  it("redirects to root on login submit", async () => {
    createComponent();

    const loginEmailInput = wrapper.find('[data-test="login-email-input"]');
    await loginEmailInput.setValue("user@example.com");

    const loginPasswordInput = wrapper.find(
      '[data-test="login-password-input"]'
    );
    await loginPasswordInput.setValue("password");

    const loginSubmitButton = wrapper.find('[data-test="login-submit-button"]');
    await loginSubmitButton.trigger("submit");
    await Vue.nextTick();

    expect(wrapper.vm.$route.path).toBe("/");
  });

  it("closes login form on close button click", async () => {
    const backSpy = jest.spyOn(router, "back");
    createComponent();

    const loginFormClose = wrapper.find('[data-test="login-form-close"]');
    await loginFormClose.trigger("click");

    expect(backSpy).toHaveBeenCalled();
  });
});
