<template>
  <div>
    <h3>Toasts</h3>
    <div class="my-2">
      <Button color="primary" @click="addToast">Add toast</Button>
      <Button @click="removeToasts">Remove toasts</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import Toast from '@/components/Toast/Toast.vue'

@Options({
  components: {
    Toast
  }
})
export default class Toasts extends Vue {
  toasts: any[] = []

  addToast() {
    this.toasts.push(this.$toast.add({ content: new Date().toString() }))
  }

  removeToasts() {
    this.toasts.forEach((toast) => {
      toast.destroy()
    })
    this.toasts = []
  }
}
</script>

<style lang="scss" scoped></style>
