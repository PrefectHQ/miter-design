<template>
  <div class="wrapper">
    <label :for="label" v-if="!hideLabel">{{ label }}</label>
    <span v-if="subtitle">{{ subtitle }}</span>
    <div
      class="textarea-wrapper"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="textarea">
        <textarea
          :id="label"
          :placeholder="placeholder"
          :maxlength="maxLength"
          :minlength="minLength"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextArea',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    subtitle: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'textarea'
    },
    hideLabel: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Write here...'
    },
    maxLength: {
      type: Number,
      required: false
    },
    minLength: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      active: false as boolean,
      hovered: false as boolean,
      invalid: !this.valid as boolean
    }
  },
  computed: {
    classList(): any {
      return this.disabled
        ? ['disabled']
        : this.invalid
        ? ['invalid']
        : this.active
        ? ['active']
        : this.hovered
        ? ['hovered']
        : []
    }
  },
  methods: {
    handleMouseEnter(): void {
      if (this.disabled) return
      this.hovered = true
    },
    handleMouseLeave(): void {
      this.hovered = false
    }
  }
})
</script>
<style lang="scss" scoped>
@use '../../styles/components/textarea';
</style>
