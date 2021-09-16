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
  template: '<Card v-bind="args"><h2>Title</h2> <div>Content</div></Card>'
})

export const Blank = Template.bind({})
Blank.args = {
  style: {
    width: '400px'
  }
}

export const Mitered = Template.bind({})
Mitered.args = {
  miter: true,
  style: {
    width: '400px',
    height: '600px'
  }
}

export const Shadowed = Template.bind({})
Shadowed.args = {
  shadow: 'lg',
  style: {
    width: '400px',
    height: '600px'
  }
}
