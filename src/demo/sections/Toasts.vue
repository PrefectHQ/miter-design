<template>
  <div>
    <h3>Toasts</h3>
    <div class="my-2">
      <Button color="primary" @click="addToast">Add toast</Button>
      <Button @click="removeToasts">Remove toasts</Button>
      <Toast />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from '@/components/Toast/Toast.vue'
import { NodeInstance } from '@/plugins/Toast/main'

export default defineComponent({
  name: 'Toasts',
  components: { Toast },
  data() {
    return {
      toasts: [] as Array<NodeInstance>
    }
  },
  methods: {
    addToast() {
      this.toasts.push(this.$toast.add('some text'))
    },
    removeToasts() {
      this.toasts.forEach((toast) => toast.destroy())
    }
  }
})
</script>

<style lang="scss" scoped></style>
