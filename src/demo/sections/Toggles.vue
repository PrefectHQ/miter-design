<template>
  <div>
    <h3>Toggle Switches</h3>

    <h5 class="mt-5">Toggle</h5>
    <div v-for="state in states" :key="state" class="my-2">
      <span class="font-weight-light text-capitalize">{{ state.state }}:</span>
      <ToggleSwitch
        :disabled="state.state == 'disabled'"
        v-model="state.checked"
      >
        <span>Label</span>
      </ToggleSwitch>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ToggleSwitch from '@/components/Toggle/ToggleSwitch.vue'

export default defineComponent({
  name: 'Toggles',
  components: { ToggleSwitch },
  data() {
    return {
      states: [
        { state: 'enabled', checked: false },
        { state: 'disabled', checked: false }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/toggle';
</style>
