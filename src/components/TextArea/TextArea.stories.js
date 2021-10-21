import TextArea from './TextArea.vue'

export default {
  title: 'Miter Design/Text Area',
  component: TextArea,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=2148%3A3783'
    }
  }
}

const Template = (args) => ({
  components: { TextArea },
  data() {
    return { value: '' }
  },
  setup() {
    return { args }
  },
  template: `<TextArea v-bind="args" v-model="value"><template v-if="args.error" v-slot:error>${args.error}</template></TextArea>`
})

export const Default = Template.bind({})
Default.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  label: 'TextArea Disabled'
}

export const Title = Template.bind({})
Title.args = {
  label: 'TextArea Title'
}

export const Subtitle = Template.bind({})
Subtitle.args = {
  label: 'TextArea Title',
  subtitle: 'TextArea Subtitle'
}

export const Error = Template.bind({})
Error.args = {
  valid: false,
  required: true,
  label: 'TextArea Error',
  error: "You've Made an Error!"
}

export const NoTitle = Template.bind({})
NoTitle.args = {
  hideLabel: true
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  label: 'TextArea Placeholder',
  placeholder: 'Custom Placeholder'
}
