<template>
  <Card miter class="toast">
    <div class="toast--content d-flex align-center" :class="classList_">
      <i v-if="icon_" class="pi pi-2x mr-1" :class="icon_" />
      <slot>{{ message }}</slot>
      <IconButton
        v-if="dismissable"
        class="text--white ml-2 toast--close-button"
        icon="pi pi-lg pi-close-line"
        width="32px"
        height="32px"
        rounded
        flat
        @click="remove"
      />
    </div>
  </Card>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import Card from '@/components/Card/Card.vue'
import IconButton from '@/components/Button/IconButton.vue'

const iconMap: { [key: string]: string } = {
  success: 'pi-checkbox-circle-line',
  error: 'pi-error-warning-line'
}

const colorMap: { [key: string]: string } = {
  success: 'bg--success',
  error: 'bg--error'
}

class Props {
  classList = prop<[]>({ default: [], required: false })
  message = prop<string>({ required: false, default: '' })
  dismissable = prop<boolean>({ default: true, type: Boolean })
  icon = prop<string>({ default: null, required: false })
  timeout = prop<number>({ default: 3000, required: false })
  type = prop<string>({ required: false, default: null })
}

const Component = Options
@Component({
  name: 'MToast',
  components: {
    IconButton,
    Card
  }
})
export default class MToast extends Vue.with(Props) {
  timeout_: ReturnType<typeof setInterval> | null = null

  get classList_() {
    return [this.color, ...this.classList]
  }

  get icon_(): string {
    return this.icon ? this.icon : iconMap[this.type]
  }

  get color(): string {
    return colorMap[this.type]
  }

  remove() {
    this.$emit('close')
  }

  clearTimeout() {
    if (this.timeout_) {
      clearTimeout(this.timeout_)
    }
  }

  setTimeout() {
    this.clearTimeout()
    this.timeout_ = setTimeout(() => {
      this.remove()
    }, this.timeout)
  }

  mounted() {
    if (this.timeout) {
      this.setTimeout()
      this.$el.addEventListener('mouseenter', this.clearTimeout)
      this.$el.addEventListener('mouseleave', this.setTimeout)
    }
  }

  unmounted() {
    this.clearTimeout()
    this.$el.removeEventListener('mouseenter', this.clearTimeout)
    this.$el.removeEventListener('mouseleave', this.setTimeout)
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/toast';
</style>
