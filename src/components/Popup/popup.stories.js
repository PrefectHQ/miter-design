import Popup from './Popup.vue'
import PopupContent from './PopupContent.vue'
import { reactive } from 'vue'
import Button from '../Button/Button.vue'
// import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Miter Design/Popup',
  component: Popup,
//   decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A1557'
    }
  },
}

const Template = (args) => ({
  components: { Popup, Button, PopupContent },
  setup() {
    const val = reactive(args.modelValue)
    const el = document.createElement('div')
    el.id = 'app'
    document.body.appendChild(el)
    return { args, val }
  },
  template: `<Popup v-model="val" v-bind="args"><template v-slot:activate>${args.activate}</template><template v-if="args.popupContent" v-slot:content>${args.popupContent}</template>
  </Popup>
  `
})

export const Center = Template.bind({})
Center.args = {
  modelValue: true,
  position: 'center',
  title: 'Pop Up',
  activate: `<Button v-bind="args" color="primary">Button</Button>`,
  popupContent: `<PopupContent v-bind="args"><template v-slot:content>Pop Up Content</template></PopupContent>`,
}

export const FlexEnd = Template.bind({})
FlexEnd.args = {
  modelValue: true,
  position: 'flex-end',
  title: 'Pop Up',
  activate: `<Button v-bind="args" color="primary">Button</Button>`,
}
