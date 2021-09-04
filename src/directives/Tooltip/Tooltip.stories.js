import Tooltip from './Tooltip.ts'
import Button from '@/components/Button/Button.vue'
import Tag from '@/components/Tag/Tag.vue'

export default {
  title: 'Miter Design/Tooltip',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A6528'
    }
  }
}

const css = `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
`

const Template = (args, { argTypes }) => ({
  components: { Button, Tag },
  directives: {
    Tooltip: Tooltip
  },
  setup() {
    return { args }
  },
  template: `
  <div style="${css}">
  ${args.template}
  </div>
  `
})

export const TagTooltip = Template.bind({})
TagTooltip.storyName = 'Top/Default'
TagTooltip.args = {
  template: '<Tag v-tooltip:[args.position]="args.text">Tag</Tag>',
  text: 'Top',
  position: 'top'
}

export const ButtonTooltip = Template.bind({})
ButtonTooltip.storyName = 'Right'
ButtonTooltip.args = {
  template: '<Button v-tooltip:[args.position]="args.text">Button</Button>',
  text: 'Right',
  position: 'right'
}

export const DivTooltip = Template.bind({})
DivTooltip.storyName = 'Bottom'
DivTooltip.args = {
  template:
    '<div v-tooltip:[args.position]="args.text" style="border: solid red">div</div>',
  text: '<strong>Bottom</strong>',
  position: 'bottom'
}

export const SpanTooltip = Template.bind({})
SpanTooltip.storyName = 'Left'
SpanTooltip.args = {
  template:
    '<span v-tooltip:[args.position]="args.text" style="border: solid blue">Left</span>',
  text: '<em>Left</em>',
  position: 'left'
}
