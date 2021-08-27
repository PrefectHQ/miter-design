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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render() {
    console.log('optgroup', this.label, this.disabled)
    const slottedItems = this.$slots.default?.()
    let children: VNode<
      RendererNode,
      RendererElement,
      { [key: string]: any }
    >[][]

    if (slottedItems) {
      children = [
        slottedItems?.map(
          (ti: RendererNode | RendererElement | { [key: string]: any }) => {
            return h(
              ti,
              mergeProps(
                {
                  disabled: this.disabled,
                  class: this.disabled ? ['disabled'] : []
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
