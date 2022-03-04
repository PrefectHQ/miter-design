import Tag from './Tag.vue'

export default {
  title: 'Miter Design/Tag',
  component: Tag,
  args: {
    content: 'Tag'
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4411'
    }
  }
}

const Template = (args) => ({
  components: { Tag },
  setup() {
    return { args }
  },
  template: `<Tag v-bind="args">
    ${args.content}
  </Tag>`
})

export const Default = Template.bind({})

export const Primary = Template.bind({})
Primary.args = {
  color: 'primary'
}

export const Outlined = Template.bind({})
Outlined.args = {
  outlined: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const Elevated = Template.bind({})
Elevated.args = {
  elevated: true,
  color: 'primary'
}

export const Flat = Template.bind({})
Flat.args = {
  content: 'Tag',
  icon: 'pi-label',
  flat: true
}

export const Miter = Template.bind({})
Miter.args = {
  content: 'Tag',
  miter: true
}