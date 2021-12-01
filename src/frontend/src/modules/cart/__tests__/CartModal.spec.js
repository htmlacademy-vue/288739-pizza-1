import { mount } from "@vue/test-utils";
import CartModal from "@/modules/cart/components/CartModal";

describe("CartModal", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartModal, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("emits close event on close button click", async () => {
    createComponent();

    const closeButton = wrapper.find('[data-test="modal-close-button"]');
    await closeButton.trigger("click");

    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("emits close event on ok button click", async () => {
    createComponent();

    const okButton = wrapper.find('[data-test="modal-ok-button"]');
    await okButton.trigger("click");

    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("emits close event on backdrop click", async () => {
    createComponent();

    const backdrop = wrapper.find('[data-test="modal-backdrop"]');
    await backdrop.trigger("click");

    expect(wrapper.emitted().close).toBeTruthy();
  });
});
