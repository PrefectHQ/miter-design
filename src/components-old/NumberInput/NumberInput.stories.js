import NumberInput from './NumberInput.vue'
import { ref } from 'vue'

export default {
  title: 'Miter Design/Number Input',
  component: NumberInput,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4556'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NumberInput },
  setup() {
    const modelValue = ref(args.modelValue)
    const min = ref(args.min || 0)
    const max = ref(args.max || 100)
    const step = ref(args.step || 1)
    return { ...args, modelValue, min, max, step }
  },
  template:
    '<NumberInput v-model="modelValue" :min="min" :max="max" :step="step" />'
})

export const Default = Template.bind({})
Default.args = {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1
}
