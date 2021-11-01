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
        <SimpleSelect v-model="content" :options="['Text', 'Component']" />
      </div>

      <div class="my-2">
        Type:
        <SimpleSelect v-model="type" :options="['None', 'Error', 'Success']" />
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
  content: string = 'Text'
  dismissable: boolean = true
  timeout: string = '5000'
  showToast: boolean = true
  type: string = 'Success'

  addToast() {
    this.toasts.push(
      this.$toast.add({
        component:
          this.content == 'Component' ? ToastComponentExample : undefined,
        content: new Date().toString(),
        dismissable: this.dismissable,
        timeout: this.timeout ? parseInt(this.timeout) : undefined,
        type: this.type.toLowerCase()
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
