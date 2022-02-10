import Checkbox from './Checkbox.vue'

export default {
  title: 'Miter Design/Checkbox',
  component: Checkbox,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4412'
    }
  }
}

const Template = (args) => ({
  components: { Checkbox },
  setup() {
    return { args }
  },
  template: '<Checkbox v-bind="args" >{{ args.content }}</Checkbox>'
})

export const Checked = Template.bind({})
Checked.args = {
  value: true,
  content: 'Checked'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  content: 'Disabled'
}
