<template>
  <div class="modal-backdrop" @click.self="closePopUp" :style="position">
    <div v-if="$slots.content" :class="positionClass">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface event {
  target: {
    value: string
  }
}

export default defineComponent({
  name: 'Popcontent',
  props: {
    modelValue: {
      type: Boolean,
      required: false
    },
    value: {
      type: Boolean,
      required: false
    },
    placement: {
      type: String,
      required: false,
      default: 'center'
    }
  },
  emits: ['close'],
  data() {
    return {
      active: false as boolean
    }
  },
  computed: {
    position(): any {
      return {
        '--position-place': `${this.placement}`
      }
    },
    positionClass(): string {
      const pos =
        this.placement == 'flex-start'
          ? 'mt-2 ml-2'
          : this.placement == 'flex-end'
          ? 'mb-2 mr-2'
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
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/popup';
</style>
