<template>
  <div class="popover">
    <div ref="trigger" class="popover__target">
      <slot name="trigger" v-bind="scope" />
    </div>
    <teleport v-if="open" :to="to">
      <PopoverContent>
          <div
            tabindex="0"
            class="popover__container"
            ref="popover"
            :style="styles.popover"
            data-test="container"
            @focusout="focusout"
            @keydown="keydown"
          >
            <div class="popover__content">
              <header class="popover__header">
                <slot name="header" v-bind="scope">
                  {{ title }}
                </slot>
              </header>
              <section class="popover__body">
                <slot v-bind="scope"></slot>
              </section>
            </div>
            <div class="popover__arrow" data-test="arrow" :class="classes.arrow"></div>
          </div>
      </PopoverContent>
    </teleport>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { Component } from '../../utilities/vue-class-component'
import { getFirstTabbableElement, getLastTabbableElement } from '../../utilities/dom'
import PopoverContent from './PopoverContent.vue'
import { calculatePopoverPosition, PopoverPlacement, PopoverPositionStyles } from './getPosition'

class Props {
  position = prop<PopoverPlacement>({ required: true, default: 'top' })
  title = prop<string>({ required: false, default: '' })
  to = prop<string>({ required: false, default: 'body' })
}

@Component({
  emits: ['open'],
  components: {
    PopoverContent
  }
})
export default class Popover extends Vue.with(Props) {
  
  $refs!: {
    popover: HTMLDivElement,
    trigger: HTMLDivElement
  }

  private open: boolean = false;
  private popoverPositionStyles: PopoverPositionStyles = {}

  private scope = {
    toggle: () => this.togglePopover(),
    open: () => this.openPopover(),
    close: () => this.closePopover()
  }

  get classes() {
    return {
      arrow: `popover__arrow--${this.position}`
    }
  }

  get styles() {
    return {
      popover: this.popoverPositionStyles
    } 
  }

  public created() {
    this.watchOpen()
  }

  public togglePopover() {
    this.open = !this.open
  }

  public openPopover() {
    this.open = true
  }

  public closePopover() {
    this.open = false
  }

  private focustrigger() {
    const tabbable = getFirstTabbableElement(this.$refs.trigger)

    if(tabbable) {
      tabbable.focus()
    } else {
      this.$refs.trigger.focus()
    }
  }

  private focusPopover(): Promise<void> {
    return this.$nextTick(() => {
        this.$refs.popover.focus()
    })
  }

  private calculatePopoverPosition(): Promise<void> {
    return this.$nextTick(() => {
      this.popoverPositionStyles = calculatePopoverPosition(this.position, this.$refs.trigger, this.$refs.popover);
    })
  }

  private focusout(event: FocusEvent) {
    const related = event.relatedTarget as HTMLElement

    if(!this.$refs.popover.contains(related)) {
      this.closePopover()
      this.focustrigger()
    }
  }

  private keydown(event: KeyboardEvent) {
    switch(event.key) {
      case 'Escape':
        return this.escape(event)
      case 'Tab':
        return this.tab(event)
    }
  }

  private escape(event: KeyboardEvent) {
      this.closePopover()
      this.focustrigger()
  }

  private tab(event: KeyboardEvent) {
    const first = getFirstTabbableElement(this.$refs.popover)
    const last = getLastTabbableElement(this.$refs.popover)
    
    if(event.target == first && event.shiftKey || event.target == last) {
      event.preventDefault()

      this.closePopover()
      this.focustrigger()
    }
  }

  private watchOpen() {
    this.$watch(() => this.open, async (open: boolean) => {
      if(open) {
        await this.calculatePopoverPosition()
        await this.focusPopover()
      }

      this.$emit('open', open)
    })
  }

}
</script>

<style lang="scss" scoped>
@use '../../styles/components/popover';
</style>
