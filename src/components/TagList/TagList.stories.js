import TagList from './TagList.vue'

export default {
    title: 'Miter Design/TagList',
    component: TagList,
    args: {
        content: 'TagList'
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4411'
        }
    }
}

const Template = (args) => ({
    components: { TagList },
    setup() {
        return { args }
    },
    template: `<TagList v-bind="args">
    ${args.content}
  </TagList>`
})

export const Default = Template.bind({})
Default.args = {
    icon: 'pi-label'
}

export const DefaultLimited = Template.bind({})
DefaultLimited.args = {
    tags: ["Apollo", "Orion", "Production"],
    icon: 'pi-label'
}

export const ManuallyLimited = Template.bind({})
ManuallyLimited.args = {
    tags: ["Apollo", "Orion", "Production"],
    icon: 'pi-label',
    limit: 20
}

export const DefaultLimitedLongList = Template.bind({})
DefaultLimitedLongList.args = {
    tags: ["Apollo", "Orion", "Production", "Label", "Label", "Label"],
    icon: 'pi-label'
}