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
      url: 'https://www.figma.com/file/JomY9jsgJdal9wfPBtpWkY/UI?node-id=234%3A12987'
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
    ${
      args.content
        ? typeof args.content == 'function'
          ? args.content()
          : args.content
        : ''
    }
  </Tabs>
  `
})

export const Default = Template.bind({})
Default.args = {
  modelValue: 1,
  content: `
<Tab href="1">
  <i class="pi pi-earth-fill pi-lg mr-1" />
  Tab 1
</Tab>
<Tab href="2">
  <i class="pi pi-chat-heart-line pi-lg mr-1" />
  Tab 2 
</Tab>
<Tab href="3">
  <i class="pi pi-bug-2-line pi-lg mr-1" />
  Tab 3 
</Tab>
<Tab href="4">
  <i class="pi pi-compass-line pi-lg mr-1" />
  Tab 4 
</Tab>
        `
}

export const Overflow = Template.bind({})
Overflow.args = {
  modelValue: 0,
  content: () => {
    const icons = [
      'earth-fill',
      'chat-heart-line',
      'bug-2-line',
      'compass-line',
      'book-line',
      'bug-line',
      'contrast-fill',
      'sticky-note-line',
      'film-fill',
      'safe-2-fill',
      'bar-chart-line',
      'refresh-fill'
    ]

    return icons.reduce(
      (acc, curr, i) =>
        acc +
        `
<Tab href="${i}">
  <i class="pi pi-${curr} pi-lg mr-1" />
  Tab ${i + 1}
</Tab>`,
      ''
    )
  }
}
