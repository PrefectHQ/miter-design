import Timepicker from './Timepicker.vue'
import { ref } from 'vue'

export default {
  title: 'Miter Design/Timepicker',
  component: Timepicker,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4350'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Timepicker },
  setup() {
    const modelValue = ref(args.modelValue)
    const disabled = ref(args.disabled || false)

    return { ...args, modelValue, disabled }
  },
  template: '<Timepicker v-model="modelValue" :disabled="disabled" />'
})

export const Default = Template.bind({})
Default.args = {
  modelValue: new Date()
}

export const Disabled = Template.bind({})
Disabled.args = {
  modelValue: new Date(),
  disabled: true
}
