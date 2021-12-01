import { shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import AppLayout from "@/layouts/AppLayout";
import AppLayoutMain from "@/layouts/AppLayoutMain";
import AppLayoutWithSidebar from "@/layouts/AppLayoutWithSidebar";

describe("AppLayout", () => {
  let wrapper;

  const mocks = {
    $route: {
      meta: {
        layout: "",
      },
    },
  };

  const stubs = ["router-link"];

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  beforeEach(() => {
    mocks.$route.meta.layout = "";
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders AppLayoutMain by default", async () => {
    createComponent({ mocks });
    await flushPromises();
    const appLayoutMain = wrapper.findComponent(AppLayoutMain);
    expect(appLayoutMain.exists()).toBeTruthy();
  });

  it("renders AppLayoutWithSidebar layout", async () => {
    mocks.$route.meta.layout = "AppLayoutWithSidebar";
    createComponent({ mocks, stubs });
    await flushPromises();
    const appLayoutWithSidebar = wrapper.findComponent(AppLayoutWithSidebar);
    expect(appLayoutWithSidebar.exists()).toBeTruthy();
  });
});
