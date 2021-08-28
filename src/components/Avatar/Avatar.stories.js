import Avatar from './Avatar.vue'
import { withDesign } from 'storybook-addon-designs'

export default {
  component: Avatar,
  title: 'Miter Design/Avatar',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4349'
    }
  }
}

const Template = (args) => ({
  components: { Avatar },
  setup() {
    return { args }
  },
  template: `
  <Avatar v-bind="args">
  ${args.content ? args.content : ''}
  </Avatar>
  `
})

export const Primary = Template.bind({})
Primary.args = {
  content: 'TS'
}

export const Image = Template.bind({})
Image.args = {
  content: `<img
          src="https://images.ctfassets.net/gm98wzqotmnx/ZXkXAGWyYCBGhH4B1p123/6284ca02f0acee1644a3ed64d84432a7/marvin.png"
          alt="marvin"
        />`
}

export const Icon = Template.bind({})
Icon.args = {
  color: 'error',
  content: `<i class="pi pi-Fire pi-2x"></i>`
}
