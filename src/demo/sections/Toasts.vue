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

      <div>
        <Checkbox v-model="dismissable">
          <span>Dismissable</span>
        </Checkbox>
      </div>

      <div class="my-2">
        <Input v-model="timeout" placeholder="Timeout" style="width: 300px" />
      </div>

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
  dismissable: boolean = true
  timeout: string | number = '5000'

  addToast() {
    this.toasts.push(
      this.$toast.add({
        component: this.content == 'component' ? ToastComponentExample : null,
        content: new Date().toString(),
        dismissable: this.dismissable,
        timeout: this.timeout
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
