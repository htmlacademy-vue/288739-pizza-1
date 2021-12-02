import { shallowMount } from "@vue/test-utils";
import AppRadioButton from "@/common/components/AppRadioButton";

describe("AppRadioButton", () => {
  let wrapper;
  let propsData;

  beforeEach(() => {
    propsData = {
      isChecked: true,
      name: "Test name",
      value: "Test value",
    };
  });

  const createComponent = (options) => {
    wrapper = shallowMount(AppRadioButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("sets name", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("name")).toBe(propsData.name);
  });

  it("sets value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("value")).toBe(propsData.value);
  });

  it("sets checked", () => {
    propsData.isChecked = true;
    createComponent({ propsData });
    expect(wrapper.find("input").element.checked).toBeTruthy();
  });

  it("emits value on change", async () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    input.element.value = propsData.value;

    await input.trigger("change");

    expect(wrapper.emitted("change")).toEqual([[propsData.value]]);
  });
});
