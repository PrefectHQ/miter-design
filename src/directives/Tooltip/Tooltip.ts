import { DirectiveBinding, ObjectDirective } from '@vue/runtime-dom'
import { render, h, VNode, ComponentOptions, Component, resolveComponent } from 'vue'
import Tooltip from '../../components/Tooltip/Tooltip.vue'

const createElement = () =>
  typeof document !== 'undefined' && document.createElement('div')

export const mount = (
  component: Component,
  { props, children, element, app }: ComponentOptions = {},
  container: Element
) => {
  let el = element ? element : createElement()
  let vNode: VNode | null = h(component, props, children)
  console.log('node', vNode)
  if (app && app._context) {
    vNode.appContext = app._context
  }

  render(vNode, el)

  if (!vNode.el) throw new Error("Couldn't attach vNode to the DOM.")
  vNode.el.setAttribute('id', 'tooltip-container')
  if (container) {
    container.appendChild(vNode.el?.parentElement)
  } else document.body.appendChild(vNode.el?.parentElement)
}


export const TooltipDirective: ObjectDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    if (el) {
      el.style.display = 'inline-block'
      el.setAttribute('aria-labelledby', 'tooltip-container')
      const component = binding.value
      console.log('directive', component, Tooltip)
      el.addEventListener('mouseenter', () => {
        mount(
          Tooltip,
          {
            props: {
              content: '',
              position: binding.arg,
              currentElRect: el.getBoundingClientRect()
            },
            children: h(component)
          },
          
          el
        )
      })
      el.addEventListener('mouseleave', () => {
        console.log('mouse left', document.getElementById('tooltip-container'))
        // document.getElementById('tooltip-container')?.parentElement?.remove()
      })
    }
  }
}

export default TooltipDirective
