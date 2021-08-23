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
    outlined: Boolean,
    dense: Boolean
  },
  emits: {
    'update:modelValue'(...args: any[]) {
      return { ...args }
    }
  },
  data() {
    return {
      value_: this.value || this.modelValue,
      tabsContainer: null
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
    }
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
      ...(this.outlined ? ['outlined'] : []),
      ...(this.dense ? ['dense'] : [])
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

    return h(
      'div',
      {
        class: ['component-wrapper']
      },
      [
        h(
          'div',
          { class: ['border-container'] },
          h(
            'div',
            {
              class: [
                'tabs-container',
                `tab-${activeIndex}-active`,
                ...computedProps
              ]
            },
            children
          )
        )
      ]
    )
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/tabs';
</style>
