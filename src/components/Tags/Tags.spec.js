import { mount } from '@vue/test-utils'
import Tags from './Tags.vue'

describe('icon prop', () => {
    test('passes an icon as a prop', () => {
        const wrapper = mount(Tags, {
            props: {
                icon: 'pi-earth-line'
            }
        })

        const icon = wrapper.get('i')
        expect(icon.classes()).toStrictEqual(["pi", "tags__icon", "pi-earth-line"])
    })
})

describe('tags prop', () => {
    test('check if computed property return "--" when no props passed', () => {
        const wrapper = mount(Tags)

        expect(wrapper.vm.internalTags).toStrictEqual("--")
    })

    test('check if internalTags computed property returns values passed through props under the limit', async () => {
        const wrapper = mount(Tags)

        await wrapper.setProps({ tags: ["a", "b"] })
        expect(wrapper.vm.internalTags).toStrictEqual("a, b" )
    })

    test('check if internalTags computed property returns correct value passed through props above the limit', async () => {
        const wrapper = mount(Tags)

        await wrapper.setProps({ tags: ["Orion", "Nebula", "Production", "Label", "Label", "Label"] })
        expect(wrapper.vm.internalTags).toStrictEqual("Orion, Nebula, Production, Label" )
    })
})
