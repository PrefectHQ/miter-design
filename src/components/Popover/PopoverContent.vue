<template>
    <div class="popover-content">
      <div class="popover-content__body" :class="classes.body">
        <header class="popover__header" v-if="title.length || $slots.header">
        <slot name="header">
          {{ title }}
        </slot>
      </header>
      <section class="popover__body">
        <slot />
      </section>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { Component } from '@/utilities/vue-class-component'
import { Placement } from '@/utilities/position'
import { snakeCase } from '@/utilities/strings'

class Props {
  placement = prop<Placement>({ default: 'top' })
  title = prop<string>({ required: false, default: '' })
}

@Component({})
export default class PopoverContent extends Vue.with(Props) {

  get classes() {
    return {
      body: `popover-content__body--arrow-${snakeCase(this.placement)}`
    }
  }

}
</script>

<style lang="scss" scoped>
@use '../../styles/components/popover';
</style>
