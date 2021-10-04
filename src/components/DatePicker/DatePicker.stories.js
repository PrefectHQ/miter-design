import DatePicker from './DatePicker.vue'
import { ref } from 'vue'

export default {
  title: 'Miter Design/Date Picker',
  component: DatePicker,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JomY9jsgJdal9wfPBtpWkY/UI?node-id=1011%3A26505'
    }
  }
}

const Template = (args) => ({
  components: { DatePicker },
  setup() {
    const modelValue = ref(args.modelValue)
    return { args }
  },
  template: `<DatePicker v-bind="args"></DatePicker>`
})

export const Default = Template.bind({})
Default.args = {
  modelValue: new Date()
}
