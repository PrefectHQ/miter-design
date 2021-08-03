<template>
  <label :for="label"><slot /></label>
  <select :name="label" :id="label">
    <option hidden disabled selected value>{{ placeholder }}</option>
    <optgroup :label="title">
      <option v-for="(option, i) in options" :key="i" :value="option">
        <i v-if="icon" class="pi pi-fire pi-2x"></i>
        {{ option }}
      </option>
    </optgroup>
  </select>
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
  }
})
</script>
