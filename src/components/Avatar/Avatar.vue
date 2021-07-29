<template>
  <div class="avatar" :class="classList">
    <div data-test="default">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  color = prop<string>({ default: 'primary' })
}

@Options({})
export default class Avatar extends Vue.with(Props) {
  get classList() {
    return this.color
  }

  mounted(): void {
    return
  }
}
</script>

<style lang="scss">
@use '../../styles/components/avatar';
</style>
