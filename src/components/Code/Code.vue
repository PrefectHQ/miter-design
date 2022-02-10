<template>
  <code class="code">
    <div class="code__file-name">
      <slot name="file-name" />
    </div>
    <div class="code__content">
      <slot />

      <Button
        v-if="!hideCopyButton"
        class="code__copy-button"
        icon="pi pi-file-copy-line"
        color="primary"
        @click="copy"
      >Copy</Button>
    </div>
  </code>
</template>

<script lang="ts" setup>
import { showToast } from '@/plugins/Toast';
import { defineProps } from 'vue';
import Button from '../Button/Button.vue';


const props = defineProps<{
  hideCopyButton?: boolean,
  value?: string | (() => string)
}>()

const copy = async (): Promise<void> => {
  let value
  if (props.value) {
    if (typeof props.value == 'function') {
      value = props.value()
    } else {
      value = props.value
    }
  }

  if (!value) {
    throw new Error('Copy code button was enabled but no value was provided')
  }

  await navigator.clipboard.writeText(value)
  showToast({ message: 'Copied!', type: 'success', timeout: 3000 })
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/code';
</style>
