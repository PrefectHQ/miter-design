import Select from './Select.vue'
import '@/styles/components/select.scss'

export default {
  title: 'Miter Design/Select',
  component: Select,
  args: {
    content: 'Select'
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A1030'
    }
  }
}

const Template = (args) => ({
  components: { Select },
  setup() {
    return { args }
  },
  template: `<Select v-bind="args">
    ${args.content}
  </Select>`
})

export const Default = Template.bind({})

export const Search = Template.bind({})
Search.args = {
  search: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const Title = Template.bind({})
Title.args = {
  title: 'Select with Title'
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder: 'Placeholder Text'
}

export const Icon = Template.bind({})
Icon.args = {
  icon: 'Star'
}
