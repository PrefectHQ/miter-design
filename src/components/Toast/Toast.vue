<template>
  <div class="toast-wrapper" :class="classList">
    <div class="toast" data-test="default">
      <slot>Sample toast message</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  color = prop<string>({})
}

@Options({})
export default class Toast extends Vue.with(Props) {
  get classList() {
    return [this.color]
  }

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/toast';
</style>
