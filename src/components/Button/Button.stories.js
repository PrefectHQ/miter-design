import Button from './Button.vue'
import '@/styles/components/button.scss'

export default {
  title: 'Miter Design/Button',
  component: Button,
  args: {
    content: 'Button'
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=557%3A627'
    }
  }
}

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args }
  },
  template: `<Button v-bind="args">
    ${args.content}
  </Button>`
})

export const Default = Template.bind({})

export const Primary = Template.bind({})
Primary.args = {
  color: 'primary'
}

export const DefaultIcon = Template.bind({})
DefaultIcon.args = {
  icon: true,
  content: '<i class="pi pi-Fire pi-2x" />'
}

export const PrimaryIcon = Template.bind({})
PrimaryIcon.args = {
  icon: true,
  color: 'primary',
  content: '<i class="pi pi-Fire pi-2x" />'
}
