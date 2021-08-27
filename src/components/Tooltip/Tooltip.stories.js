import Tooltip from './Tooltip.vue'
import Tag from '../Tag/Tag.vue'

import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Miter Design/Tooltip',
  component: Tooltip,
  decorators: [withDesign],
  argTypes: {
    text: {
      control: {
        type: 'text'
      }
    },
    default: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A6528'
    }
  }
}

const css = `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
`

const Template = (args) => ({
  components: { Tooltip, Tag },
  setup() {
    return { args }
  },
  template: `
  <div style="${css}">
    <Tooltip v-bind="args">
        <template #text>${args.text ? args.text : ''}</template>
        <template #default>
           ${args.default ? args.default : ''}
        </template>
    </Tooltip>
  </div>
  `
})

export const Default = Template.bind({})
Default.args = {
  text: '<span style="color:yellow; text-decoration: underline;">Text</span>',
  default: '<i class="pi pi-Info-Question-Mark pi-3x" />'
}

export const Right = Template.bind({})
Right.args = {
  right: true,
  text: 'Tooltip',
  default: '<i class="pi pi-Info-Question-Mark pi-3x" />'
}

export const Left = Template.bind({})
Left.args = {
  left: true,
  text: 'Tooltip',
  default: 'Text'
}

export const Bottom = Template.bind({})
Bottom.args = {
  bottom: true,
  text: 'Tooltip',
  default: '<Tag>Tag</Tag>'
}
