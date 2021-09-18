import { App, createApp } from 'vue'
import { DirectiveBinding, ObjectDirective, VNode } from '@vue/runtime-dom'

const breakpoints = {
  xs: 450,
  sm: 640,
  md: 1000,
  lg: 1250,
  xl: 1440
}

const plugin = {
  install(app: App, options: any = {}) {
    const _breakpoints: { [key: string]: number } = {
      ...options,
      ...breakpoints
    }

    const EventBus = new Comment('breakpoint-event-bus')

    const update = () => {
      const width = window.innerWidth

      Object.entries(_breakpoints).forEach(([key, value]) => {
        const k = `breakpoint-change-${key}`
        const previous = app.config.globalProperties[k]
        const current = width < value

        if (current !== previous) {
          EventBus.dispatchEvent(
            new CustomEvent<number>(k, {
              detail: window.innerWidth
            })
          )

          app.config.globalProperties[k] = current
        }
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

    let ref: EventListener
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
      ref = listener(el, binding, placeholder)
      EventBus.addEventListener(k, ref)
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
        EventBus.removeEventListener(`breakpoint-change-${key}`, ref)
      }
    })
  }
}

export default plugin
