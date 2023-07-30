import { shallowMount } from '@vue/test-utils';
import ActionButton from '@/components/ActionButton.vue';

describe('ActionButton', () => {
  it('is a vue instance', () => {
    const wrapper = shallowMount(ActionButton, {});
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('should renders empty button by default', () => {
    const wrapper = shallowMount(ActionButton, {});
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders label', () => {
    const wrapper = shallowMount(ActionButton, {
      propsData: {
        label: 'LABEL',
      },
    });
    expect(wrapper.find('[data-qa=action]').text()).toBe('LABEL');
    expect(wrapper.find('[data-qa=action]').attributes('disabled')).toBeFalsy();
  });

  it('should reflect disabled on the target button', () => {
    const wrapper = shallowMount(ActionButton, {
      propsData: {
        label: 'LABEL',
        disabled: true,
      },
    });
    expect(wrapper.find('[data-qa=action]').attributes('disabled')).toBeTruthy();
  });


  it('should uses default slot when it exists', () => {
    const wrapper = shallowMount(ActionButton, {
      slots: {
        default: '<strong data-qa="custom-slot">CUSTOM</strong>',
      },
    });

    expect(wrapper.find('[data-qa=custom-slot]').exists()).toBe(true);
    expect(wrapper.find('[data-qa=custom-slot]').text()).toBe('CUSTOM');
  });

  it('should append prefix and postfix slots', () => {
    const wrapper = shallowMount(ActionButton, {
      propsData: {
        label: 'LABEL',
      },
      slots: {
        prefix: '<strong data-qa="pre">[PRE]</strong>',
        postfix: '<strong data-qa="post">[POST]</strong>',
      },
    });

    expect(wrapper.find('[data-qa=pre]').exists()).toBe(true);
    expect(wrapper.find('[data-qa=post]').exists()).toBe(true);
    expect(wrapper.find('[data-qa=action]').text()).toMatchSnapshot();
  });

});
