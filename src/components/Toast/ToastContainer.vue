<template>
  <div class="toast-container">
    <transition-group name="toast-list">
      <div
        v-for="toast in queue"
        :key="toast.id"
        class="toast-container__toast"
      >
        <Toast
          v-bind="toast"
          @close="toast.dismiss"
        />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import Toast from './Toast.vue'
import { queue } from '@/plugins/Toast/Toast'

@Options({
  name: 'MToastContainer',
  components: {
    Toast
  }
})
export default class MToastContainer extends Vue {
  queue = queue
}
</script>

<style lang="scss" scoped>
.toast-container {
  display: flex;
  align-items: end;
  flex-direction: column-reverse;
}

.toast-container__toast {
  padding-right: 16px;
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
.toast-list-enter-to ~ .toast-container__toast  {
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
.toast-list-leave-to ~ .toast-container__toast  {
  transform: translateY(100%);
}
</style>
