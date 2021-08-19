<template>
  <div ref="modal" class="modal-backdrop" @click.self="closePopUp">
    <div v-if="$slots.content" class="modal">
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
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      required: false
    },
    value: {
      type: Boolean,
      required: false
    }
  },
  emits: ['close'],
  data() {
    return {
      active: false as boolean
    }
  },
  computed: {
    popupOpen(): boolean {
      console.log('open', this.modelValue)
      return typeof this.modelValue === 'boolean' ? this.modelValue : this.value
    },
    classList(): any {
      return this.disabled ? ['disabled'] : this.active ? ['active'] : []
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
@use '../../styles/components/card';
</style>
