<template>
  <div>
    <h3>Text Areas</h3>

    <div v-for="state in states" :key="state" class="my-2 d-flex">
      <span class="font-weight-light text-capitalize">{{ state.state }}:</span>
      <TextArea :disabled="state.state == 'disabled'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TextArea from '@/components/TextArea/TextArea.vue'

export default defineComponent({
  name: 'TextAreas',
  components: { TextArea },
  data() {
    return {
      states: [{ state: 'enabled' }, { state: 'disabled' }]
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/textarea';
</style>
