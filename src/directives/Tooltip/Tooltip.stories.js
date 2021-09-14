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

export const TopTooltip = Template.bind({})
TopTooltip.storyName = 'Top/Default'
TopTooltip.args = {
  template: '<Tag v-tooltip:[args.position]="args.text">Tag</Tag>',
  text: 'Top',
  position: 'top'
}

export const RightTooltip = Template.bind({})
RightTooltip.storyName = 'Right'
RightTooltip.args = {
  template: '<Button v-tooltip:[args.position]="args.text">Button</Button>',
  text: 'Right',
  position: 'right'
}

export const BottomTooltip = Template.bind({})
BottomTooltip.storyName = 'Bottom'
BottomTooltip.args = {
  template:
    '<div v-tooltip:[args.position]="args.text" style="border: solid red">div</div>',
  text: '<strong>Bottom</strong>',
  position: 'bottom'
}

export const LeftTooltip = Template.bind({})
LeftTooltip.storyName = 'Left'
LeftTooltip.args = {
  template: '<Tag v-tooltip:[args.position]="args.text">Left</Tag>',
  text: '<em>Left</em>',
  position: 'left'
}
