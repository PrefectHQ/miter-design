import TagGroup from './TagGroup.vue'
import Tag from '../Tag/Tag.vue'
import { reactive } from 'vue'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Miter Design/TagGroup',
  component: TagGroup,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4411'
    }
  }
}

const Template = (args) => ({
  components: { TagGroup, Tag },
  setup() {
    const val = reactive(args.modelValue)
    return { args, val }
  },
  template: `<TagGroup v-model="val" v-bind="args" >
    ${args.content ? args.content : ''}
  </TagGroup>
  `
})

export const Mandatory = Template.bind({})
Mandatory.args = {
  modelValue: ['0'],
  mandatory: true,
  content:
    '<Tag value="0" color="primary">Tag 1</Tag> <Tag value="1" color="primary-hover">Tag 2</Tag> <Tag value="2">Tag 3</Tag>'
}

export const Single = Template.bind({})
Single.args = {
  modelValue: ['0'],
  content:
    '<Tag value="0" color="primary">Tag 1</Tag> <Tag value="1" color="primary-hover">Tag 2</Tag>'
}

export const Multiple = Template.bind({})
Multiple.args = {
  modelValue: ['0', '1'],
  multiple: true,
  content:
    '<Tag value="0" color="primary">Tag 1</Tag> <Tag value="1" color="primary-hover">Tag 2</Tag> <Tag value="2">Tag 3</Tag>'
}

export const Default = Template.bind({})
Default.args = {
  modelValue: [0]
}
