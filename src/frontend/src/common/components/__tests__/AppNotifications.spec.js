import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import AppNotifications from "@/common/components/AppNotifications";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppNotifications", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(AppNotifications, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("doesnt render out when no notifications", () => {
    createComponent({ localVue, store });
    expect(wrapper.html()).toBeFalsy();
  });

  it("renders out when we have notifications", async () => {
    createComponent({ localVue, store });
    await store.commit("Notifications/ADD_NOTIFICATION", {
      text: "text",
      type: "warning",
    });
    expect(wrapper.html()).toBeTruthy();
  });

  it("renders out notification", async () => {
    createComponent({ localVue, store });
    await store.commit("Notifications/ADD_NOTIFICATION", {
      text: "text",
      type: "warning",
    });
    expect(wrapper.html()).toContain("notification--warning");
    expect(wrapper.html()).toContain("text");
  });
});
