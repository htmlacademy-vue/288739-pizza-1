import { shallowMount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter", () => {
  let wrapper;
  let propsData;

  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  beforeEach(() => {
    propsData = { value: 0, min: 0, max: 3 };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("sets default input value", () => {
    createComponent({ propsData });
    expect(+wrapper.find("input").element.value).toBe(propsData.value);
  });

  it("emits button minus event on click", async () => {
    propsData.value = 3;
    createComponent({ propsData });
    const minusButton = wrapper.find('[data-test="minus-button"]');
    await minusButton.trigger("click");
    expect(wrapper.emitted().input[0][0]).toEqual(2);
  });

  it("emits button plus event on click", async () => {
    createComponent({ propsData });
    const plusButton = wrapper.find('[data-test="plus-button"]');
    await plusButton.trigger("click");
    expect(wrapper.emitted().input[0][0]).toEqual(1);
  });

  it("disables minus button if count = 0", () => {
    createComponent({ propsData });
    const minusButton = wrapper.find('[data-test="minus-button"]');
    expect(minusButton.attributes("disabled")).toBeTruthy();
  });

  it("disables plus button if count = max", () => {
    propsData.value = propsData.max;
    createComponent({ propsData });
    const plusButton = wrapper.find('[data-test="plus-button"]');
    expect(plusButton.attributes("disabled")).toBeTruthy();
  });
});
