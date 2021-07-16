<template>
  <label class="checkbox ml-2" :class="classList" :disabled="disabled">
    <input type="checkbox" :disabled="disabled" />
    <span class="box"><i class="material-icons">done</i></span>
    <span data-test="default"><slot /></span>
  </label>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { computed } from 'vue'

class Props {
  disabled = prop<boolean>({ default: false })
}

@Options({})
export default class Checkbox extends Vue.with(Props) {
  classList = computed(() => {
    return [...(this.disabled ? ['disabled'] : [])]
  })

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/checkbox';
</style>
