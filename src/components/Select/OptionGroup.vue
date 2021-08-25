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

export default defineComponent({
  name: 'OptionGroup',
  components: { Option },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue'(...args: any[]) {
      return { ...args }
    }
  },
  data() {
    return {
      value_: this.value || this.modelValue
    }
  },
  methods: {
    handleOptionClick(e: Event, ...args: any[]): Event {
      console.log('click optiongroup', e, args)
      this.value_ = args[0]
      this.$emit('update.modelValue', this.value_)
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

    const computedProps = [
      ...(this.selected ? ['selected'] : []),
      ...(this.disabled ? ['disabled'] : [])
    ]

    if (slottedItems) {
      children = [
        slottedItems?.map(
          (ti: RendererNode | RendererElement | { [key: string]: any }) => {
            return h(
              ti,
              mergeProps(
                {
                  selected: this.value_ == ti.props?.value,
                  disabled: this.disabled,
                  class: computedProps,
                  onClick: this.handleOptionClick
                },
                { ...ti.props }
              )
            )
          }
        )
      ]
    }
    const heading = h('div', { class: ['title'] }, [this.label])
    return [heading, children]
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/select';
</style>
