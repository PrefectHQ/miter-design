<template>
  <code class="code">
    <div class="code__copy-button-wrapper">
      <Button
        v-if="!hideCopyButton"
        class="code__copy-button"
        height="36px"
        icon="pi pi-file-copy-line"
        color="primary"
        @click="copy"
      >Copy</Button>
    </div>

    <div class="code__file-name">
      <slot name="file-name" />
    </div>
    <div class="code__content">
      <slot />
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
  showToast('Copied!', 'success')
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/code';
</style>

<style lang="scss">
@use '@/styles/abstracts/variables';

.code {
  &__content {
    pre {
      font-family: variables.$font--secondary !important;
    }
  }
}
</style>
