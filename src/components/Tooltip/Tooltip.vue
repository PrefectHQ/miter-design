<template>
  <div ref="trigger" v-bind="$attrs" @mouseover="mouseover" @mouseout="mouseout">
    <slot name="trigger" />
  </div>
  <teleport v-if="open" to="body">
    <MTooltipContent ref="tooltip" :placement="placement" :content="content" :style="styles.tooltip">
      <slot />
    </MTooltipContent>
  </teleport>
</template>

<script lang="ts">
import { nextTick } from 'vue'
import { Vue, prop } from 'vue-class-component'
import { Component } from '@/utilities/vue-class-component'
import { calculatePlacementPositionStyles, Placement, PlacementPositionStyles } from '@/utilities/position'
import MTooltipContent from './TooltipContent.vue'


class Props {
  placement = prop<Placement>({ default: 'top' })
  content = prop<string>({ required: false, default: '' })
}

@Component({
  name: 'MTooltip',
  components: {
    MTooltipContent
  }
})
export default class MTooltip extends Vue.with(Props) {

  $refs!: {
    trigger: HTMLDivElement
    tooltip: MTooltipContent
  }

  private open: boolean = false
  private position: PlacementPositionStyles = {
    left: '0px',
    top: '0px'
  }

  get closed() {
    return !this.open
  }

  get styles() {
    return {
      tooltip: this.position,
    }
  }

  private mouseover(event: MouseEvent) {
    if(this.open) {
      return
    }

    this.openTooltip()
  }

  private mouseout(event: MouseEvent) {
    if(this.closed) {
      return
    }

    this.closeTooltip()
  }

  public async openTooltip() {
    this.open = true

    await nextTick()

    this.position = calculatePlacementPositionStyles(this.placement, this.$refs.trigger, this.$refs.tooltip.$el)
  }

  public closeTooltip() {
    this.open = false
  }
}
</script>
