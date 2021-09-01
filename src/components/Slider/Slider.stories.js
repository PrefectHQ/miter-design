import Slider from './Slider.vue'
import { reactive } from 'vue'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Miter Design/Slider',
  component: Slider,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4410'
    }
  }
}

const Template = (args, argTypes) => ({
  components: { Slider },
  data() {
    return { value: '3',}
  },
  setup() {
      return {args}
  },
  template: `<Slider v-bind="args" v-model="value" />`
})

export const Default = Template.bind({})
Default.args = {
    disabled: false,
    label: "Slider label ",
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true
}

