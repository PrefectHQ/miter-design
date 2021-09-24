import Popover from './Popover.vue'
import Tag from '../Tag/Tag.vue'
import Button from '../Button/Button.vue'
import { ref } from 'vue'

export default {
  title: 'Miter Design/Popover',
  component: Popover,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JomY9jsgJdal9wfPBtpWkY/UI?node-id=265%3A25655'
    },
    layout: 'centered'
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
  template: `<Popover class="ml-5" v-model="val" v-bind="args" ><template v-slot:activate>${args.activate}</template><template v-if="args.content" v-slot>${args.content}</template>
  </Popover>
  `
})

export const Top = Template.bind({})
Top.args = {
  val: false,
  position: 'top',
  title: 'Pop Over',
  target: 'opener',
  activate: `<Button id="opener" v-bind="args" @click="val =!val" >Popover</Button>`,
  content: `<div>Popover Content</div>`
}

export const Right = Template.bind({})
Right.args = {
  val: false,
  position: 'right',
  title: 'Pop Over',
  target: 'opener',
  activate: `<Button id="opener" v-bind="args" @click="val =!val" >Popover</Button>`,
  content: `<div>Popover Content</div>`
}

export const Left = Template.bind({})
Left.args = {
  val: false,
  position: 'left',
  title: 'Pop Over',
  target: 'opener',
  activate: `<Button id="opener" v-bind="args" @click="val =!val" >Popover</Button>`,
  content: `<div>Popover Content</div>`
}

export const MouseOver = Template.bind({})
MouseOver.args = {
  val: false,
  position: 'bottom',
  title: 'Pop Over',
  target: 'opener',
  activate: `<Button id="opener" v-bind="args" @mouseenter="val = true" @mouseleave="val=false">Popover</Button>`,
  content: `<div>Popover Content</div>`
}

export const WithActions = Template.bind({})
WithActions.args = {
  val: false,
  position: 'bottom',
  title: 'Pop Over',
  hasActions: true,
  target: 'opener',
  activate: `<Button id="opener" v-bind="args" @mouseenter="val = true" >Popover</Button>`,
  content: `<div><div>Popover Content</div> <div class="mt-2" ><Button>Action</Button><Button @click="val=false" class="ml-2" >Close</Button></div></div>`
}
