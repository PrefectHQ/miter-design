<template>
  <div>
    <h3>Toasts</h3>
    <div class="my-2">
      <div>
        <Checkbox v-model="dismissable">
          <span>Dismissable</span>
        </Checkbox>
      </div>

      <div class="my-2">
        Inner:
        <Select v-model="content">
          <Option value="Text">Text</Option>
          <Option value="Component">Component</Option>
        </Select>
      </div>

      <div class="my-2">
        Type:
        <Select v-model="type">
          <Option>None</Option>
          <Option value="error">Error</Option>
          <Option value="success">Success</Option>
        </Select>
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
  timeout: string = '5000'
  showToast: boolean = true
  type: string = 'success'

  addToast() {
    this.toasts.push(
      this.$toast.add({
        component:
          this.content == 'Component' ? ToastComponentExample : undefined,
        content: new Date().toString(),
        dismissable: this.dismissable,
        timeout: this.timeout ? parseInt(this.timeout) : undefined,
        type: this.type
      })
    )
  }

  removeToasts() {
    this.toasts.forEach((toast) => {
      toast.remove()
    })

    // Either of these methods can be used to remove toasts
    // this.$toast.removeAll()
  }
}
</script>

<style lang="scss" scoped></style>
