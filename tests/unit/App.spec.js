import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App', () => {
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
