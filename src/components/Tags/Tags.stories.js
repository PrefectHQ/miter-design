import Tags from './Tags.vue'

export default {
    title: 'Miter Design/Tags',
    component: Tags,
    args: {
        content: 'Tags'
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=1080%3A4411'
        }
    }
}

const Template = (args) => ({
    components: { Tags },
    setup() {
        return { args }
    },
    template: `<Tags v-bind="args">
    ${args.content}
  </Tags>`
})

export const Default = Template.bind({})

export const DefaultLimited = Template.bind({})
DefaultLimited.args = {
    tags: ["Apollo", "Orion", "Production"],
}

export const ManuallyLimited = Template.bind({})
ManuallyLimited.args = {
    tags: ["Apollo", "Orion", "Production"],
    limit: 2
}

export const DefaultLimitedLongList = Template.bind({})
DefaultLimitedLongList.args = {
    tags: ["Apollo", "Orion", "Production", "Label", "Label2", "Label3"],
    icon: 'pi-earth-line'
}