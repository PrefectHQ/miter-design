import Popover from './Popover.vue'
import Button from '../Button/Button.vue'

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
  components: { Popover, Button },
  setup() {
    return { args }
  },
  template: `
    <Popover v-bind="args">
      <template v-slot:trigger="{ open, close }">
        ${args.trigger}
      </template>
      <template v-slot:default>
        ${args.default}
      </template>
    </Popover>
  `
})

export const Top = Template.bind({})
Top.args = {
  position: 'top',
  title: 'Pop Over',
  trigger: `<Button @click="open">Popover</Button>`,
  default: `<div>Popover Content</div>`
}

export const Right = Template.bind({})
Right.args = {
  position: 'right',
  title: 'Pop Over',
  trigger: `<Button @click="open">Popover</Button>`,
  default: `<div>Popover Content</div>`
}

export const Left = Template.bind({})
Left.args = {
  position: 'left',
  title: 'Pop Over',
  trigger: `<Button @click="open">Popover</Button>`,
  default: `<div>Popover Content</div>`
}

export const Bottom = Template.bind({})
Bottom.args = {
  position: 'bottom',
  title: 'Pop Over',
  trigger: `<Button @click="open">Popover</Button>`,
  default: `<div>Popover Content</div>`
}

export const MouseOver = Template.bind({})
MouseOver.args = {
  position: 'bottom',
  title: 'Pop Over',
  trigger: `<Button @mouseenter="open" @mouseleave="close">Popover</Button>`,
  default: `<div>Popover Content</div>`
}

export const WithActions = Template.bind({})
WithActions.args = {
  position: 'bottom',
  title: 'Pop Over',
  trigger: `<Button @mouseenter="open">Popover</Button>`,
  default: `<div><div>Popover Content</div> <div class="mt-2" ><Button>Action</Button><Button @click="val=false" class="ml-2" >Close</Button></div></div>`
}
