<template>
  <div ref="container" class="toast-container">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { ref } from 'vue'

@Options({})
export default class ToastContainer extends Vue {
  container = ref<HTMLElement>() as unknown as HTMLElement
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/toast';
</style>
