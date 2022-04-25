import { mount } from '@vue/test-utils'
import Loader from './Loader.vue'

describe('Loader', () => {

  test('loader loading prop defaults to false', () => {
    const loader = mount(Loader)

    expect(loader.props().loading).toBe(false)
  })

  test('loader shows when loading prop is true', () => {
    const loader = mount(Loader, {
      props: {
        loading: true
      }
    })

    expect(loader.find('[data-test="loader"').isVisible()).toBe(true)
  })

  test('loader does not show when loading prop is false', () => {
    const loader = mount(Loader, {
      props: {
        loading: false
      }
    })
    
    expect(loader.find('[data-test="loader"').exists()).toBe(false)
  })

})
