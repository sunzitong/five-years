import { Wrapper, createLocalVue, shallowMount } from "@vue/test-utils";
import vant from "vant";
import App from "@/App.vue";
import AppLoading from "@/components/AppLoading.vue";

const localVue = createLocalVue();
localVue.use(vant);

describe("App.vue", () => {
  let wrapper: Wrapper<Vue>;
  beforeEach(() => {
    wrapper = shallowMount(App, {
      localVue,
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("正确渲染", () => {
    //
  });
});
