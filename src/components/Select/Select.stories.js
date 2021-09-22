import Select from './Select.vue'
import OptionGroup from './OptionGroup.vue'
import Option from './Option.vue'
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
  components: { Select, OptionGroup, Option },
  setup() {
    return { args }
  },
  template: `<Select v-bind="args">
    ${args.content}
  </Select>`
})

export const Default = Template.bind({})
Default.args = {
  content:
    '<Option value="First" /><Option value="Second" /><Option value="Third" />'
}

export const Search = Template.bind({})
Search.args = {
  search: true,
  content:
    '<Option value="First" /><Option value="Second" /><Option value="Third" />'
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder: 'Placeholder Text',
  content:
    '<Option value="First" /><Option value="Second" /><Option value="Third" />'
}

export const Grouped = Template.bind({})
Grouped.args = {
  content:
    '<OptionGroup label="Section 1"><Option value="First" /><Option value="Second" /><Option value="Third" /></OptionGroup><OptionGroup label="Section 2"><Option value="Fourth" /><Option value="Fifth" /><Option value="Sixth" /></OptionGroup>'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  content: '<Option value=1 />'
}

export const DisabledGroup = Template.bind({})
DisabledGroup.args = {
  content:
    '<OptionGroup label="Section 1" disabled><Option value="First" /><Option value="Second" /><Option value="Third" /></OptionGroup><OptionGroup label="Section 2"><Option value="Fourth" /><Option value="Fifth" /><Option value="Sixth" /></OptionGroup>'
}

export const DisabledOption = Template.bind({})
DisabledOption.args = {
  content:
    '<Option value="First" /><Option value="Second" disabled /><Option value="Third" />'
}

export const Icon = Template.bind({})
Icon.args = {
  content:
    '<Option value="First" icon="star-line" /><Option value="Second" icon="user-smile-line" /><Option value="Third" icon="bug-2-line" />'
}
