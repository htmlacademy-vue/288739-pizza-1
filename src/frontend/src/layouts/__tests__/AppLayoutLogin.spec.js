import { shallowMount } from "@vue/test-utils";
import AppLayoutLogin from "@/layouts/AppLayoutLogin";
import Login from "@/views/Login/Index";

describe("AppLayoutLogin", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutLogin, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders Login component", () => {
    createComponent();
    const loginComponent = wrapper.findComponent(Login);
    expect(loginComponent.exists()).toBeTruthy();
  });
});
