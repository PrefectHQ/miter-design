<template>
    <div class="popover__content" :class="classes.popover" data-test="container">
      <header class="popover__header" v-if="title.length || $slots.header">
        <slot name="header">
          {{ title }}
        </slot>
      </header>
      <section class="popover__body">
        <slot />
      </section>
    </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { PopoverPlacement } from './getPosition'

class Props {
  position = prop<PopoverPlacement>({ default: 'top' })
  title = prop<string>({ required: false, default: '' })
}

export default class Popover extends Vue.with(Props) {

  get classes() {
    return {
      popover: `popover__content--arrow-${this.position}`
    }
  }

}
</script>

<style lang="scss" scoped>
@use '../../styles/components/popover';
</style>
