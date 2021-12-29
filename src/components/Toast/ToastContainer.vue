<template>
  <div ref="container" class="toast-container">
    <transition-group name="slide" mode="out-in" appear>
      <Toast
        v-for="[key, toast] in toasts"
        :key="key"
        v-bind="toast.props"
        @close="remove(key)"
      >
        <component v-if="toast.props.component" :is="toast.props.component" />
        <template v-else>
          {{ toast.props.content }}
        </template>
      </Toast>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { ref, h } from 'vue'
import Toast from './Toast.vue'

@Options({
  name: 'MToastContainer',
  components: {
    Toast
  }
})
export default class MToastContainer extends Vue {
  container = ref<HTMLElement>() as unknown as HTMLElement
  toasts: Map<number, any> = new Map()

  add(options: any) {
    const index =
      this.toasts.size == 0 ? 0 : Math.max(...this.toasts.keys()) + 1
    this.toasts.set(index, {
      props: { ...options }
    })

    this.$nextTick(() => {
      this.container.scroll({
        top: this.container.scrollHeight,
        behavior: 'smooth'
      })
    })

    return () => this.remove(index)
  }

  remove(i: number) {
    this.toasts.delete(i)
  }

  removeAll() {
    this.toasts = new Map()
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/toast';
</style>
