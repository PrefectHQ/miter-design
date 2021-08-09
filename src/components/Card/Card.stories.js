import Card from './Card.vue'

export default {
  title: 'Miter Design/Card',
  component: Card
}

const Template = (args) => ({
  components: { Card },
  setup() {
    return { args }
  },
  template: '<Card v-bind="args" />'
})

export const Blank = Template.bind({})
Blank.args = {
  style: {
    width: '400px'
  }
}
