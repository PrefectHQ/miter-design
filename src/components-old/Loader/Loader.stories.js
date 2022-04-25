import Loader from './Loader.vue'

export default {
  title: 'Miter Design/Loader',
  component: Loader,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=739%3A734'
    }
  }
}

const Template = (args, argTypes) => ({
  components: { Loader },
  setup() {
    return { args }
  },
  template: `<loader v-bind="args" />`
})

export const Default = Template.bind({})
Default.args = {
  loading: true
}
