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
  components: { Button, IconButton },
  setup() {
    return { args }
  },
  template: `${args.template}`
})

export const Primary = Template.bind({})
Primary.args = {
  template: `<Button :color="args.color">{{args.content}}</Button>`,
  color: 'primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  template: `<Button :color="args.color" v-bind="args">{{args.content}}</Button>`,
  color: 'secondary',
  flat: false,
  height: 'inherit',
  width: 'inherit'
}

export const SecondaryLight = Template.bind({})
SecondaryLight.args = {
  template: `<Button :color="args.color">{{args.content}}</Button>`,
  color: 'secondary light'
}

export const Delete = Template.bind({})
Delete.args = {
  template: `<Button :color="args.color">{{args.content}}</Button>`,
  color: 'delete'
}

export const Alternate = Template.bind({})
Alternate.args = {
  template: `<Button :color="args.color">{{args.content}}</Button>`,
  color: 'alternate'
}

export const Mitered = Template.bind({})
Mitered.args = {
  template: `<Button :miter="args.mitered">{{args.content}}</Button>`,
  mitered: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  template: `<Button :disabled="args.disabled">{{args.content}}</Button>`,
  disabled: true
}

export const TextIcon = Template.bind({})
TextIcon.args = {
  template: `
  <Button :icon="args.icon">
   {{args.content}}
  </Button>
  `,
  icon: 'fullscreen-line',
  content: 'Primary'
}

export const DefaultIcon = Template.bind({})
DefaultIcon.args = {
  template: `<IconButton></IconButton>`
}

export const Icon = Template.bind({})
Icon.args = {
  template: `<IconButton :icon="args.icon" v-bind="args">{{args.content}}</IconButton>`,
  icon: 'subtract-line',
  color: ''
}

export const DisabledIcon = Template.bind({})
DisabledIcon.args = {
  template: `<IconButton :icon="args.icon" :disabled="args.disabled">{{args.content}}</IconButton>`,
  icon: 'fullscreen-line',
  disabled: true
}
