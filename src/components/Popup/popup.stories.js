import Popup from './Popup.vue'
import PopupContent from './PopupContent.vue'
import Card from '../Card/Card.vue'
import { reactive } from 'vue'
import Button from '../Button/Button.vue'
// import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Miter Design/Popup',
  component: Popup,
  args: {
      activate: Button, 
      content: `<PopupContent>{{Card}}</PopupContent>`
  },
//   decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A1557'
    }
  }
}

const Template = (args) => ({
  components: { Popup },
  setup() {
    const el = document.createElement('div')
    el.id = 'app'
    document.body.appendChild(el)
    return { args }
  },
  template: `<Popup v-model="modelValue" v-bind="args">{{activate}}
  </Popup>
  `,
  activate: Button,
  popupContent: `<PopupContent v-bind="args" v-model="modelValue">{{test}}</PopupContent>`
})

export const Center = Template.bind({})
Center.args = {
  modelValue: true,
  position: 'center',
  title: 'Pop Up',
  activate: Button,
}

export const FlexEnd = Template.bind({})
FlexEnd.args = {
  modelValue: true,
  position: 'flex-end',
  title: 'Pop Up',
}

// export const Single = Template.bind({})
// Single.args = {
//   modelValue: ['0'],
//   content:
//     '<Tag value="0" color="primary">Tag 1</Tag> <Tag value="1" color="primary-101">Tag 2</Tag>'
// }

// export const Multiple = Template.bind({})
// Multiple.args = {
//   modelValue: ['0', '1'],
//   multiple: true,
//   content:
//     '<Tag value="0" color="primary">Tag 1</Tag> <Tag value="1" color="primary-101">Tag 2</Tag> <Tag value="2">Tag 3</Tag>'
// }

// export const Default = Template.bind({})
// Default.args = {
//   modelValue: [0]
// }