<template>
  <div>
    <h3>Toasts</h3>
    <div class="my-2">
      <RadioButton
        v-model="content"
        class="my-2"
        name="button-group"
        value="component"
      >
        Component
      </RadioButton>

      <RadioButton
        v-model="content"
        class="my-2"
        name="button-group"
        value="text"
      >
        Text
      </RadioButton>

      <Button color="primary" @click="addToast">Add toast</Button>
      <Button class="ml-2" @click="removeToasts">Remove toasts</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import ToastComponentExample from './ToastComponentExample.vue'
import Toast from '@/components/Toast/Toast.vue'

@Options({
  components: {
    Toast
  }
})
export default class Toasts extends Vue {
  toasts: any[] = []
  content: string = 'text'

  addToast() {
    this.toasts.push(
      this.$toast.add({
        component: this.content == 'component' ? ToastComponentExample : null,
        content: new Date().toString(),
        dismissable: false
      })
    )
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
