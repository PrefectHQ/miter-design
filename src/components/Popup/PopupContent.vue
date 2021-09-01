<template>
  <div>
    <div
      id="backdrop"
      class="modal-backdrop"
      @click.self="closePopUp"
      :style="position"
    >
      <Card :class="positionClass" :height="height" :width="width">
        <h4 class="h4-bottom">
          {{ title }}
          <button
            icon
            class="close-icon"
            :classes="classes"
            @click="closePopUp"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
            @mousedown="handleMouseDown"
            @mouseup="handleMouseUp"
            @keydown.enter.space="handleKeydown"
            @keyup.enter.space="handleKeyup"
            @focus="handleFocus"
            @blur="handleBlur"
          >
            <i class="pi pi-X"></i>
          </button>
        </h4>

        <div v-if="$slots.content">
          <slot name="content" />
        </div>
        <template v-slot:actions>
          <div v-if="$slots.actions">
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
    classes(): string[] {
      return [
        ...(this.active ? ['active'] : []),
        ...(this.hovered ? ['hovered'] : []),
        ...(this.focused ? ['focused'] : [])
      ]
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
  methods: {
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
    handleKeydown(): void {
      this.focused = true
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/popup';
@use '../../styles/components/card';
</style>
