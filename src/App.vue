<template>
  <div id="app">
    <div class="actuators">
      <button
        @click="showEmployeeTab"
        :class="[ 'actuator', 'employee-tab-actuator', {
          'actuator--active': currentTab === 'employee',
          'actuator--inactive': currentTab !== 'employee',
        } ]">
        Employee
      </button>
      <button
        @click="showEmployerTab"
        :class="[ 'actuator', 'employer-tab-actuator', {
          'actuator--active': currentTab === 'employer',
          'actuator--inactive': currentTab !== 'employer',
        } ]">
        Employer
      </button>
    </div>
    <div class="tabs">
      <div class="tab employee-tab" v-if="currentTab === 'employee'">
        <input v-if="!employeeSubmitted"
          type="number" class="expectation" min="1" placeholder="Enter minumum offer"
          v-model.number="employeeSalaryExpectation" />
        <button v-if="!employeeSubmitted" class="tab__submit"
          @click="submitEmployeeSalary"
          :disabled="employeeSalaryExpectation === ''"
        >
          Submit
        </button>
      </div>
      <div class="tab employer-tab" v-if="currentTab === 'employer'">
        <input v-if="!employerSubmitted"
          type="number" class="expectation" min="1" placeholder="Enter maximum offer"
          v-model.number="employerSalaryExpectation" />
        <button v-if="!employerSubmitted" class="tab__submit"
          @click="submitEmployerSalary"
          :disabled="employerSalaryExpectation === ''"
        >
          Submit
        </button>
      </div>
    </div>
    <dialog class="result" ref="dialog">
      <div class="result__body">
        <div class="result__message">{{ result }}</div>
        <div class="result__information">
          <p>Minimum offer was: {{employeeSalaryExpectation}}</p>
          <p>Maximum expected salary was: {{employerSalaryExpectation}}</p>
        </div>
        <button class="result__close" @click="closeDialog">OK</button>
        <div class="result__temperature">
          By the way, the current temperature in London is {{ temperature }}&deg;C
        </div>
      </div>
    </dialog>
  </div>
</template>

<script>
import Vue from 'vue';

import WeatherService from './services/WeatherService';

export default Vue.extend({
  name: 'App',
  components: {
  },
  data() {
    return {
      currentTab: 'employee',
      employeeSubmitted: false,
      employeeSalaryExpectation: '',
      employerSubmitted: false,
      employerSalaryExpectation: '',
      result: '',
      temperature: 0,
    };
  },
  methods: {
    showEmployeeTab() {
      this.currentTab = 'employee';
    },
    showEmployerTab() {
      this.currentTab = 'employer';
    },
    submitEmployeeSalary() {
      this.employeeSubmitted = true;
      this.displayResult();
    },
    submitEmployerSalary() {
      this.employerSubmitted = true;
      this.displayResult();
    },
    async fetchLondonTemperature() {
      return new WeatherService().getTemperatureForCity('London, uk');
    },
    async displayResult() {
      if (this.bothAnswersSubmitted) {
        this.temperature = await this.fetchLondonTemperature();
        this.result = this.success ? 'Success!' : 'Failure';
        this.$refs.dialog.showModal();
      }
    },
    closeDialog() {
      this.$refs.dialog.close();
    },
  },
  computed: {
    bothAnswersSubmitted() {
      return this.employeeSubmitted && this.employerSubmitted;
    },
    success() {
      return this.employeeSalaryExpectation <= this.employerSalaryExpectation;
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
.actuators {
  margin: 0;
  display: flex;
  justify-content: space-between;
}
.actuator {
  // margin-right: 5px;
  width: 49.9%;
  background-color: lightgray;
  color: black;
  outline: none;
  border: solid 1px black;
  padding: 10px;
  text-transform: uppercase;

  &--active {
    background-color: darkcyan;
    color: wheat;
    font-weight: bold;
  }
  &--inactive {
    cursor: pointer;
  }
}
.tabs {
  background-color: wheat;
  border: solid 1px gray;
  border-top: none;
}
.tab {
  padding: 10px;
  display: flex;
  height: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__submit {
    padding: 5px 20px;
  }
}
input.expectation {
  width: 300px;
  text-align: center;
  margin-bottom: 10px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.result {
  padding: 10px 50px;
  &__body {
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  &__message {
    font-weight: bold;
    text-transform: uppercase;
  }
  &__information > p {
    margin: 2px;
  }
  &__close {
    padding: 5px 40px;
  }
  &__temperature {
    font-style: italic;
  }
}
</style>
