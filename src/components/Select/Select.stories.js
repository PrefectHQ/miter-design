import Select from './Select.vue'
// import '@/styles/components/select.scss'

export default {
  title: 'Miter Design/Select',
  component: Select,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A1030'
    }
  }
}

const Template = (args) => ({
  components: { Select },
  data() {
    return { value: null }
  },
  setup() {
    return { args }
  },
  template: '<Select v-model="value" v-bind="args" />'
})

const options = [
  { label: 'One', value: 'one' },
  { label: 'Two', value: 'two' },
  { label: 'Three', value: 'three', disabled: true },
  { label: 'Group One', options: [
    { label: 'Three', value: 'three' },
    { label: 'Four', value: 'four' },
  ]},
  { label: 'Group Two', disabled: true, options: [
    { label: 'Five', value: 'five' },
    { label: 'Six', value: 'six' },
  ]},
  { label: 'Group With Icons', options: [
    { label: 'Seven', value: 'seven', icon: 'map-pin-user-line' },
    { label: 'Eight', value: 'eight', icon: 'map-pin-range-line' },
    { label: 'Nine', value: 'nine', icon: 'map-pin-add-line' },
  ]}
]

export const Default = Template.bind({})
Default.args = {
  search: false,
  disabled: false,
  required: false,
  placeholder: 'Choose an Option',
  options
}
