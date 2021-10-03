import { App, Plugin, reactive } from 'vue'
import { DirectiveBinding, VNode } from '@vue/runtime-dom'

export type Breakpoints = {
  xs: boolean
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
}
const breakpoints = {
  xs: 450,
  sm: 640,
  md: 1024,
  lg: 1280,
  xl: 1440
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $breakpoints: Breakpoints
  }
}

const BreakpointPlugin: Plugin = {
  install(app: App, options: any = {}) {
    const _breakpoints: { [key: string]: number } = {
      ...options,
      ...breakpoints
    }

    const EventBus = new Comment('breakpoint-event-bus')

    app.config.globalProperties.$breakpoints = reactive({
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false
    })

    const update = () => {
      const width = window.innerWidth

      Object.entries(_breakpoints).forEach(([key, value]) => {
        const k = `breakpoint-change-${key}`
        const previous = app.config.globalProperties.$breakpoints[key]
        const current = width > value

        EventBus.dispatchEvent(
          new CustomEvent<number>(k, {
            detail: window.innerWidth
          })
        )

        app.config.globalProperties.$breakpoints[key] = current
      })
    }

    update()

    window.addEventListener('resize', update)

    const listener = (
      el: any,
      binding: DirectiveBinding,
      placeholder?: Comment
    ) =>
      (({ detail }: CustomEvent<number>) => {
        const value = detail
        if (_breakpoints[binding.value] > value) {
          if (el.parentNode) {
            el.parentNode.replaceChild(placeholder, el)
          }
        } else {
          if (placeholder?.parentNode) {
            placeholder.parentNode.replaceChild(el, placeholder)
          }
        }
      }) as EventListener

    let refElement: EventListener
    const updateListener = (
      el: any,
      binding: DirectiveBinding,
      vNode: VNode
    ) => {
      const key: string = binding.value
      const breakpoint = _breakpoints[key]

      if (!breakpoint) {
        throw new Error(
          `Breakpoints must be a string with a value of ${Object.keys(
            breakpoints
          ).join(', ')}, recieved ${breakpoint}.`
        )
      }

      const placeholder = new Comment(' ')
      const k = `breakpoint-change-${key}`
      refElement = listener(el, binding, placeholder)
      EventBus.addEventListener(k, refElement)
    }

    app.directive('breakpoints', {
      beforeMount(el: any, binding: DirectiveBinding, vNode: VNode) {
        updateListener(el, binding, vNode)
      },
      mounted(el: any, binding: DirectiveBinding, vNode: VNode) {
        const k = `breakpoint-change-${binding.value}`
        EventBus.dispatchEvent(
          new CustomEvent<number>(k, {
            detail: window.innerWidth
          })
        )
      },
      updated(el: any, binding: DirectiveBinding, vNode: VNode) {
        updateListener(el, binding, vNode)
      },
      beforeUnmount(el: any, binding: DirectiveBinding, vNode: VNode) {
        const key: string = binding.value
        EventBus.removeEventListener(`breakpoint-change-${key}`, refElement)
      }
    })
  }
}

export default BreakpointPlugin
