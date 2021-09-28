import Toggle from './Toggle.vue'

export default {
  title: 'Miter Design/Toggle',
  component: Toggle,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4412'
    }
  }
}

const Template = (args) => ({
  components: { Toggle },
  setup() {
    return { args }
  },
  template: '<Toggle v-bind="args" >{{ args.content }}</Toggle>'
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
