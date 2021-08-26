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
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4414'
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

export const Outlined = Template.bind({})
Outlined.args = {
  color: 'outlined'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const DefaultIcon = Template.bind({})
DefaultIcon.args = {
  icon: true,
  content: '<i class="pi pi-Bug pi-2x" />'
}

export const PrimaryIcon = Template.bind({})
PrimaryIcon.args = {
  icon: true,
  color: 'primary',
  content: '<i class="pi pi-Bug pi-2x" />'
}

export const DisabledIcon = Template.bind({})
DisabledIcon.args = {
  icon: true,
  disabled: true,
  content: '<i class="pi pi-Bug pi-2x" />'
}
