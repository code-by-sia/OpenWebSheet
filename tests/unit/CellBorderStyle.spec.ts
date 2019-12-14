import { shallowMount } from '@vue/test-utils';
import CellBorderStyle from "@/components/CellBorderStyle.vue"

describe('CellBorderStyle', () => {
  it('is a vue instance', () => {
    const wrapper = shallowMount(CellBorderStyle, {
      propsData: {
        value: []
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.find('[data-qa=cell-border]').exists()).toBe(true)
  });

  test('click on full emits change for full-border', () => {
    const wrapper = shallowMount(CellBorderStyle)
    wrapper.find('[data-qa=cell-border]').find('[data-qa=full]').trigger('click');
    expect(wrapper.emitted('change')).toEqual([['full-border']]);
  })

  test('click on cross emits change for cross-border', () => {
    const wrapper = shallowMount(CellBorderStyle)
    wrapper.find('[data-qa=cell-border]').find('[data-qa=cross]').trigger('click');
    expect(wrapper.emitted('change')).toEqual([['cross-border']]);
  })

  test('click on horizontal emits change for horizontal-border', () => {
    const wrapper = shallowMount(CellBorderStyle)
    wrapper.find('[data-qa=cell-border]').find('[data-qa=hor]').trigger('click');
    expect(wrapper.emitted('change')).toEqual([['horizontal-border']]);
  })

  test('click on vertical emits change for vertical-border', () => {
    const wrapper = shallowMount(CellBorderStyle)
    wrapper.find('[data-qa=cell-border]').find('[data-qa=ver]').trigger('click');
    expect(wrapper.emitted('change')).toEqual([['vertical-border']]);
  })

  test('click on left emits change for left-border', () => {
    const wrapper = shallowMount(CellBorderStyle)
    wrapper.find('[data-qa=cell-border]').find('[data-qa=left]').trigger('click');
    expect(wrapper.emitted('change')).toEqual([['left-border']]);
  })

  test('click on top emits change for top-border', () => {
    const wrapper = shallowMount(CellBorderStyle)
    wrapper.find('[data-qa=cell-border]').find('[data-qa=top]').trigger('click');
    expect(wrapper.emitted('change')).toEqual([['top-border']]);
  })

  test('click on right emits change for right-border', () => {
    const wrapper = shallowMount(CellBorderStyle)
    wrapper.find('[data-qa=cell-border]').find('[data-qa=right]').trigger('click');
    expect(wrapper.emitted('change')).toEqual([['right-border']]);
  })

  test('click on bottom emits change for bottom-border', () => {
    const wrapper = shallowMount(CellBorderStyle)
    wrapper.find('[data-qa=cell-border]').find('[data-qa=bottom]').trigger('click');
    expect(wrapper.emitted('change')).toEqual([['bottom-border']]);
  })

});
