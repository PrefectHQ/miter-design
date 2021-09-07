import NumberInput from './NumberInput.vue'

export default {
  title: 'Miter Design/Number Input',
  component: NumberInput,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4556'
    }
  }
}

const Template = (args) => ({
  components: { NumberInput },
  setup() {
    return { args }
  },
  template: '<NumberInput />'
})

export const Default = Template.bind({})
