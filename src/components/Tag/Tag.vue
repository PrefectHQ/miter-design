<template>
  <div class="tag" :class="classList">
    <div data-test="default">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  color = prop<string>({})
  outlined = prop<boolean>({ default: false })
  disabled = prop<boolean>({ default: false })
}

@Options({})
export default class Tag extends Vue.with(Props) {
  get classList() {
    return [
      ...(this.disabled ? ['disabled'] : []),
      ...(this.outlined ? ['outlined'] : []),
      this.color
    ]
  }

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/tag';
</style>
