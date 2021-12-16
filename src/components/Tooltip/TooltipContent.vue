<template>
    <div ref="tooltip" class="tooltip" :class="classes.tooltip">
      <div class="tooltip__content">
        <slot>
          {{ content }}
        </slot>
      </div>
    </div>
</template>

<script lang="ts">
import { Placement } from '../../utilities/position'
import { Vue, prop } from 'vue-class-component'
import { Component } from '@/utilities/vue-class-component'

class Props {
  placement = prop<Placement>({ default: 'top' })
  content = prop<string>({ required: false, default: '' })
}

@Component({})
export default class TooltipContent extends Vue.with(Props) {

  get classes() {
    return {
      tooltip: `tooltip--${this.placement}`
    }
  }

}
</script>

<style lang="scss" scoped>
@use '../../styles/components/tooltip';
</style>