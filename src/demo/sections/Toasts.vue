<template>
  <div>
    <h3>Toasts</h3>
    <div class="my-2">
      <Button color="primary" @click="addToast">Add toast</Button>
      <Button @click="removeToast">Remove toast</Button>
      <Toast />
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
    return {}
  },
  methods: {
    addToast() {
      console.log()
      console.log(this.$toast.add('some text'))
    },
    removeToast() {
      this.$toast.remove('1')
    }
  }
})
</script>

<style lang="scss" scoped></style>
