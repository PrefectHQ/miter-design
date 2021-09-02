import RadioButton from './RadioButton.vue'

export default {
  title: 'Miter Design/RadioButton',
  component: RadioButton,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=488%3A1087'
    }
  }
}

const Template = (args) => ({
  components: { RadioButton },
  setup() {
    return { args }
  },
  template: '<RadioButton v-bind="args" >{{ args.content }}</RadioButton>'
})

export const Active = Template.bind({})
Active.args = {
  content: 'Active'
}

export const Selected = Template.bind({})
Selected.args = {
  checked: true,
  content: 'Selected'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  content: 'Disabled'
}
