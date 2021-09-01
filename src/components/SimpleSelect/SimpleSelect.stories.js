import SimpleSelect from './SimpleSelect.vue'
import '@/styles/components/simple-select.scss'

export default {
  title: 'Miter Design/Simple Select',
  component: SimpleSelect,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4350'
    }
  }
}

const Template = (args) => ({
  components: { SimpleSelect },
  setup() {
    return { args }
  },
  template: '<SimpleSelect />'
})

export const Default = Template.bind({})
