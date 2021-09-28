import Toast from './Toast.vue'

export default {
  title: 'Miter Design/Toast',
  component: Toast,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JomY9jsgJdal9wfPBtpWkY/UI?node-id=897%3A21779'
    }
  }
}

const Template = (args) => ({
  components: { Toast },
  methods: {
    addToast() {
      this.$toast.add({ ...args })
    }
  },
  setup() {
    return { args }
  },
  template: `<Toast v-bind="args" />`
})

export const Default = Template.bind({})
Default.args = {
  content: 'Hello'
}

export const Success = Template.bind({})
Success.args = {
  type: 'success',
  content: 'Success!'
}

export const Error = Template.bind({})
Error.args = {
  type: 'error',
  content: 'Error!'
}
