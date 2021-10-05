import Timepicker from './Timepicker.vue'
import { ref } from 'vue'

export default {
  title: 'Miter Design/Timepicker',
  component: Timepicker,
  parameters: {
    design: {
      type: 'figma',
      url: ''
    }
  }
}

const Template = (args) => ({
  components: { Timepicker },
  setup() {
    const modelValue = ref(args.modelValue)
    return { args }
  },
  template: `<Timepicker v-bind="args"/>`
})

export const Default = Template.bind({})
Default.args = {
  modelValue: new Date()
}
