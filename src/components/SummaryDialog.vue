<template>
  <dialog class="summary-dialog" ref="dialog">
    <div class="summary-dialog__body">
      <div class="summary-dialog__message">{{ result }}</div>
      <div class="summary-dialog__information">
        <p>Minimum offer was: {{ expectation }}</p>
        <p>Maximum expected salary was: {{ offer }}</p>
      </div>
      <button class="summary-dialog__close-button" @click="close">OK</button>
      <div class="summary-dialog__temperature" v-if="temperature !== null">
        By the way, the current temperature in London is {{ temperature }}&deg;C
      </div>
    </div>
  </dialog>
</template>

<script>
import Vue from 'vue';

import WeatherService from '../services/WeatherService';

export default Vue.extend({
  props: {
    expectation: { type: [Number, String], required: true },
    offer: { type: [Number, String], required: true },
    result: { type: String, required: true },
  },
  data() {
    return {
      temperature: null,
    };
  },
  async mounted() {
    this.temperature = await this.fetchLondonTemperature();
  },
  methods: {
    async fetchLondonTemperature() {
      return new WeatherService().getTemperatureForCity('London, uk');
    },
    async showModal() {
      return new Promise((resolve) => {
        this.$refs.dialog.addEventListener('close', resolve, { once: true });
        this.$refs.dialog.showModal();
      });
    },
    close() {
      this.$refs.dialog.close();
    },
  },
});
</script>

<style lang="scss">
.summary-dialog {
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
  &__close-button {
    padding: 5px 40px;
  }
  &__temperature {
    font-style: italic;
  }
}
</style>
