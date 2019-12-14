import { shallowMount } from '@vue/test-utils';
import ColorPicker from "@/components/ColorPicker.vue"

describe('ColorPicker', () => {
  it('is a vue instance', () => {
    const wrapper = shallowMount(ColorPicker)
    expect(wrapper.isVueInstance()).toBe(true)
  });

  it('should use white as default value', () => {
    const wrapper = shallowMount(ColorPicker)
    expect(wrapper.props('value')).toBe('#ffffff')
    expect(wrapper.props('label')).toBeUndefined()
  });

  it('should renders label', () => {
    const wrapper = shallowMount(ColorPicker, {
      propsData: {
        label: 'LABEL'
      }
    })
    expect(wrapper.find('[data-qa=label]').text()).toBe('LABEL')
  });

  it('should renders default slot when it is exits', () => {
    const wrapper = shallowMount(ColorPicker, {
      slots: {
        default: '[SLUG]'
      }
    })
    expect(wrapper.find('[data-qa=label]').text()).toBe('[SLUG]')
  });

  it('should renders pre/post slots when they are exits', () => {
    const wrapper = shallowMount(ColorPicker, {
      slots: {
        prefix: '[PRE]',
        postfix: '[POST]'
      },
      propsData: {
        label: 'LABEL'
      }
    })
    expect(wrapper.find('[data-qa=label]').text()).toMatchSnapshot()
  });

  it('should use the prop value for input value', () => {
    const wrapper = shallowMount(ColorPicker, {
      propsData: {
        value: '#00ff00'
      }
    })
    expect((<HTMLInputElement>wrapper.find('[data-qa=input-el]').element).value).toBe('#00ff00')
  });


  it('should use WHITE when the value is null', () => {
    const wrapper = shallowMount(ColorPicker, {
      propsData: {
        value: null
      }
    })
    expect((<HTMLInputElement>wrapper.find('[data-qa=input-el]').element).value).toBe('#ffffff')
  });


  it('should emit change when the color changes', () => {
    const wrapper = shallowMount(ColorPicker)
    wrapper.find('[data-qa=input-el]').setValue('#ff0000')
    expect(wrapper.emitted('input')).toEqual([['#ff0000']])
  });

});
