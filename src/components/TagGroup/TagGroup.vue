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
      type: [String, Number],
      default: 0
    },
    value: {
      type: [String, Number],
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
      value_: this.value || this.modelValue,
      tagArr: [],
      outlined: true
    }
  },
  methods: {
    handleTagClick($e: Event, ...args: any) {
      const value = args[0]?.value
      if (this.multple) {
        let index = this.tagArr.indexOf(value)
        if (index === -1) {
          this.tagArr.push(value)
          $e.target.classList.add('outlined')
        } else {
          this.tagArr.splice(index, 1)
          $e.target.classList.remove('outlined')
        }
        this.$emit('update:modelValue', [...new Set(this.tagArr)])
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
