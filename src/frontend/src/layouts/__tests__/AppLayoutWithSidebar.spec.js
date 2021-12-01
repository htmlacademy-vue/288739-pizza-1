import VueRouter from "vue-router";
import { createLocalVue, mount } from "@vue/test-utils";
import AppLayoutWithSidebar from "@/layouts/AppLayoutWithSidebar";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import routes from "@/router/routes.js";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("AppLayoutLogin", () => {
  let wrapper;
  let router;

  const slots = {
    default: "slot-default-content",
  };

  const stubs = ["AppLayoutHeader"];

  const createComponent = (options) => {
    wrapper = mount(AppLayoutWithSidebar, {
      ...options,
      localVue,
      router,
      slots,
      stubs,
    });
  };

  beforeEach(() => {
    router = new VueRouter({ routes });
  });

  afterEach(() => {
    router = null;
    wrapper.destroy();
  });

  it("renders AppLayoutHeader", () => {
    createComponent();
    const appLayoutHeader = wrapper.findComponent(AppLayoutHeader);
    expect(appLayoutHeader.exists()).toBeTruthy();
  });

  it("renders slot content", () => {
    createComponent();
    expect(wrapper.html()).toContain(slots.default);
  });

  it("redirects to orders page on orders link click", async () => {
    createComponent();

    const ordersLink = wrapper.find('[data-test="sidebar-orders-link"]');
    await ordersLink.trigger("click");

    expect(wrapper.vm.$route.path).toBe("/orders");
  });

  it("redirects to profile page on profile link click", async () => {
    createComponent();

    const profileLink = wrapper.find('[data-test="sidebar-profile-link"]');
    await profileLink.trigger("click");

    expect(wrapper.vm.$route.path).toBe("/profile");
  });
});
