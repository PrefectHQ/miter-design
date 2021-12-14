import { mount } from '@vue/test-utils'
import Tags from './Tags'
import Tag from "@/components/Tag/Tag";

describe('icon prop', () => {
    test('passes an icon as a prop', () => {
        const wrapper = mount(Tags, {
            props: {
                icon: 'pi-earth-line'
            }
        })

        expect(wrapper.findAll('i').length).toEqual(1)
    })
})

describe('styling props', () => {
    test('passes styling classes when passed as props', () => {
        const wrapper = mount(Tags, {
            props: {
                disabled: true,
                outlined: true,
                hovered: true,
                elevated: true,
                flat: true
            }
        })

        const tags = wrapper.get('.tag-wrapper')
        expect(tags.classes()).toContain('disabled')
        expect(tags.classes()).toContain('outlined')
        expect(tags.classes()).toContain('hovered')
        expect(tags.classes()).toContain('elevated')
        expect(tags.classes()).toContain('flat')
    })

    test('does not pass styling classes when styling classes are not passed as props', () => {
        const wrapper = mount(Tags, {
            props: {
                disabled: false,
                outlined: false,
                hovered: false,
                elevated: false,
                flat: false
            }
        })

        const tags = wrapper.get('.tag-wrapper')
        expect(tags.classes()).not.toContain('disabled')
        expect(tags.classes()).not.toContain('outlined')
        expect(tags.classes()).not.toContain('hovered')
        expect(tags.classes()).not.toContain('elevated')
        expect(tags.classes()).not.toContain('flat')
    })
})

describe('color prop', () => {
    test('passes the color prop as a class', async () => {
        const wrapper = mount(Tags, {
            props: { color: 'primary' }
        })

        await wrapper.setProps({ color: 'secondary' })
        const tags = wrapper.get('.tag-wrapper')
        expect(tags.classes()).toContain('secondary')
    })
})

describe('tags prop', () => {
    test('check if computed property return "--" when no props passed', () => {
        const wrapper = mount(Tags)

        expect(wrapper.vm.internalTags).toStrictEqual(["--"])
    })

    test('check if computed property returns values passed through props', async () => {
        const wrapper = mount(Tags)

        await wrapper.setProps({ tags: ["a", "b"] })
        expect(wrapper.vm.internalTags).toStrictEqual(["a", "b"] )
    })
})