import TimeInput from './TimeInput.vue'
import '@/styles/components/time-input.scss'

export default {
  title: 'Miter Design/Time Input',
  component: TimeInput,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4350'
    }
  }
}

const Template = (args) => ({
  components: { TimeInput },
  setup() {
    return { args }
  },
  template: '<TimeInput />'
})

export const Default = Template.bind({})
