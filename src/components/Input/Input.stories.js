import Input from './Input.vue'

export default {
  title: 'Miter Design/Input',
  component: Input,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4410'
    }
  }
}

const Template = (args, argTypes) => ({
  components: { Input },
  data() {
    return { value: 'hello',}
  },
  setup() {
      return {args}
  },
  template: `<Input v-bind="args" v-model="value" />`
})

export const Default = Template.bind({})
Default.args = {
    disabled: false,
    label: "Input label ",
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true
}

