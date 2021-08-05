<template>
  <div>
    <label class="list" :class="classList" :disabled="disabled">
      <span v-for="(option, i) in options" :key="i">
        <input
          type="radio"
          :disabled="disabled"
          :name="label"
          :value="option"
          :checked="checked"
          v-model="value_"
          @input="$emit('update:modelValue', value_)"
        />
        <i v-if="icon" class="pi pi-fire pi-2x"></i>
        {{ option }}
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'List',
  emits: {
    'update:modelValue'(...args: any[]) {
      return { ...args }
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'list'
    },
    options: {
      type: Array,
      default: ['Option 1', 'Option 2']
    },
    placeholder: {
      type: String,
      default: 'Choose an Option'
    },
    title: {
      type: String,
      default: 'Prefect Dropdown'
    },
    icon: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      hovered: false,
      active: false
    }
  },
  computed: {
    classList(): string[] {
      return [
        ...(this.disabled ? ['disabled'] : []),
        ...(this.hovered ? ['hovered'] : []),
        ...(this.active ? ['hovered'] : [])
      ]
    },
    value_: {
      get(): String {
        return this.value
      },
      set() {
        this.$emit('update:modelValue', this.value)
      }
    }
  }
})
</script>
