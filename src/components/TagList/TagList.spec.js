import { mount } from '@vue/test-utils'
import TagList from './TagList'
import Tags from "@/components/Tags/Tags";

describe('icon prop', () => {
    test('passes an icon as a prop', () => {
        const wrapper = mount(TagList, {
            props: {
                icon: 'pi-earth-line'
            }
        })

        expect(wrapper.findAll('i').length).toEqual(1)
    })
})

describe('tags prop', () => {
    test('check if computed property return "--" when no props passed', () => {
        const wrapper = mount(TagList)

        expect(wrapper.vm.internalTags).toStrictEqual("--")
    })

    test('check if internalTags computed property returns values passed through props under the limit', async () => {
        const wrapper = mount(TagList)

        await wrapper.setProps({ tags: ["a", "b"] })
        expect(wrapper.vm.internalTags).toStrictEqual("a, b" )
    })

    test('check if internalTags computed property returns correct value passed through props above the limit', async () => {
        const wrapper = mount(TagList)

        await wrapper.setProps({ tags: ["Orion", "Nebula", "Production", "Label", "Label", "Label"] })
        expect(wrapper.vm.internalTags).toStrictEqual(`6 Tags...` )
    })
})
