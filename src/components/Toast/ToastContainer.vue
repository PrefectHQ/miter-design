<template>
  <div ref="container" class="toast-container">
    <!-- <Toast v-for="toast in toasts" :key="toast.id">
      {{ toast.text }}
    </Toast> -->
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { ref, defineAsyncComponent, defineComponent } from 'vue'

// @Options({
//   components: {
//     Toast: defineAsyncComponent(() => import('@/components/Toast/Toast.vue'))
//   }
// })

// export default defineComponent({
//   components: {
//     Toast: defineAsyncComponent(() => import('@/components/Toast/Toast.vue'))
//   },
//   data() {
//     return {
//       toasts: [] as { id: string; text: string }[]
//     }
//   },
//   methods: {
//     functionaddToast(toast: { id: string; text: string }) {
//       this.toasts.push(toast)
//     },
//     removeToast(id: string) {
//       this.toasts.splice(
//         this.toasts.findIndex((t) => t.id == id),
//         1
//       )
//     }
//   }
// })
export default class ToastContainer extends Vue {
  container = ref<HTMLElement>() as unknown as HTMLElement
  // const toasts: { id: string; text: string }[] = []

  //  functionaddToast(toast: { id: string; text: string }) {
  //   this.toasts.push(toast)
  // }

  //  removeToast(id: string) {
  //   this.toasts.splice(
  //     this.toasts.findIndex((t) => t.id == id),
  //     1
  //   )
  // }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/toast';
</style>
