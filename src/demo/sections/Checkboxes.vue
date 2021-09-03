<template>
  <div>
    <h3>Checkboxes</h3>

    <h5 class="mt-5">Checkbox</h5>
    <div v-for="state in states" :key="state" class="my-2">
      <span class="text-capitalize">{{ state.state }}:</span>
      <Checkbox :disabled="state.state == 'disabled'" v-model="state.checked">
        <span>Label</span>
      </Checkbox>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'

export default defineComponent({
  name: 'Checkboxes',
  components: { Checkbox },
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
@use '@/styles/components/checkbox';
</style>
