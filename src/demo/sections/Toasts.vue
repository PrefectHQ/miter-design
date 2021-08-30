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
import { defineComponent } from 'vue'
import Toast from '@/components/Toast/Toast.vue'

export default defineComponent({
  name: 'Toasts',
  components: { Toast },
  data() {
    return {
      toasts: [] as Array<typeof Toast>
    }
  },
  methods: {
    addToast() {
      this.toasts.push(this.$toast.add(new Date().toString()))
    },
    removeToasts() {
      this.toasts.forEach((toast) => {
        console.log(toast)
        toast.destroy()
      })
      this.toasts = []
    }
  }
})
</script>

<style lang="scss" scoped></style>
