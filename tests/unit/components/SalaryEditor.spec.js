import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import SalaryEditor from '@/components/SalaryEditor.vue';

describe('SalaryEditor', () => {
  it('will have the submit button disabled if no input is given', () => {
    const wrapper = shallowMount(SalaryEditor, {
      propsData: { value: '' },
    });
    const submit = wrapper.find('.salary-editor__submit');
    expect(submit.attributes().disabled).toEqual('disabled');
  });
  it('will have the submit button enabled if input is given', () => {
    const wrapper = shallowMount(SalaryEditor, {
      propsData: { value: 123 },
    });
    const submit = wrapper.find('.salary-editor__submit');
    expect(submit.attributes().disabled).toBeUndefined();
  });
  it('will emit input event when submit is clicked', async () => {
    const wrapper = shallowMount(SalaryEditor, {
      propsData: { value: 123 },
    });
    const submit = wrapper.find('.salary-editor__submit');

    submit.trigger('click');
    await Vue.nextTick();

    expect(wrapper.emitted().input.length).toEqual(1);
    expect(wrapper.emitted().input[0][0]).toEqual(123);
  });
});
