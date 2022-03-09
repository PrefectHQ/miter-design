<template>
  <div class="toast-container">
    <transition-group name="toast-list">
      <div v-for="toast in queue" :key="toast.id" class="toast-container__toast">
        <Toast v-bind="toast" @close="toast.dismiss" />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import Toast from './Toast.vue'
import { queue } from '@/plugins/Toast'
</script>

<style lang="scss" scoped>
.toast-container {
  padding-right: 16px;
  display: flex;
  align-items: end;
  flex-direction: column-reverse;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: var(--layer-toasts, 500);
}

.toast-container__toast {
  padding-bottom: 16px;
}

.toast-list-enter-active {
  opacity: 0;
  transition: transform 0.75s, opacity 0.75s;
  transform: translateY(100%);
}

.toast-list-enter-active ~ .toast-container__toast {
  transition: transform 0.75s;
  transform: translateY(100%);
}

.toast-list-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.toast-list-enter-to ~ .toast-container__toast {
  transform: translateY(0);
}

.toast-list-leave-active {
  opacity: 1;
  transition: transform 0.75s, opacity 0.75s;
  transform: translateY(0);
}

.toast-list-leave-active ~ .toast-container__toast {
  transition: transform 0.75s;
  transform: translateY(0);
}

.toast-list-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.toast-list-leave-to ~ .toast-container__toast {
  transform: translateY(100%);
}
</style>
