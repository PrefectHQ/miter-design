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
    template: '<Tags v-bind="args" />'
})

export const Default = Template.bind({})

export const EmptyInternalTags = Template.bind({})
EmptyInternalTags.args = {
    tags: [],
    icon: 'pi-label',
    flat: true
}

export const InternalTags = Template.bind({})
InternalTags.args = {
    tags: ["foo", "bar"],
    icon: 'pi-label',
    flat: true
}
