import DatePicker from './DatePicker.vue'
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

const Template = (args) => ({
  components: { DatePicker },
  setup() {
    return { args }
  },
  template: '<DatePicker v-model="args.modelValue" />'
})

export const Default = Template.bind({})
Default.args = {
  modelValue: new Date()
}
