<template>
  <div>
    <h3>Buttons</h3>

    <div class="my-1 text--secondary">(hover for active)</div>

    <h5 class="mt-5">Block</h5>

    <Button class="my-4" @click="skeletonLoader = !skeletonLoader">
      Toggle loader
    </Button>

    <div v-for="state in states" :key="state" class="my-2">
      <span class="text-capitalize">{{ state }}:</span>
      <Button
        v-for="style in buttonStyles"
        v-skeleton="skeletonLoader"
        :key="style"
        class="ml-2"
        :color="style"
        :disabled="state == 'disabled'"
        @click="handleClick"
      >
        <span>{{ style }}</span>
      </Button>
    </div>

    <h5 class="mt-5">Icon</h5>
    <div v-for="state in states" :key="state" class="my-2">
      <span class="text-capitalize">{{ state }}:</span>
      <Button
        v-for="style in buttonStyles"
        :key="style"
        v-skeleton="skeletonLoader"
        class="ml-2"
        :color="style"
        :icon="true"
        :disabled="state == 'disabled'"
        @click="handleClick"
      >
        <i class="pi pi-fire-line pi-2x"></i>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Buttons extends Vue {
  states = ['default', 'disabled']

  buttonStyles = ['primary', 'secondary', 'outlined']
  fabStyles = ['primary', 'secondary', 'outlined']

  skeletonLoader = false

  mounted(): void {
    return
  }

  handleClick(): void {
    // eslint-disable-next-line no-console
    console.log('clicked!')
  }
}
</script>

<style lang="scss" scoped>
// @use '@/styles/components/button';
</style>
