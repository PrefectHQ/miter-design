<template>
  <div
    class="wrapper"
    tabindex="0"
    @focus="handleFocus"
    @blur="handleBlur($event)"
    @mouseenter="handleFocus"
    @mouseleave="handleMouseOut"
    @keydown.enter.space="handleKeydown"
    @keydown.esc="active = false"
    @keydown.up.prevent="selectPrevious"
    @keydown.down.prevent="selectNext"
    :class="{ disabled: disabled, active: active }"
  >
    <div
      class="picker"
      :class="classList"
      @click="!disabled ? (active = !active) : null"
    >
      <span>{{ selected || placeholder }}</span>
      <i class="pi pi-Arrow-Down pi-lg"></i>
    </div>
    <div class="list" v-show="active" :class="{ openUp: openUp }">
      <div v-if="search" class="search"
        ><i class="pi pi-Search pi-lg mr-1"></i
        ><input
          class="py-2"
          placeholder="Search by name"
          v-model="searchTerm"
          @input="runSearch(searchTerm)"
          @blur="handleBlur($event)"
      /></div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Select',
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
    options: {
      type: Array,
      default: () => ['Option 1', 'Option 2']
    },
    placeholder: {
      type: String,
      default: 'Choose an Option'
    },
    search: {
      type: Boolean,
      default: false
    },
    openUp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hovered: false,
      active: false,
      selected: '',
      searchTerm: '',
      filteredOptions: this.options
    }
  },
  computed: {
    classList(): string[] {
      return [
        ...(this.disabled ? ['disabled'] : []),
        ...(this.hovered ? ['hovered'] : []),
        ...(this.active ? ['active'] : []),
        ...(this.selected.length > 0 ? ['selected'] : [])
      ]
    },
    activeOption(): number {
      return 0
    },
    prevOption(): number {
      const next = this.activeOption - 1
      return next >= 0 ? next : -1
    },
    nextOption(): number {
      const next = this.activeOption + 1
      return next <= this.options.length - 1 ? next : -1
    }
  },
  watch: {
    active(): void {
      this.searchTerm = ''
      this.filteredOptions = this.options
    }
  },
  methods: {
    runSearch(searchValue: string): void {
      this.filteredOptions = this.options.filter((option) =>
        option.toLowerCase().includes(searchValue.toLowerCase())
      )
    },

    handleKeydown(): void {
      if (this.disabled) return
      if (this.active) {
        if (this.options[this.hoveredStates.indexOf(true)]) {
          this.choose(this.options[this.hoveredStates.indexOf(true)])
          return
        } else {
          this.active = !this.active
          return
        }
      }
      this.active = !this.active
      if (this.active && this.selected.length > 0) {
        const index = this.options.indexOf(this.selected)
        this.hoveredStates[index] = true
      } else {
        this.hoveredStates[0] = true
      }
    },

    selectPrevious(): void {
      const current = this.activeOption
      const next = this.prevOption
      if (next !== -1) {
        this.hoveredStates[current] = false
        this.hoveredStates[next] = true
      }
    },

    selectNext(): void {
      const current = this.activeOption
      const next = this.nextOption
      if (next !== -1) {
        this.hoveredStates[current] = false
        this.hoveredStates[next] = true
      }
    },

    handleFocus(): void {
      if (this.disabled) return
      this.hovered = true
    },

    handleBlur(event): void {
      console.log(event)
      if (
        event.relatedTarget?.tagName === 'INPUT' ||
        event.relatedTarget?.classList.contains('active')
      )
        return
      this.hovered = false
      this.active = false
    },

    handleMouseOut(): void {
      this.hovered = false
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/select';
</style>
