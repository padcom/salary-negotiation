import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import SalaryEditor from '@/components/SalaryEditor.vue';

function mountTestSalaryEditor(value) {
  return shallowMount(SalaryEditor, {
    propsData: { value },
  });
}

describe('SalaryEditor', () => {
  it('will have the submit button disabled if no input is given', () => {
    const wrapper = mountTestSalaryEditor('');
    const submit = wrapper.find('.salary-editor__submit');
    expect(submit.attributes().disabled).toEqual('disabled');
  });

  it('will have the submit button enabled if input is given', () => {
    const wrapper = mountTestSalaryEditor(123);
    const submit = wrapper.find('.salary-editor__submit');
    expect(submit.attributes().disabled).toBeUndefined();
  });

  it('will emit input event with new value when submit is clicked', async () => {
    const wrapper = mountTestSalaryEditor(123);
    const input = wrapper.find('.salary-editor__expectation');
    const submit = wrapper.find('.salary-editor__submit');

    input.setValue(333);
    submit.trigger('click');
    await Vue.nextTick();

    expect(wrapper.emitted().input.length).toEqual(1);
    expect(wrapper.emitted().input[0][0]).toEqual(333);
  });
});
