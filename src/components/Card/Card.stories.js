import Card from './Card.vue'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Miter Design/Card',
  component: Card,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=488%3A2086'
    }
  }
}

const Template = (args) => ({
  components: { Card },
  setup() {
    return { args }
  },
  template: '<Card v-bind="args" />'
})

export const Blank = Template.bind({})
Blank.args = {
  style: {
    width: '400px'
  }
}
