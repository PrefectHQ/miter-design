<template>
  <div class="card-aside" :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  width = prop<string>({ default: null })
}

@Options({
  name: 'MCardAside'
})
export default class MCardAside extends Vue.with(Props) {
  get style(): { [key: string]: any } {
    return {
      width: this.width
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../../styles/components/card-aside';
</style>
