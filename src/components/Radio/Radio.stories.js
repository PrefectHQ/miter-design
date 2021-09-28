import Radio from './Radio.vue'

export default {
  title: 'Miter Design/Radio',
  component: Radio,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4412'
    }
  }
}

const Template = (args) => ({
  components: { Radio },
  setup() {
    return { args }
  },
  template: '<Radio v-bind="args" >{{ args.content }}</Radio>'
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
