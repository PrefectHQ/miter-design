import Popup from './Popup.vue'
import PopupContent from './PopupContent.vue'
import { ref } from 'vue'
import Button from '../Button/Button.vue'

export default {
  title: 'Miter Design/Popup',
  component: Popup,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A1557'
    }
  }
}

const Template = (args) => ({
  components: { Popup, Button, PopupContent },
  setup() {
    const val = ref(args.val)
    const el = document.createElement('div')
    document.body.appendChild(el)
    return { args, val }
  },
  template: `<Popup v-model="val" v-bind="args"><template v-slot:activate>${args.activate}</template><template v-if="args.popupContent" v-slot:content>${args.popupContent}</template><template v-if="args.popupActions" v-slot:actions>${args.popupActions}</template>
  </Popup>
  `
})

export const Center = Template.bind({})
Center.args = {
  val: true,
  position: 'center',
  title: 'Pop Up',
  width: '180px',
  activate: `<Button v-bind="args" color="primary" @click="val = true">Button</Button>`,
  popupContent: `<div>Pop Up Content</div>`,
  popupActions: `<Button color="primary">Blank Button</Button>`
}

export const FlexEnd = Template.bind({})
FlexEnd.args = {
  val: true,
  position: 'flex-end',
  title: 'Pop Up',
  width: '180px',
  activate: `<Button v-bind="args" color="primary" @click="val = true">Button</Button>`
}
