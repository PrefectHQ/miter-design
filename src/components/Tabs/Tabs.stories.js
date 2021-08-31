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
  <i class="pi pi-Earth pi-lg mr-1" />
  Tab 1
</Tab>
<Tab href="2">
  <i class="pi pi-Tag-with-Heart pi-lg mr-1" />
  Tab 2 
</Tab>
<Tab href="3">
  <i class="pi pi-Bug-Warning pi-lg mr-1" />
  Tab 3 
</Tab>
<Tab href="4">
  <i class="pi pi-Compass pi-lg mr-1" />
  Tab 4 
</Tab>
        `
}

export const Overflow = Template.bind({})
Overflow.args = {
  modelValue: 0,
  content: () => {
    const icons = [
      'Earth',
      'Tag-with-Heart',
      'Bug-Warning',
      'Compass',
      'Book',
      'Bug',
      'Dark',
      'Note',
      'Film',
      'Safe',
      'Bar-Graph',
      'Refresh-5'
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
