import Checkbox from './Checkbox.vue'

export default {
  title: 'Checkbox',
  component: Checkbox
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
