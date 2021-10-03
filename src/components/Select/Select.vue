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
    },
    change(...args: any[]) {
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
    },
    modelValue: {
      type: [String, Object],
      default: ''
    }
  },
  data() {
    return {
      hovered: false,
      active: false,
      icon: '',
      selected: this.modelValue,
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
    },
    modelValue(val): void {
      const selectedOption = this.allOptions.find(
        (option) => option?.props?.value == val
      )

      if (selectedOption?.props) {
        this.selected = selectedOption.props.value || ''
        this.icon = selectedOption.props.icon || ''
      }
    }
  },
  methods: {
    handleOptionClick(e: Event, ...args: any[]): Event {
      if ((e.target as HTMLDivElement)?.classList?.contains('disabled'))
        return e
      this.selected = args[0]
      this.icon = args[1]
      this.$emit('update:modelValue', this.selected, args[2])
      this.$emit('change', this.selected, args[2])
      return e
    },
    handleFocus(): void {
      if (this.disabled) return
      this.hovered = true
    },

    handleBlur(event: FocusEvent): void {
      const target = event.relatedTarget as HTMLDivElement
      if (
        target?.tagName === 'INPUT' ||
        target?.classList.contains('active') ||
        target?.classList.contains('option')
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
            if (option.el?.classList.contains('hovered')) {
              this.handleOptionClick(
                event,
                option?.props?.value,
                option?.props?.icon || '',
                option?.props?.data
              )
            }
          })
        }
        this.active = !this.active
      } else if (event.key === 'Escape') {
        this.active = false
      } else if (event.key === 'ArrowUp') {
        if (!this.active) return
        event.preventDefault()
        let currentFound = false
        let nextSelected = false
        for (let i = this.filteredOptions.length - 1; i >= 0; i--) {
          const option = this.filteredOptions[i]
          const type = (option.type as any)?.name
          const optionClasses = option?.el?.classList

          if (
            type === 'Option' &&
            !optionClasses?.contains('disabled') &&
            currentFound
          ) {
            option.el?.focus()
            optionClasses.add('hovered')
            nextSelected = true
            break
          }
          if (optionClasses?.contains('hovered') && !currentFound) {
            optionClasses.remove('hovered')
            currentFound = true
          }
        }

        if (!nextSelected) {
          for (let i = this.filteredOptions.length - 1; i >= 0; i--) {
            const option = this.filteredOptions[i]
            const type = (option.type as any)?.name
            const optionClasses = option?.el?.classList

            if (type === 'Option' && !optionClasses?.contains('disabled')) {
              option.el?.focus()
              optionClasses.add('hovered')
              break
            }
          }
        }
      } else if (event.key === 'ArrowDown') {
        if (!this.active) return
        event.preventDefault()
        let currentFound = false
        let nextSelected = false
        for (let i = 0; i < this.filteredOptions.length; i++) {
          const option = this.filteredOptions[i]
          const type = (option.type as any)?.name
          const optionClasses = option?.el?.classList

          if (
            type === 'Option' &&
            !optionClasses?.contains('disabled') &&
            currentFound
          ) {
            option.el?.focus()
            optionClasses.add('hovered')
            nextSelected = true
            break
          }

          if (optionClasses?.contains('hovered') && !currentFound) {
            optionClasses.remove('hovered')
            currentFound = true
          }
        }

        if (!nextSelected) {
          for (let i = 0; i < this.filteredOptions.length; i++) {
            const option = this.filteredOptions[i]
            const type = (option.type as any)?.name
            const optionClasses = option?.el?.classList

            if (type === 'Option' && !optionClasses?.contains('disabled')) {
              option.el?.focus()
              optionClasses.add('hovered')
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
            .includes(
              (searchValue.target as HTMLInputElement)?.value
                ?.toString()
                .toLowerCase()
            )
        )
          this.filteredOptions.push(option)
      })
    }
  },
  render() {
    const slottedItems = this.$slots.default?.()
    let temp: any = []
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
              // @ts-ignore: Ignoring this because the typings seem to be incorrect (but the code works)
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
              if (!Array.isArray(ti.children)) return

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
      h('i', { class: ['pi', 'pi-search-line', 'mr-1'] }),
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

    const activeSlot = this.$slots?.active?.()
    const icon = children.find(
      (option) => option?.props?.value == this.modelValue
    )?.props?.icon

    const picker = h(
      'div',
      mergeProps({
        class: ['picker', ...pickerProps]
      }),
      [
        activeSlot
          ? h('span', [activeSlot])
          : h('span', [
              this.icon.length > 0 || icon
                ? h('i', {
                    class: ['pi', `pi-${this.icon || icon}`, 'pi-1x', 'pr-1']
                  })
                : null,
              this.selected || this.placeholder
            ]),
        h('i', {
          class: [
            'pi',
            this.openUp ? 'pi-arrow-up-s-line' : 'pi-arrow-down-s-line',
            'pi-lg'
          ]
        })
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
        onChange: "$emit('change', this.selected, args[2])",
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
