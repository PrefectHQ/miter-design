<script lang="ts">
import {
  h,
  defineComponent,
  mergeProps,
  VNode,
  RendererNode,
  RendererElement
} from 'vue'

import Tag from '../Tag/Tag.vue'

export default defineComponent({
  name: 'TagGroup',
  components: { Tag },
  props: {
    modelValue: {
      type: [String, Number, Array],
      default: 0
    },
    value: {
      type: [String, Number, Array],
      default: 0
    },
    multple: {
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
      value_: this.multple ? [] : 0 || this.modelValue,
      outlined: true
    }
  },
  methods: {
    handleTagClick($e: Event, ...args: any) {
      const value = args[0]?.value
      if (this.multple) {
        let index = this.value_.indexOf(value)
        if (index === -1) {
          this.value_.push(value)
        } else {
          this.value_.splice(index, 1)
        }
        this.$emit('update:modelValue', [...new Set(this.value_)])
      } else {
        this.$emit('update:modelValue', value)
      }
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
            Tag,
            mergeProps({
              value: i,
              onClick: onClick
            }),
            () => `Tag ${i + 1}`
          )
        })
      ]
    }
    return h('div', {}, children)
  }
})
</script>
