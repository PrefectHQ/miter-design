import { reactive } from 'vue'
import ButtonGroup from './ButtonGroup.vue'

export default {
  title: 'Miter Design/Button Group',
  component: ButtonGroup,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JomY9jsgJdal9wfPBtpWkY/UI?node-id=234%3A8227'
    }
  }
}

const Template = (args) => ({
  components: { ButtonGroup },
  setup() {
    const { value, slot, ...props } = args
    const internalValue = reactive(value ?? [])

    return { internalValue, slot, props }
  },
  template: `
    <ButtonGroup v-model:value="internalValue" v-bind="props">
      <template #default="{ item }">
        ${args.slot ?? ''}
      </template>
    </ButtonGroup>
  `
})

export const Primary = Template.bind({})
Primary.args = {
  items: [
    { value: 'One' },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3, disabled: true },
  ],
  value: ['One']
}