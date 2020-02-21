<template>
  <div class="tabs">
    <div class="tabs__actuators">
      <button v-for="tab in tabs" :key="tab.id"
        @click="activateTab(tab.id)"
        :class="[ 'tabs__actuator', `tabs__actuator-${tab.id}`, {
          'tabs__actuator--active': currentTab === tab.id,
          'tabs__actuator--inactive': currentTab !== tab.id,
        } ]">
        {{ tab.caption }}
      </button>
    </div>
    <div ref="content" class="tabs__content">
      <slot :name="currentTab">Empty</slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

// For the purposes of this application it is not necessary
// neither propagate not set the current tab from outside.
// Therefore there's no v-model support in this component.

export default Vue.extend({
  name: 'Tabs',
  props: {
    tabs: { type: Array, require: true },
  },
  data() {
    return {
      currentTab: this.tabs.length > 0 ? this.tabs[0].id : '',
    };
  },
  mounted() {
    this.activateFirstFoundInputInContent();
  },
  methods: {
    activateFirstFoundInputInContent() {
      const input = this.$refs.content.querySelector('input');
      if (input) {
        input.focus();
      }
    },
    async activateTab(id) {
      this.currentTab = id;
      await Vue.nextTick();
      this.activateFirstFoundInputInContent();
    },
  },
});
</script>

<style lang="scss">
.tabs {
  &__actuators {
    margin: 0;
    display: flex;
    justify-content: space-between;
  }
  &__actuator {
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
}
</style>
