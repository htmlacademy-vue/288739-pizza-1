import { shallowMount } from "@vue/test-utils";
import AppLayoutMain from "@/layouts/AppLayoutMain";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

describe("AppLayoutMain", () => {
  let wrapper;

  const slots = {
    default: "slot-default-content",
  };

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutMain, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders AppLayoutHeader", () => {
    createComponent({ slots });
    const appLayoutHeader = wrapper.findComponent(AppLayoutHeader);
    expect(appLayoutHeader.exists()).toBeTruthy();
  });

  it("renders slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
