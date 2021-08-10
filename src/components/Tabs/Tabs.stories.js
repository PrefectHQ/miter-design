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
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A993'
    }
  }
}

const Template = (args) => ({
  components: { Tabs, Tab },
  setup() {
    const val = reactive(args.modelValue)
    return { ...args, val }
  },
  template: `<Tabs v-model="val" v-bind="args" >
    ${args.content ? args.content : ''}
  </Tabs>
  `
})

export const Default = Template.bind({})
Default.args = {
  modelValue: 0,
  content:
    '<Tab href="0">Tab 1</Tab><Tab href="1">Tab with a really long title</Tab>'
}
