import { DirectiveBinding, ObjectDirective } from '@vue/runtime-dom'
import { calculatePlacementPositionStyles, isPlacement, Placement } from '@/utilities/position'
import { nextTick } from 'vue'

class Tooltip {

  public id: string

  private el!: HTMLDivElement
  private placement!: Placement
  private target: HTMLElement

  private static increment = 0

  constructor(target: HTMLElement, content: string, placement?: Placement) {
    this.target = target
    this.id = Tooltip.generateId()

    this.setPlacement(placement)
    this.createElement(content)
  }

  public async show() {
    document.body.appendChild(this.el)

    await nextTick()

    this.updatePosition()
  }

  public hide() {
    this.el.remove()
  }

  public setContent(content: string): void {
    const contentElement = this.el.querySelector<HTMLDivElement>('.tooltip__content')

    contentElement!.innerText = content
  }

  public setPlacement(placement?: Placement): void {
    const value = placement || 'top'

    if(!isPlacement(value)) {
      throw(`Error in v-tooltip: ${value} is not a valid placement`)
    }

    this.placement = value
  }

  public setTarget(target: HTMLElement): void {
    this.target = target
  }

  public updatePosition() {
    const { top, left } = calculatePlacementPositionStyles(this.placement, this.target, this.el)

    this.el.style.top = top
    this.el.style.left = left
  }

  private static generateId() {
    return `tooltip-${this.increment++}`
  }

  private createElement(value: string = '') {
    const tooltip = document.createElement('div')
    const content = document.createElement('div')
    
    content.classList.add('tooltip__content')
    content.innerText = value
    
    tooltip.classList.add('tooltip')
    tooltip.classList.add(`tooltip--${this.placement}`)
    tooltip.id = this.id
    
    tooltip.appendChild(content)
    
    this.el = tooltip
  }

}

export interface TooltipElement extends HTMLElement {
  _tooltip: Tooltip
}

export const TooltipDirective: ObjectDirective = {
  mounted(el: TooltipElement, binding: DirectiveBinding) {
    el._tooltip = new Tooltip(el, binding.value, binding.arg as Placement)
    
    el.setAttribute('aria-labelledby', el._tooltip.id)

    el.addEventListener('mouseenter', () => el._tooltip.show())
    el.addEventListener('mouseleave', () => el._tooltip.hide())
  },
  updated(el: TooltipElement, binding: DirectiveBinding) {
    el._tooltip.setPlacement(binding.arg as Placement)
    el._tooltip.setContent(binding.value)
  }
}

export default TooltipDirective
