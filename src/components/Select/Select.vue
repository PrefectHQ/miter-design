<script lang="ts">
import {
  h,
  defineComponent,
  mergeProps,
  VNode,
  RendererNode,
  RendererElement,
  ref
} from 'vue'
import Option from './Option.vue'
import OptionGroup from './OptionGroup.vue'

export default defineComponent({
  name: 'Select',
  components: { Option, OptionGroup },
  props: {
    disabled: {
      type: Boolean,
      default: false
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
  methods: {
    handleOptionClick(e: Event, ...args: any[]): Event {
      console.log('click optiongroup', e, args)
      this.value_ = args[0]
      this.$emit('update.modelValue', this.value_)
      return e
    },
    handleFocus(): void {
      if (this.disabled) return
      this.hovered = true
    },

    handleBlur(event: Event): void {
      console.log(event.relatedTarget)
      if (
        event.relatedTarget?.tagName === 'INPUT' ||
        event.relatedTarget?.classList.contains('active')
      )
        return
      this.hovered = false
      this.active = false
    },

    handleMouseLeave(): void {
      this.hovered = false
    },
    handleKeydown(event: Event): void {
      event.preventDefault()
      if (event.key === 'Enter' || event.code === 'Space') {
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
      } else if (event.key === 'Escape') {
        this.active = false
      } else if (event.key === 'ArrowUp') {
        // selectPrevious
      } else if (event.key === 'ArrowDown') {
        //selectNext
      }
    },
    runSearch(searchValue: string): void {
      console.log('search')
      this.filteredOptions = this.options.filter((option) =>
        option.toLowerCase().includes(searchValue.toLowerCase())
      )
    }
  },
  render() {
    const slottedItems = this.$slots.default?.()
    let children: VNode<
      RendererNode,
      RendererElement,
      { [key: string]: any }
    >[][]

    const pickerProps = [
      ...(this.disabled ? ['disabled'] : []),
      ...(this.hovered ? ['hovered'] : []),
      ...(this.active ? ['active'] : []),
      ...(this.selected.length > 0 ? ['selected'] : [])
    ]

    if (slottedItems) {
      console.log("we've got slots!", this.$slots.default?.())
      children = [
        slottedItems?.map(
          (ti: RendererNode | RendererElement | { [key: string]: any }) => {
            return h(
              ti,
              mergeProps(
                {
                  //selected: this.value_ == ti.props?.value,
                  //disabled: this.disabled,
                  //class: computedProps,
                  //onClick: this.handleOptionClick
                },
                { ...ti.props }
              )
            )
          }
        )
      ]
    }

    //const heading = h('div', { class: ['title'] }, [this.label])
    // return [heading, children]

    const searchBar = h('div', { class: 'search' }, [
      h('i', { class: ['pi', 'pi-Search', 'pi-lg', 'mr-1'] }),
      h(
        'input',
        mergeProps({
          class: 'py-2',
          placeholder: 'Search by name',
          onClick: this.handleBlur,
          onInput: this.runSearch
        })
      )
    ])

    const listContainer = h(
      'div',
      { class: ['list', this.openUp && 'openUp'], disabled: this.disabled },
      [this.search && searchBar, children]
    )

    const picker = h(
      'div',
      mergeProps({
        class: ['picker', ...pickerProps]
      }),
      [
        h('span', this.selected || this.placeholder),
        h('i', { class: ['pi', 'pi-Arrow-Down', 'pi-lg'] })
      ]
    )
    const wrapper = h(
      'div',
      mergeProps({
        class: [
          'wrapper',
          this.disabled && 'disabled',
          this.active && 'active'
        ],
        tabindex: 0,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onMouseenter: this.handleFocus,
        onMouseleave: this.handleMouseLeave,
        onKeydown: this.handleKeydown,
        onClick: () => {
          !this.disabled ? (this.active = !this.active) : null
        }
      }),
      [picker, this.active && listContainer]
    )

    return wrapper
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/select';
</style>

<!--
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
-->
