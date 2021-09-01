<script lang="ts">
import {
  h,
  defineComponent,
  mergeProps,
  VNode,
  RendererNode,
  RendererElement
} from 'vue'
import Option from './Option.vue'
import OptionGroup from './OptionGroup.vue'

export default defineComponent({
  name: 'Select',
  components: { Option, OptionGroup },
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
      icon: '',
      selected: '',
      searchTerm: '',
      allOptions: [] as VNode<
        RendererNode,
        RendererElement,
        { [key: string]: any }
      >[],
      filteredOptions: [] as VNode<
        RendererNode,
        RendererElement,
        { [key: string]: any }
      >[]
    }
  },
  watch: {
    active(): void {
      this.searchTerm = ''
      this.filteredOptions = this.allOptions
    }
  },
  methods: {
    handleOptionClick(e: Event, ...args: any[]): Event {
      this.selected = args[0]
      this.icon = args[1]
      this.$emit('update:modelValue', this.selected)
      return e
    },
    handleFocus(): void {
      if (this.disabled) return
      this.hovered = true
    },

    handleBlur(event: FocusEvent): void {
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
    handleKeydown(event: KeyboardEvent): void {
      if (event.key === 'Enter' || event.code === 'Space') {
        event.preventDefault()
        if (this.disabled) return
        if (this.active) {
          // choose highlighted option, else close
          this.filteredOptions.forEach((option) => {
            if (option.el.classList.contains('hovered')) {
              this.handleOptionClick(event, option.props.value)
            }
          })
        }
        this.active = !this.active
      } else if (event.key === 'Escape') {
        this.active = false
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        let currentFound = false
        let nextSelected = false
        for (let i = this.filteredOptions.length - 1; i >= 0; i--) {
          if (
            this.filteredOptions[i].type?.name === 'Option' &&
            !this.filteredOptions[i].el?.classList?.contains('disabled') &&
            currentFound
          ) {
            this.filteredOptions[i].el?.classList.add('hovered')
            nextSelected = true
            break
          }
          if (
            this.filteredOptions[i].el?.classList?.contains('hovered') &&
            !currentFound
          ) {
            this.filteredOptions[i].el?.classList.remove('hovered')
            currentFound = true
          }
        }
        if (!nextSelected) {
          for (let i = 0; i < this.filteredOptions.length; i++) {
            if (
              this.filteredOptions[i].type?.name === 'Option' &&
              !this.filteredOptions[i].el?.classList?.contains('disabled')
            ) {
              this.filteredOptions[i].el?.classList.add('hovered')
              break
            }
          }
        }
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        let currentFound = false
        let nextSelected = false
        for (let i = 0; i < this.filteredOptions.length; i++) {
          if (
            this.filteredOptions[i].type?.name === 'Option' &&
            !this.filteredOptions[i].el?.classList?.contains('disabled') &&
            currentFound
          ) {
            this.filteredOptions[i].el?.classList.add('hovered')
            nextSelected = true
            break
          }
          if (
            this.filteredOptions[i].el?.classList?.contains('hovered') &&
            !currentFound
          ) {
            this.filteredOptions[i].el?.classList.remove('hovered')
            currentFound = true
          }
        }
        if (!nextSelected) {
          for (let i = this.filteredOptions.length - 1; i >= 0; i--) {
            if (
              this.filteredOptions[i].type?.name === 'Option' &&
              !this.filteredOptions[i].el?.classList?.contains('disabled')
            ) {
              this.filteredOptions[i].el?.classList.add('hovered')
              break
            }
          }
        }
      }
    },
    runSearch(searchValue: InputEvent): void {
      searchValue.data == ''
        ? (this.filteredOptions = this.allOptions)
        : (this.filteredOptions = [])
      this.allOptions.forEach((option) => {
        if (
          option.type === 'div' ||
          option.props?.value
            .toLowerCase()
            .includes(searchValue.target?.value?.toString().toLowerCase())
        )
          this.filteredOptions.push(option)
      })
    }
  },
  render() {
    const slottedItems = this.$slots.default?.()
    let temp: VNode<RendererNode, RendererElement, { [key: string]: any }>[] =
      []
    let children: VNode<RendererNode, RendererElement, { [key: string]: any }>[]

    const pickerProps = [
      ...(this.disabled ? ['disabled'] : []),
      ...(this.hovered ? ['hovered'] : []),
      ...(this.active ? ['active'] : []),
      ...(this.selected.length > 0 ? ['selected'] : [])
    ]

    if (slottedItems) {
      temp = [
        slottedItems?.map(
          (ti: RendererNode | RendererElement | { [key: string]: any }) => {
            if (ti.type.name === 'Option') {
              return h(
                ti,
                mergeProps(
                  {
                    selected: this.selected == ti.props?.value,
                    onClick: this.handleOptionClick
                  },
                  { ...ti.props }
                )
              )
            } else if (ti.type.name === 'OptionGroup') {
              const innerSlot = h(ti)
              const innerOptions = innerSlot.children?.default?.()
              // this will either be Option(s) or Symbol(Fragment)
              const options = [
                innerOptions?.map(
                  (
                    ti: RendererNode | RendererElement | { [key: string]: any }
                  ) => {
                    if (ti.type.name === 'Option') {
                      return h(
                        ti,
                        mergeProps(
                          {
                            disabled: innerSlot.props?.disabled,
                            selected: this.selected == ti.props?.value,
                            onClick: this.handleOptionClick
                          },
                          { ...ti.props }
                        )
                      )
                    } else {
                      const options = ti.children?.map(
                        (
                          node:
                            | RendererNode
                            | RendererElement
                            | { [key: string]: any }
                        ) => {
                          return h(
                            node,
                            mergeProps(
                              {
                                disabled: innerSlot.props?.disabled,
                                selected: this.selected == node.props?.value,
                                onClick: this.handleOptionClick
                              },
                              { ...node.props }
                            )
                          )
                        }
                      )
                      return [...options]
                    }
                  }
                )
              ]
              return [
                h('div', { class: ['title'] }, ti.props.label),
                ...options
              ]
            } else {
              //ti.type === Symbol(Fragment) => v-for of options, not in group
              const options = ti.children?.map(
                (
                  node: RendererNode | RendererElement | { [key: string]: any }
                ) => {
                  return h(
                    node,
                    mergeProps(
                      {
                        selected: this.selected == node.props?.value,
                        onClick: this.handleOptionClick
                      },
                      { ...node.props }
                    )
                  )
                }
              )
              return [...options]
            }
          }
        )
      ]
    }
    children = temp.flat(4)
    this.allOptions = [...children]

    const searchBar = h('div', { class: 'search' }, [
      h('i', { class: ['pi', 'pi-Search', 'pi-lg', 'mr-1'] }),
      h(
        'input',
        mergeProps({
          class: 'py-2',
          placeholder: 'Search by name',
          onClick: (event: Event) => {
            event.stopPropagation()
          },
          onBlur: this.handleBlur,
          onInput: this.runSearch
        })
      )
    ])

    const listContainer = h(
      'div',
      { class: ['list', this.openUp && 'openUp'], disabled: this.disabled },
      [this.search && searchBar, this.filteredOptions]
    )

    const picker = h(
      'div',
      mergeProps({
        class: ['picker', ...pickerProps]
      }),
      [
        h('span', [
          this.icon.length > 0
            ? h('i', { class: ['pi', `pi-${this.icon}`, 'pi-1x', 'pr-1'] })
            : null,
          this.selected || this.placeholder
        ]),
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
