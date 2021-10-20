<template>
  <div class="popover">
    <div ref="trigger" class="popover__target">
      <slot name="trigger" v-bind="scope" />
    </div>
    <teleport v-if="open" :to="to">
      <PopoverContent>
          <div
            class="popover__content"
            :class="classes.popover"
            :style="styles.popover"
            ref="popover"
            data-test="container"
            @keydown="keydown"
          >
            <header class="popover__header" v-if="title.length || $slots.header">
              <slot name="header" v-bind="scope">
                {{ title }}
              </slot>
            </header>
            <section class="popover__body">
              <slot v-bind="scope"></slot>
            </section>
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
  position = prop<PopoverPlacement>({ default: 'top' })
  title = prop<string>({ required: false, default: '' })
  to = prop<string>({ required: false, default: 'body' })
}

@Component({
  emits: ['open'],
  name: 'Popover',
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
  private openedWithFocus: boolean = false;

  private scope = {
    toggle: (event?: Event) => this.togglePopover(event),
    open: (event?: Event) => this.openPopover(event),
    close: () => this.closePopover()
  }

  get classes() {
    return {
      popover: `popover__content--arrow-${this.position}`
    }
  }

  get styles() {
    return {
      popover: this.popoverPositionStyles
    } 
  }

  get closed() {
    return this.open == false
  }

  public created() {
    this.watchOpen()

    window.addEventListener('focusout', this.focusout)
  }

  public unmounted() {
    window.removeEventListener('focusout', this.focusout)
  }

  public togglePopover(event?: Event) {
    this.open ? this.closePopover() : this.openPopover(event)
  }

  public openPopover(event?: Event) {
    if(this.shouldSkipOpen(event)) {
      this.openedWithFocus = false
      return
    }

    this.handleOpenEvent(event)

    this.open = true
  }

  public closePopover() {
    this.open = false
  }

  private shouldSkipOpen(event?: Event): boolean {
    return this.openedWithFocus && event?.type == 'focus'
  }

  private handleOpenEvent(event?: Event) {
    this.openedWithFocus = event?.type == 'focus'
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
        const first = getFirstTabbableElement(this.$refs.popover)

        if(first) {
          first.focus()
        }
    })
  }

  private calculatePopoverPosition(): Promise<void> {
    return this.$nextTick(() => {
      this.popoverPositionStyles = calculatePopoverPosition(this.position, this.$refs.trigger, this.$refs.popover);
    })
  }

  private focusout(event: FocusEvent) {
    if(this.closed) {
      return
    }

    const related = event.relatedTarget as HTMLElement
    const inPopover = this.$refs.popover.contains(related)
    const inTrigger = this.$refs.trigger.contains(related)

    if(!inPopover) {
      this.closePopover()
    }

    if(!inTrigger && !inPopover) {
      this.openedWithFocus = false
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

    if(event.target == first && event.shiftKey || event.target == last && !event.shiftKey) {
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
