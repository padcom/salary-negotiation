import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import Tabs from '@/components/Tabs.vue';

function mountTestTabs() {
  return shallowMount(Tabs, {
    propsData: {
      tabs: [
        { id: '1', caption: 'Caption 1' },
        { id: '2', caption: 'Caption 2' },
      ],
    },
    slots: {
      1: 'Tab 1',
      2: 'Tab 2',
    },
  });
}

describe('Tabs', () => {
  it('will have actuators for tabs', () => {
    const wrapper = mountTestTabs();
    const actuators = wrapper.findAll('.tabs__actuator');

    expect(actuators.length).toEqual(2);
    expect(actuators.at(0).text()).toEqual('Caption 1');
    expect(actuators.at(1).text()).toEqual('Caption 2');
  });

  it('will have first declared tab active by default', () => {
    const wrapper = mountTestTabs();
    const content = wrapper.find('.tabs__content');

    expect(wrapper.vm.currentTab).toEqual('1');
    expect(content.text()).toEqual('Tab 1');
  });

  it('will change active tab when actuator is clicked', async () => {
    const wrapper = mountTestTabs();
    const content = wrapper.find('.tabs__content');
    const actuators = wrapper.findAll('.tabs__actuator');

    actuators.at(1).trigger('click');
    await Vue.nextTick();

    expect(wrapper.vm.currentTab).toEqual('2');
    expect(content.text()).toEqual('Tab 2');
  });
});
