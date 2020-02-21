<template>
  <div id="app">
    <Tabs :tabs="[
      { id: 'employee', caption: 'Employee' },
      { id: 'employer', caption: 'Employer' },
    ]">
      <SalaryEditor slot="employee" key="employee"
        title="Enter minumum offer"
        v-model="employeeSalaryExpectation"
        :hide="employeeSubmitted"
        @input="submitEmployeeSalary"
      />
      <SalaryEditor slot="employer" key="employer"
        title="Enter maximum offer"
        v-model="employerSalaryExpectation"
        :hide="employerSubmitted"
        @input="submitEmployerSalary"
      />
    </Tabs>
    <SummaryDialog ref="dialog"
      :expectation="employeeSalaryExpectation"
      :offer="employerSalaryExpectation"
      :result="result"
    />
  </div>
</template>

<script>
import Vue from 'vue';

import Tabs from './components/Tabs.vue';
import SalaryEditor from './components/SalaryEditor.vue';
import SummaryDialog from './components/SummaryDialog.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Tabs,
    SalaryEditor,
    SummaryDialog,
  },
  data() {
    return {
      employeeSubmitted: false,
      employeeSalaryExpectation: '',
      employerSubmitted: false,
      employerSalaryExpectation: '',
    };
  },
  methods: {
    submitEmployeeSalary() {
      this.employeeSubmitted = true;
      this.displayResult();
    },
    submitEmployerSalary() {
      this.employerSubmitted = true;
      this.displayResult();
    },
    async displayResult() {
      if (this.bothAnswersSubmitted) {
        await this.$refs.dialog.showModal();
        this.clear();
      }
    },
    clear() {
      this.employeeSubmitted = false;
      this.employeeSalaryExpectation = '';
      this.employerSubmitted = false;
      this.employerSalaryExpectation = '';
    },
  },
  computed: {
    bothAnswersSubmitted() {
      return this.employeeSubmitted && this.employerSubmitted;
    },
    success() {
      return this.employeeSalaryExpectation <= this.employerSalaryExpectation;
    },
    result() {
      return this.success ? 'Success!' : 'Failure';
    },
  },
});
</script>

<style lang="scss">
body {
  display: grid;
  grid-template-areas: ". app .";
  margin: 0;
  height: 100vh;
}
#app {
  grid-area: app;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
