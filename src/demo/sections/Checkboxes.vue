<template>
  <div>
    <h3>Checkboxes</h3>

    <h5 class="mt-5">Checkbox</h5>
    <div v-for="state in states" :key="state" class="my-2">
      <span class="font-weight-light text-capitalize">{{ state }}:</span>
      <Checkbox :disabled="state == 'disabled'">
        <span>Label</span>
      </Checkbox>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Checkboxes extends Vue {
  states = ['enabled', 'disabled']

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/checkbox';
</style>
