<template>
  <div>
    <div
      id="backdrop"
      @keydown="handleBackdropKeyDown"
      class="modal-backdrop"
      @click.self="closePopUp"
      :style="position"
    >
      <Card
        role="dialog"
        aria-modal="true"
        ref="popUpContent"
        class="popup"
        :class="positionClass"
        :height="height"
        :width="width"
      >
        <div class="pa-2">
          <h4 class="h4-bottom">
            {{ title }}
            <button
              icon
              data-test="closeButton"
              title="close pop up"
              ref="popUpCloseButton"
              class="close-icon"
              :class="classList"
              @click="closePopUp"
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @focus="handleFocus"
              @blur="handleBlur"
            >
              <i class="pi pi-cross-line"></i>
            </button>
          </h4>

          <div v-if="$slots.content">
            <slot name="content" />
          </div>
        </div>
        <template v-slot:actions>
          <div v-if="$slots.actions" class="pa-2">
            <slot name="actions" />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from '../Card/Card.vue'

interface event {
  value: string
  key: string
  shiftKey: string
  preventDefault: any
}

export default defineComponent({
  name: 'Popcontent',
  components: {
    Card
  },
  props: {
    modelValue: {
      type: Boolean,
      required: false
    },
    value: {
      type: Boolean,
      required: false
    },
    height: {
      type: String
    },
    width: {
      type: String
    },
    placement: {
      type: String,
      required: false,
      default: 'center'
    },
    title: {
      type: String,
      required: false
    },
    to: {
      type: String,
      default: 'body'
    }
  },
  emits: ['close'],
  data() {
    return {
      active: false as boolean,
      hovered: false as boolean,
      focused: false as boolean
    }
  },
  computed: {
    classList(): string[] {
      return this.active
        ? ['active']
        : this.hovered
        ? ['hovered']
        : this.focused
        ? ['focused']
        : []
    },
    position(): any {
      return {
        '--position-place': `${this.placement}`
      }
    },
    positionClass(): string {
      const pos =
        this.placement == 'flex-start'
          ? 'mt-4 ml-4'
          : this.placement == 'flex-end'
          ? 'mb-4 mr-4'
          : ''
      return pos
    },
    popupOpen(): boolean {
      return typeof this.modelValue === 'boolean' ? this.modelValue : this.value
    }
  },
  mounted() {
    this.addFocus()
  },
  methods: {
    addFocus() {
      this.hovered = true
      this.$nextTick(() => {
        if(this.$refs.popUpCloseButton) (this.$refs.popUpCloseButton as HTMLElement).tabIndex = 0
        (this.$refs.popUpCloseButton as HTMLElement).focus()
      })
    },
    closePopUp() {
      this.$emit('close', false)
    },
    handleMouseEnter(): void {
      this.hovered = true
    },
    handleMouseLeave(): void {
      this.hovered = false
      this.focused = false
    },
    handleFocus(): void {
      this.hovered = true
    },
    handleBlur(): void {
      this.hovered = false
      this.focused = false
    },
    handleBackdropKeyDown(evt: event): void {
      const modalNodes = this.$refs.popUpContent.$el.querySelectorAll('*')
      const tabbable = Array.from(modalNodes).filter(
        (n: any) => n.tabIndex >= 0
      )
      let index = tabbable.indexOf(document.activeElement)
      const parent = document.querySelector(this.to)
      const parentHidden = parent?.firstChild?.ariaHidden
      if (evt.key === 'Escape' || evt.key === 'escape') {
        // Pressing the ESC key resets ariaHidden and closes the modal.
        parent.firstChild.ariaHidden = parentHidden
        this.closePopUp()
      } else if (evt.key === 'Tab' || evt.key === 'tab') {
        document.querySelector(this.to)
        //set aria hidden on non-popup element
        parent.firstChild.ariaHidden = true
        // Pressing the Tab key traps the focus in the modal.
        index += tabbable.length + 1
        index %= tabbable.length
        tabbable[index].focus()
        evt.preventDefault()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/popup';
@use '../../styles/components/card';
</style>
