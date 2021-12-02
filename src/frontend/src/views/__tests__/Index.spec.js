import { shallowMount } from "@vue/test-utils";
import Index from "@/views/Index/Index";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

describe("Index", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(Index, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders BuilderDoughSelector", () => {
    createComponent();
    expect(wrapper.findComponent(BuilderDoughSelector).exists()).toBeTruthy();
  });

  it("renders BuilderSizeSelector", () => {
    createComponent();
    expect(wrapper.findComponent(BuilderSizeSelector).exists()).toBeTruthy();
  });

  it("renders BuilderIngredientsSelector", () => {
    createComponent();
    expect(
      wrapper.findComponent(BuilderIngredientsSelector).exists()
    ).toBeTruthy();
  });

  it("renders BuilderPizzaView", () => {
    createComponent();
    expect(wrapper.findComponent(BuilderPizzaView).exists()).toBeTruthy();
  });
});
