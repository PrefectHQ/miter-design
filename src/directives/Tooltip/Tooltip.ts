import '@/styles/components/tooltip.scss'
import { DirectiveBinding, ObjectDirective } from '@vue/runtime-dom'

export const applyClass = (el: any, position: any) => {
  if (!el.classList.contains('tooltip-box')) {
    el.classList.add('tooltip-box')
  }

  const positions = ['top', 'right', 'bottom', 'left']
  el.classList.add(positions.includes(position) ? position : positions[0])

  el.setAttribute('aria-labelledby', 'tooltip-container')
}

export const TooltipDirective: ObjectDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    const template = `
      <div role="tooltip" id="tooltip-container" class="tooltip">
        <div class="tooltip-content">
        </div>
      </div>
      `
    applyClass(el, binding.arg)

    const tooltipGenerator = window.document.createElement('div')
    tooltipGenerator.innerHTML = template.trim()
    const tooltipNode = tooltipGenerator.childNodes[0]
    el.appendChild(tooltipNode)

    const content = el.querySelector('.tooltip-content')
    content.innerHTML = binding.value || 'text'
  },
  updated(el: any, binding: DirectiveBinding) {
    applyClass(el, binding.arg)
  },
  unmounted(el: any, binding: DirectiveBinding) {
    el.classList.remove('tooltip-box')
  }
}

export default TooltipDirective
