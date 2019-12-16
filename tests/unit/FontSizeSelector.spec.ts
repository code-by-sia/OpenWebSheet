import { shallowMount } from '@vue/test-utils';
import FontSizeSelector from "@/components/FontSizeSelector.vue";

describe('FontSizeSelector', () => {
  it('is a vue instance', () => {
    const wrapper = shallowMount(FontSizeSelector);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('should pick a size by default', () => {
    const wrapper = shallowMount(FontSizeSelector);
    expect((<HTMLSelectElement>wrapper.element).value).toBeTruthy();
  })

  it('should set the font size form props', () => {
    const wrapper = shallowMount(FontSizeSelector, {
      propsData: {
        value: 48
      }
    });
    expect((<HTMLSelectElement>wrapper.element).value).toBe('48');
  })

  it('should emit change when value changes', () => {
    const wrapper = shallowMount(FontSizeSelector);
    wrapper.setValue(14)
    expect(wrapper.emitted().change).toEqual([[14]])
  })

});
