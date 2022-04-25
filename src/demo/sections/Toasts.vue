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
        Type:
        <SimpleSelect v-model="type" :options="availableTypes" />
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
import { Vue } from 'vue-class-component'
import { ToastType, Toast } from '@/plugins/Toast'

export default class Toasts extends Vue {
  toasts: Toast[] = []
  dismissable: boolean = true
  timeout: string = '5000'
  showToast: boolean = true
  type: ToastType = 'success'
  availableTypes: ToastType[] = [
    'default', 'success', 'error'
  ]

  addToast() {
    this.toasts.push(
      this.$toast({
        message: new Date().toString(),
        dismissable: this.dismissable,
        timeout: this.timeout ? parseInt(this.timeout) : undefined,
        type: this.type
      })
    )
  }

  removeToasts() {
    this.toasts.forEach(toast => {
      toast.dismiss()
    })
  }
}
</script>
