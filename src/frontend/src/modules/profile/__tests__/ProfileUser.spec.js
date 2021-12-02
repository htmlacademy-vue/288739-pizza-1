import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import userJson from "@/layouts/__tests__/fixtures/user.json";
import ProfileUser from "@/modules/profile/components/ProfileUser";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ProfileUser", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(ProfileUser, {
      ...options,
      localVue,
      store,
    });
  };

  const authenticateUser = () => {
    store.commit("Profile/SET_IS_AUTHENTICATED", true);
    store.commit("Profile/SET_USER", userJson);
  };

  beforeEach(() => {
    store = generateMockStore();
    authenticateUser();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders user image", () => {
    createComponent();

    const userImage = wrapper.find('[data-test="user-image"]');
    expect(userImage.attributes("src")).toBe(userJson.avatar);
    expect(userImage.attributes("alt")).toBe(userJson.name);
  });

  it("renders user name", () => {
    createComponent();

    const userName = wrapper.find('[data-test="user-name"]');
    expect(userName.text()).toBe(userJson.name);
  });

  it("renders user phone", () => {
    createComponent();

    const userPhone = wrapper.find('[data-test="user-phone"]');
    expect(userPhone.text()).toBe(userJson.phone);
  });
});
