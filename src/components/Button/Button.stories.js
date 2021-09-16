import Button from './Button.vue'
import IconButton from './IconButton.vue'
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
      url: 'https://www.figma.com/file/JomY9jsgJdal9wfPBtpWkY/UI?node-id=265%3A25603'
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

export const Primary = Template.bind({})
Primary.args = {
  color: 'primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  color: 'secondary'
}

export const SecondaryLight = Template.bind({})
SecondaryLight.args = {
  color: 'secondary light'
}

export const Alternate = Template.bind({})
Alternate.args = {
  color: 'alternate'
}

export const Mitered = Template.bind({})
Mitered.args = {
  miter: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const DefaultIcon = () => <IconButton icon="bug-2-line"></IconButton>

export const DisabledIcon = () => (
  <IconButton icon="bug-2-line" disabled></IconButton>
)
