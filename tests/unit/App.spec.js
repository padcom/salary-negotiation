import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App', () => {
  it('will initially show employee tabs', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.vm.currentTab).toMatch('employee');
    expect(wrapper.find('.employee-tab').isVisible()).toBeTruthy();
    expect(wrapper.find('.employer-tab').exists()).toBeFalsy();
  });
  it('will show employer tab when requested', async () => {
    const wrapper = shallowMount(App);
    wrapper.find('.employer-tab-actuator').trigger('click');
    await Vue.nextTick();
    expect(wrapper.vm.currentTab).toMatch('employer');
    expect(wrapper.find('.employee-tab').exists()).toBeFalsy();
    expect(wrapper.find('.employer-tab').isVisible()).toBeTruthy();
  });
  it('will show employee tab after switching through employer tab', async () => {
    const wrapper = shallowMount(App);
    wrapper.find('.employer-tab-actuator').trigger('click');
    wrapper.find('.employee-tab-actuator').trigger('click');
    await Vue.nextTick();
    expect(wrapper.find('.employee-tab').isVisible()).toBeTruthy();
    expect(wrapper.find('.employer-tab').exists()).toBeFalsy();
  });

  [
    { employee: 122, employer: 122, success: true },
    { employee: 121, employer: 122, success: true },
    { employee: 122, employer: 121, success: false },
  ]
    .forEach(({ employee, employer, success }) => {
      it(`will calculate if negotiation was successfull (employee: ${employee}, employer: ${employer}, success: ${success})`, () => {
        const wrapper = shallowMount(App);
        wrapper.vm.employeeSalaryExpectation = employee;
        wrapper.vm.employerSalaryExpectation = employer;
        expect(wrapper.vm.success).toEqual(success);
      });
    });

  [
    { employee: true, employer: true, result: true },
    { employee: true, employer: false, result: false },
    { employee: false, employer: true, result: false },
    { employee: false, employer: false, result: false },
  ]
    .forEach(({ employee, employer, result }) => {
      it(`will know when both answers have been submitted (employee: ${employee}, employer: ${employer}, result: ${result}`, () => {
        const wrapper = shallowMount(App);
        wrapper.vm.employeeSubmitted = employee;
        wrapper.vm.employerSubmitted = employer;
        expect(wrapper.vm.bothAnswersSubmitted).toBe(result);
      });
    });
});
