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
    modelValue: [String, Number],
    color: { type: String, default: () => 'primary' },
    outlined: Boolean
  },
  emits: {
    'update:modelValue'(e: string | number | undefined) {
      return !!e
    }
  },
  computed: {
    value: {
      get(): string | number | undefined {
        return this.modelValue
      },
      set(value: string | number | undefined) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    handleTabClick(e: Event, ...args: any[]): Event {
      this.value = args[0]
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
                  onClick: onClick,
                  active: this.value == ti.props?.href
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
              href: i + 1,
              onClick: onClick,
              active: this.value == i + 1
            }),
            () => `Tab ${i + 1}`
          )
        })
      ]
    }

    const computedProps = [
      ...(this.color ? [this.color] : []),
      ...(this.outlined ? ['outlined'] : [])
    ]

    return h('div', { class: ['tabs-container', ...computedProps] }, children)
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/tabs';
</style>
