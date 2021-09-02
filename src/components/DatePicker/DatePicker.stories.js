import DatePicker from './DatePicker.vue'
import { ref } from 'vue'
import '@/styles/components/date-picker.scss'

export default {
  title: 'Miter Design/DatePicker',
  component: DatePicker,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4350'
    },
    controls: {
      matchers: {
        date: /modelValue$/
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DatePicker },
  setup() {
    const modelValue = ref(args.modelValue)
    return { ...args, modelValue }
  },
  template: '<DatePicker v-model="modelValue" />'
})

export const Default = Template.bind({})
Default.args = {
  modelValue: new Date()
}
