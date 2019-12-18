import { shallowMount } from "@vue/test-utils";
import Ribbon from "@/components/Ribbon.vue";

describe('Ribbon', () => {
  it('should be VueInstance', () => {
    const wrapper = shallowMount(Ribbon, {
      propsData: {
        value: false,
        menu: [{name: 'NAME', label: 'LABEL'}]
      }
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });

});
