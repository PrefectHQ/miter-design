import '@/styles/components/tooltip.scss'
import { DirectiveBinding, ObjectDirective, VNode } from '@vue/runtime-dom'

export const TooltipDirective: ObjectDirective = {
  mounted(el: any, binding: DirectiveBinding, vNode: VNode) {
    const template = `
      <div class="tooltip">
        <div class="tooltip-inner">
        </div>
      </div>
      `

    el.classList.add('tooltip-box')

    // NOTE: Creates template and appends it below the current el
    const tooltipGenerator = window.document.createElement('div')
    tooltipGenerator.innerHTML = template.trim()
    const tooltipNode = tooltipGenerator.childNodes[0]
    el.appendChild(tooltipNode)

    const position = binding.arg || 'top'
    el.classList.add(position)

    // NOTE: Text Content
    const content = tooltipNode.querySelector('.tooltip-inner')
    content.innerHTML = binding.value
  },
  updated(el: any, binding: DirectiveBinding, vNode: VNode) {
    el.classList.add('tooltip-box')

    const position = binding.arg || 'top'
    el.classList.add(position)
  },
  unmounted(el: any, binding: DirectiveBinding, vNode: VNode) {}
}

export default TooltipDirective
