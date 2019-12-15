import { shallowMount } from '@vue/test-utils';
import ControlBox from "@/components/ControlBox.vue"
import FontNameSelector from "@/components/FontNameSelector.vue"

describe('FontNameSelector', () => {
  it('is a vue instance', () => {
    const wrapper = shallowMount(FontNameSelector);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('should pick a font by default', () => {
    const wrapper = shallowMount(FontNameSelector);
    expect((<HTMLSelectElement>wrapper.element).value).toBeTruthy();
  })

  it('should set the font family form props', () => {
    const wrapper = shallowMount(FontNameSelector, {
      propsData: {
        value: 'Sans'
      }
    });
    expect((<HTMLSelectElement>wrapper.element).value).toBe('Sans');
  })

  it('should emit change when value changes', () => {
    const wrapper = shallowMount(FontNameSelector);
    wrapper.setValue('Courier')
    expect(wrapper.emitted().change).toEqual([['Courier']])
  })

});
