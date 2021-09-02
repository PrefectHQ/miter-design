import ToggleSwitch from './ToggleSwitch.vue'

export default {
  title: 'Miter Design/ToggleSwitch',
  component: ToggleSwitch,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=488%3A1087'
    }
  }
}

const Template = (args) => ({
  components: { ToggleSwitch },
  setup() {
    return { args }
  },
  template: '<ToggleSwitch v-bind="args" >{{ args.content }}</ToggleSwitch>'
})

export const Toggled = Template.bind({})
Toggled.args = {
  value: true,
  content: 'Toggled'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  content: 'Disabled'
}
