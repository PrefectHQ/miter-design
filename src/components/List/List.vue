<template>
  <label :for="label"><slot /></label>
  <div class="list" :class="classList">
    <select :name="label" :id="label" :disabled="disabled">
      <option hidden disabled selected value>{{ placeholder }}</option>
      <optgroup :label="title">
        <option v-for="(option, i) in options" :key="i" :value="option">
          <i v-if="icon" class="pi pi-fire pi-2x"></i>
          {{ option }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'List',
  props: {
    disabled: {
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
    }
  }
})
</script>
