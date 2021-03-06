<script lang="ts">
import {
  h,
  defineComponent,
  mergeProps,
  VNode,
  RendererNode,
  RendererElement,
  resolveComponent
} from 'vue'

import MTag from '../Tag/Tag.vue'

export default defineComponent({
  name: 'MTagGroup',
  components: { MTag },
  props: {
    modelValue: {
      type: [Array],
      default: () => []
    },
    value: {
      type: [String, Number, Array],
      default: 0
    },
    multiple: {
      type: Boolean,
      default: false
    },
    mandatory: {
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
      value_: this.modelValue
    }
  },

  methods: {
    toggleClick(val: string) {
      let index = this.value_.indexOf(val)
      if (index === -1) {
        if (this.multiple) {
          this.value_.push(val)
        } else {
          this.value_[0] = val
        }
      } else if (!this.mandatory) {
        this.value_.splice(index, 1)
      }
    },
    handleTagClick($e: Event, ...args: any) {
      const value = this.$slots.default?.() ? args[0]?.value : args[0]
      this.toggleClick(value)
      this.$emit('update:modelValue', this.value_)
    }
  },

  render() {
    const $slots = this.$slots.default?.()
    let children: VNode<
      RendererNode,
      RendererElement,
      { [key: string]: any }
    >[][]

    if ($slots) {
      children = [
        $slots?.map(
          (tag: RendererNode | RendererElement | { [key: string]: any }) => {
            return h(
              tag,
              mergeProps(
                {
                  tabIndex: 0,
                  hovered: true,
                  outlined: this.value_.includes(tag.props?.value)
                    ? false
                    : true,
                  onClick: ($e: Event) =>
                    this.handleTagClick($e, { ...tag.props })
                },
                { ...tag.props }
              )
            )
          }
        )
      ]
    } else {
      children = [
        Array.from({ length: 2 }).map((elem, i) => {
          return h(
            resolveComponent('MTag'),
            mergeProps({
              tabIndex: 0,
              hovered: true,
              outlined: this.value_.includes(i) ? false : true,
              value: i,
              onClick: ($e: Event) => this.handleTagClick($e, i)
            }),
            () => `Tag ${i + 1}`
          )
        })
      ]
    }
    return h('div', { class: ['tag-group-container'] }, children)
  }
})
</script>
