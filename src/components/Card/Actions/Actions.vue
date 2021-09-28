<template>
  <div class="card-actions" :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  height = prop<string>({ default: null })
}

@Options({})
export default class CardActions extends Vue.with(Props) {
  get style(): { [key: string]: any } {
    return {
      height: this.height
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../../styles/components/card-actions';
</style>
