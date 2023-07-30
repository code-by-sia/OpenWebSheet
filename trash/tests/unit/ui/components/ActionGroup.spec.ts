import { shallowMount } from '@vue/test-utils';
import ActionGroup from '@/components/ActionGroup.vue';

describe('ActionGroup', () => {
  it('is a vue instance', () => {
    const wrapper = shallowMount(ActionGroup, {
      propsData: {
        value: [],
      },
    });
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.find('[data-qa=action-group]').exists()).toBe(true);
  });

  it('should renders actions properly', () => {
    const wrapper = shallowMount(ActionGroup, {
      propsData: {
        value: [
          {name: 'A', label: 'A'},
          {name: 'B', label: 'B', disabled: true},
          {name: 'C', label: 'C', selected: true},
        ],
      },
    });

    expect(wrapper.findAll('[data-qa=action-item]').length).toBe(3);

    const wrapperA = wrapper.find('[data-qa=action-item][data-qa-name=A]');
    const wrapperB = wrapper.find('[data-qa=action-item][data-qa-name=B]');
    const wrapperC = wrapper.find('[data-qa=action-item][data-qa-name=C]');

    expect(wrapperA.exists()).toBe(true);
    expect(wrapperA.text()).toBe('A');
    expect(wrapperA.attributes('disabled')).toBeFalsy();
    expect(wrapperA.classes('on')).toBeFalsy();

    expect(wrapperB.exists()).toBe(true);
    expect(wrapperB.text()).toBe('B');
    expect(wrapperB.attributes('disabled')).toBeTruthy();
    expect(wrapperB.classes('on')).toBeFalsy();

    expect(wrapperC.exists()).toBe(true);
    expect(wrapperC.text()).toBe('C');
    expect(wrapperC.attributes('disabled')).toBeFalsy();
    expect(wrapperC.classes('on')).toBeTruthy();
  });

  it('should render actions slot based on the action name', () => {
    const wrapper = shallowMount(ActionGroup, {
      propsData: {
        value: [
          {name: 'A', label: 'A'},
          {name: 'B', label: 'B'},
        ],
      },
      slots: {
        A: '[A]',
      },
    });

    expect(wrapper.findAll('[data-qa=action-item]').length).toBe(2);
    expect(wrapper.find('[data-qa=action-item][data-qa-name=A]').text()).toBe('[A]');
    expect(wrapper.find('[data-qa=action-item][data-qa-name=B]').text()).toBe('B');
  });


});
