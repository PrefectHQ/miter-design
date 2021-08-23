<script lang="ts">
import {
  h,
  defineComponent,
  mergeProps,
  VNode,
  RendererNode,
  RendererElement
} from 'vue'
import Tab from './Tab/Tab.vue'

export default defineComponent({
  name: 'Tabs',
  components: { Tab },
  props: {
    modelValue: {
      type: [String, Number],
      default: 0
    },
    value: {
      type: [String, Number],
      default: 0
    },
    color: { type: String, default: () => 'primary' },
    outlined: Boolean
  },
  emits: {
    'update:modelValue'(...args: any[]) {
      return { ...args }
    }
  },
  data() {
    return {
      value_: this.value || this.modelValue,
      tabsContainer: null,
      showLeft: false,
      showRight: false
    }
  },
  methods: {
    handleTabClick(e: Event, ...args: any[]): Event {
      this.value_ = args[0]
      this.$emit('update:modelValue', this.value_)

      const target: HTMLDivElement = e.target as HTMLDivElement
      // TODO: Polyfill this for Safari, since scrollIntoViewOptions aren't supported in Safari
      target?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      })

      return e
    },
    handleOverflowUpdate(target: HTMLDivElement) {
      this.showLeft = target.scrollLeft > 0
      this.showRight =
        target.scrollLeft + target.clientWidth < target.scrollWidth
    },
    scrollLeft() {
      const target = this.$refs['tabs-container'] as HTMLDivElement
      this.$refs['tabs-container'].scroll({
        left: target.scrollLeft - target.clientWidth,
        behavior: 'smooth'
      })
    },
    scrollRight() {
      const target = this.$refs['tabs-container'] as HTMLDivElement
      this.$refs['tabs-container'].scroll({
        left: target.scrollLeft + target.clientWidth,
        behavior: 'smooth'
      })
    }
  },
  updated() {
    this.handleOverflowUpdate(this.$refs['tabs-container'] as HTMLDivElement)
  },
  mounted() {
    this.handleOverflowUpdate(this.$refs['tabs-container'] as HTMLDivElement)
  },
  render() {
    const slottedItems = this.$slots.default?.()
    let children: VNode<
      RendererNode,
      RendererElement,
      { [key: string]: any }
    >[][]

    const activeIndex = slottedItems?.findIndex(
      (ti) => ti.props?.href == this.value_
    )

    const computedProps = [
      ...(this.color ? [this.color] : []),
      ...(this.outlined ? ['outlined'] : [])
    ]

    const onClick = ($e: Event, ...args: any): Event =>
      this.handleTabClick($e, ...args)

    if (slottedItems) {
      children = [
        slottedItems?.map(
          (ti: RendererNode | RendererElement | { [key: string]: any }) => {
            return h(
              ti,
              mergeProps(
                {
                  active: this.value_ == ti.props?.href,
                  class: computedProps,
                  onClick: onClick
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
            Tab,
            mergeProps({
              href: i,
              onClick: onClick,
              active: this.value_ == i
            }),
            () => `Tab ${i + 1}`
          )
        })
      ]
    }

    const tabsContainer = h(
      'div',
      {
        ref: 'tabs-container',
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
        { class: ['overflow-button', 'left'], onClick: this.scrollLeft },
        [h('i', { class: ['pi', 'pi-Arrow-Left', 'pi-lg'] })]
      )

    if (this.showRight)
      rightArrow = h(
        'button',
        { class: ['overflow-button', 'right'], onClick: this.scrollRight },
        [h('i', { class: ['pi', 'pi-Arrow-Right', 'pi-lg'] })]
      )

    const borderContainer = h(
      'div',
      {
        class: ['border-container']
      },

      [rightArrow, tabsContainer, leftArrow]
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
