import Input from './Input.vue'
import Toggle from '../Toggle/ToggleSwitch.vue'

export default {
  title: 'Miter Design/Input',
  component: Input,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4648'
    }
  }
}

const Template = (args, argTypes) => ({
  components: { Input, Toggle },
  data() {
    return { value: 'hello',}
  },
  setup() {
      return {args}
  },
  template: `<Input v-bind="args" v-model="value"><template v-if="args.prependSlot" v-slot:prepend>${args.prependSlot}</template><template v-if="args.appendSlot" v-slot:append>${args.appendSlot}</template></Input>`
})

export const Default = Template.bind({})
Default.args = {
  disabled: false,
  label: "Default",
  validityIcon: true,
  prependSlot: `<i class="pi pi-Fire pi-2x"></i>`
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  label: 'Disabled',
  validityIcon: true,
  prependSlot: `<i class="pi pi-Fire pi-2x"></i>`
}

export const Error = Template.bind({})
Error.args = {
  valid: false,
  label: 'Error',
  validityIcon: true,
  prependSlot: `<i class="pi pi-Fire pi-2x"></i>`
}

export const NoLabel = Template.bind({})
NoLabel.args = {
  valid: true,
  validityIcon: true,
  hideLabel: true,
  prependSlot: `<i class="pi pi-Fire pi-2x"></i>`
}

export const NoLabelOrIcon = Template.bind({})
NoLabelOrIcon.args = {
  valid: true,
  hideLabel: true,
  prependSlot: `<i class="pi pi-Fire pi-2x"></i>`
}

export const NoValidityIcon = Template.bind({})
NoValidityIcon.args = {
  valid: true,
  prependSlot: `<i class="pi pi-Fire pi-2x"></i>`,
  validityIcon: false,
}

export const Switch = Template.bind({})
Switch.args = {
  valid: true,
  prependSlot: `<i class="pi pi-Fire pi-2x"></i>`,
  validityIcon: false,
  appendSlot: `<Toggle :style="{position: 'static'}" />`
}




