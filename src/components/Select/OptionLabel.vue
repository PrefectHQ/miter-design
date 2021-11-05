<template>
  <div class="option-label">
    <template v-if="icon">
      <slot name="icon" :classes="classes.icon" v-bind="scope">
        <i :class="classes.icon" />
      </slot>
    </template>
    <slot name="label" v-bind="scope">
      {{ label }}
    </slot>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { Component } from '@/utilities/vue-class-component'

class Props {
  label = prop<string>({ required: true })
  icon = prop<string>({ default: '' })
}

@Component({})
export default class OptionLabel extends Vue.with(Props) {

  get scope() {
    return {
      label: this.label,
      icon: this.icon,
    }
  }

  get classes() {
    return {
      icon: `pi pi-1x mr-1 pi-${this.icon}`
    }
  }

}
</script>

<style scoped>
.option-label {
  display: flex;
  align-items: center;
  flex-grow: 1;
}
</style>