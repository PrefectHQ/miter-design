import Tabs from './Tabs.vue'
import Tab from './Tab/Tab.vue'
import '@/styles/components/tabs.scss'
import { withDesign } from 'storybook-addon-designs'
import { reactive } from 'vue'

export default {
  title: 'Miter Design/Tabs',
  component: Tabs,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=995%3A534'
    }
  }
}

const Template = (args) => ({
  components: { Tabs, Tab },
  setup() {
    const val = reactive(args.modelValue)
    return { ...args, val }
  },
  template: `<Tabs v-model="val" v-bind="args" />
  `
})

export const Default = Template.bind({})
Default.args = {
  modelValue: 0
}
