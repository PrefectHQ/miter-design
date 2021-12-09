<script lang="ts">
import {
  h,
  defineComponent,
  mergeProps,
  RendererNode,
  ref
} from 'vue'
import Tab from './Tab/Tab.vue'

export default defineComponent({
  name: 'Tabs',
  components: { Tab },
  props: {
    modelValue: {
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
  emits: ['update:modelValue'],
  data() {
    return {
      showLeft: false,
      showRight: false
    }
  },
  watch: {
    _modelValue(tab) {
      this.scrollTabIntoView(tab)
    }
  },
  setup() {
    const tabsContainer = ref<HTMLDivElement>()

    return { tabsContainer }
  },
  methods: {
    handleTabClick(tab: string | number) {
      this._modelValue = tab
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
    },
    scrollTabIntoView(value: string | number) {
      const tab = this.$refs[`tab-${value}`] as typeof Tab

      if(tab) {
        tab.$el.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        })
      }
    }
  },
  updated() {
    this.handleOverflowUpdate(this.tabsContainer!)
  },
  mounted() {
    this.handleOverflowUpdate(this.tabsContainer!)
  },
  render() {
    const slottedItems = this.$slots.default?.() ?? []

    const activeIndex = slottedItems?.findIndex(
      (tab) => tab.props?.href == this._modelValue
    )

    const children = (slottedItems as RendererNode[])
      .filter((element) => element.type.name == 'Tab')
      .map((tab) => h(
            tab,
            mergeProps(
              {
                active: this._modelValue == tab.props.href,
                onClick: () => this.handleTabClick(tab.props.href),
                onfocus: () => this.scrollTabIntoView(tab.props.href),
                ref: `tab-${tab.props.href}`
              },
              tab.props
            )
          )
        )

    const tabsContainer = h(
      'div',
      {
        ref: 'tabsContainer',
        tabindex: -1,
        class: [
          'tabs-container',
          `tab-${activeIndex}-active`,
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
