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
import MTab from './Tab/Tab.vue'

export default defineComponent({
  name: 'MTabs',
  components: { MTab },
  props: {
    modelValue: {
      type: [String, Number],
      default: 0
    },
    value: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    _modelValue: {
      get() {
        return this.modelValue
      },
      set(newVal: String | Number) {
        this.$emit('update:modelValue', newVal)
      }
    }
  },
  emits: {
    'update:modelValue'(...args: any[]) {
      return { ...args }
    }
  },
  data() {
    return {

      showLeft: false,
      showRight: false
    }
  },
  setup() {
    const tabsContainer = ref<HTMLDivElement>()
    return { tabsContainer }
  },
  methods: {
    handleTabClick(e: Event, ...args: any[]): Event {
      this._modelValue = args[0]
      const target: HTMLDivElement = e.target as HTMLDivElement
      // TODO: Polyfill this for Safari, since scrollIntoViewOptions aren't supported in Safari
      target?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      })

      return e
    },
    handleTabFocus(e: Event, ...args: any[]) {
      const target: HTMLDivElement = e.target as HTMLDivElement
      // TODO: Polyfill this for Safari, since scrollIntoViewOptions aren't supported in Safari
      target?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      })
    },
    handleOverflowUpdate(target: HTMLDivElement) {
      this.showLeft = target.scrollLeft > 0
      this.showRight =
        target.scrollLeft + target.clientWidth < target.scrollWidth
    },
    scrollLeft() {
      this.tabsContainer?.scroll({
        left: this.tabsContainer.scrollLeft - this.tabsContainer.clientWidth,
        behavior: 'smooth'
      })
    },
    scrollRight() {
      this.tabsContainer?.scroll({
        left: this.tabsContainer.scrollLeft + this.tabsContainer.clientWidth,
        behavior: 'smooth'
      })
    }
  },
  updated() {
    this.handleOverflowUpdate(this.tabsContainer!)
  },
  mounted() {
    this.handleOverflowUpdate(this.tabsContainer!)
  },
  render() {
    const slottedItems = this.$slots.default?.()
    let children: VNode<
      RendererNode,
      RendererElement,
      { [key: string]: any }
    >[][]

    const activeIndex = slottedItems?.findIndex(
      (ti) => ti.props?.href == this._modelValue
    )

    const computedProps: string[] = []

    const onClick = ($e: Event, ...args: any): Event =>
      this.handleTabClick($e, ...args)

    if (slottedItems) {
      children = [
        slottedItems
          ?.filter(
            (ti: RendererNode | RendererElement | { [key: string]: any }) =>
              ti.type.name == 'Tab'
          )
          .map(
            (ti: RendererNode | RendererElement | { [key: string]: any }) => {
              return h(
                ti,
                mergeProps(
                  {
                    active: this._modelValue == ti.props?.href,
                    class: computedProps,
                    onClick: onClick,
                    onfocus: this.handleTabFocus
                  },
                  { ...ti.props }
                )
              )
            }
          )
      ]
    } else {
      children = [
        Array.from({ length: 2 }).map((elem, i) => {
          return h(
            MTab,
            mergeProps({
              active: this._modelValue == i,
              href: i,
              onClick: onClick,
              onfocus: this.handleTabFocus
            }),
            () => `Tab ${i + 1}`
          )
        })
      ]
    }

    const tabsContainer = h(
      'div',
      {
        ref: 'tabsContainer',
        tabindex: -1,
        class: [
          'tabs-container',
          `tab-${activeIndex}-active`,
          ...computedProps
        ],
        onscroll: (e: Event) => {
          const target = e?.target as HTMLDivElement
          if (!target) return
          this.handleOverflowUpdate(target)
        }
      },
      children
    )

    let leftArrow, rightArrow
    if (this.showLeft)
      leftArrow = h(
        'button',
        {
          'aria-label': 'Arrow Left',
          class: ['overflow-button', 'left'],
          onClick: this.scrollLeft,
          tabindex: -1
        },
        [h('i', { class: ['pi', 'pi-arrow-left-s-line', 'pi-lg'] })]
      )

    if (this.showRight)
      rightArrow = h(
        'button',
        {
          'aria-label': 'Arrow Right',
          class: ['overflow-button', 'right'],
          onClick: this.scrollRight,
          tabindex: -1
        },
        [h('i', { class: ['pi', 'pi-arrow-right-s-line', 'pi-lg'] })]
      )

    const borderContainer = h(
      'div',
      {
        class: ['border-container']
      },
      [leftArrow, tabsContainer, rightArrow]
    )

    const wrapper = h(
      'div',
      {
        class: ['component-wrapper']
      },
      [borderContainer]
    )

    return wrapper
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/tabs';
</style>
