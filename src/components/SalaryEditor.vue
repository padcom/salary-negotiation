<template>
  <div class="salary-editor">
    <input v-if="!hide"
      class="salary-editor__expectation"
      type="number"
      min="1"
      :placeholder="title"
      v-model.number="current" />
    <button v-if="!hide"
      class="salary-editor__submit"
      @click="$emit('input', current)"
      :disabled="current === ''">
      Submit
    </button>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'SalaryEditor',
  props: {
    value: { type: [Number, String], required: true },
    title: { type: String, required: false, default: 'Enter salary' },
    hide: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      current: this.value,
    };
  },
  watch: {
    value(newValue) {
      this.current = newValue;
    },
  },
});
</script>

<style lang="scss">
.salary-editor {
  background-color: beige;
  border: solid 1px gray;
  border-top: none;

  padding: 10px;
  display: flex;
  height: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__expectation {
    text-align: center;
    margin-bottom: 10px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &__submit {
    padding: 5px 20px;
  }
}
</style>
