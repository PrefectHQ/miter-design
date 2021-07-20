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

interface Data {
  tab: string | undefined
}

const data: Data = { tab: undefined }

export default defineComponent({
  name: 'Tabs',
  components: { Tab },
  emits: {
    'update:tab'(e: string | undefined) {
      return !!e
    },
    click(e: Event) {
      return { e }
    }
  },
  data() {
    return data
  },
  methods: {
    handleTabClick(e: Event, ...args: any[]): Event {
      this.tab = args[0]
      this.$emit('update:tab', this.tab)
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

    if (slottedItems) {
      children = [
        slottedItems?.map((ti) => {
          return h(
            ti,
            mergeProps(
              {
                onClick: ($e: Event, ...args: any): void => {
                  this.handleTabClick($e, ...args)
                }
              },
              { ...ti.props }
            )
          )
        })
      ]
    } else {
      children = [
        Array.from({ length: 2 }).map((elem, i) => {
          return h(Tab, () => `Tab ${i + 1}`)
        })
      ]
    }

    return h('div', { class: ['tabs-container'] }, children)
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/tabs';
</style>
