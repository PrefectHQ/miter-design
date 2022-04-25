import TimePicker from './TimePicker.vue'
import { ref } from 'vue'

export default {
  title: 'Miter Design/TimePicker',
  component: TimePicker,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4350'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TimePicker },
  setup() {
    const modelValue = ref(args.modelValue)
    const disabled = ref(args.disabled || false)

    return { ...args, modelValue, disabled }
  },
  template: '<TimePicker v-model="modelValue" :disabled="disabled" />'
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
