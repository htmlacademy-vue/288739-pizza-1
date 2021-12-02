import { shallowMount } from "@vue/test-utils";
import AppSelectorItem from "@/common/components/AppSelectorItem";

describe("AppSelectorItem", () => {
  let wrapper;
  let propsData;

  beforeEach(() => {
    propsData = { value: "test" };
  });

  const createComponent = (options) => {
    wrapper = shallowMount(AppSelectorItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("sets selector class", () => {
    createComponent({ propsData });
    const selectorItem = wrapper.find('[data-test="selector-item"]');
    expect(selectorItem.classes()).toContain("filling--test");
  });
});
