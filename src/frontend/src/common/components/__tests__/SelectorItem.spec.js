import { shallowMount } from "@vue/test-utils";
import SelectorItem from "@/common/components/SelectorItem";

describe("SelectorItem", () => {
  let wrapper;
  let propsData;

  beforeEach(() => {
    propsData = { value: "test" };
  });

  const createComponent = (options) => {
    wrapper = shallowMount(SelectorItem, options);
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
