import Popover from './Popover.vue'
import Tag from '../Tag/Tag.vue'
import Button from '../Button/Button.vue'
import { ref } from 'vue'

export default {
  title: 'Miter Design/Popover',
  component: Popover,
  parameters: {
    design: {
      type: 'figma'
      //NEEDS ADDING
      //   url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A1557'
    }
  }
}

const Template = (args) => ({
  components: { Popover, Tag, Button },
  setup() {
    const val = ref(args.val)
    const el = document.createElement('div')
    document.body.appendChild(el)
    return { args, val }
  },
  template: `<Popover class="ml-5" v-model="val" v-bind="args" currentElRect="popoverTarget"><template v-slot:activate>${args.activate}</template><template v-if="args.content" v-slot:content>${args.content}</template>
  </Popover>
  `
})

export const Center = Template.bind({})
Center.args = {
  val: false,
  position: 'bottom',
  title: 'Pop Over',
  currentElRect: 'popoverTarget',
  activate: `<Button id="popoverTarget" v-bind="args" color="primary" @click="val=!val" >Button</Button>`,
  content: `<div>Popover Content</div>`
}

// export const FlexEnd = Template.bind({})
// FlexEnd.args = {
//   val: true,
//   position: 'flex-end',
//   title: 'Pop Up',
//   width: '180px',
//   activate: `<Button v-bind="args" color="primary" @click="val = true">Button</Button>`
// }
