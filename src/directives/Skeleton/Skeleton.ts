import '@/styles/components/skeleton-loader.scss'
import { DirectiveBinding, ObjectDirective, VNode } from '@vue/runtime-dom'

const skeletonClass = 'skeleton-loader'

// Using any bindings for these elements so typescript doesn't throw errors when we attempt to set disabled on non-input elements
export const applyClass = (el: any) => {
  el.classList.add(skeletonClass)
  if ('disabled' in el) el.disabled = true
  el.ariaBusy = true
  el.ariaHidden = true
}

export const removeClass = (el: any) => {
  el.classList.remove(skeletonClass)
  if ('disabled' in el) el.disabled = false
  el.ariaBusy = false
  el.ariaHidden = false
}

export const SkeletonDirective: ObjectDirective = {
  mounted(el: any, binding: DirectiveBinding, vNode: VNode) {
    if (binding.value) applyClass(el)
  },
  updated(el: any, binding: DirectiveBinding, vNode: VNode) {
    // If the component updates and we haven't already applied/removed the
    // skeleton effect, apply or remove it now
    if (binding.value && !binding.oldValue) applyClass(el)
    else if (!binding.value && binding.oldValue) removeClass(el)
  },
  unmounted(el: any, binding: DirectiveBinding, vNode: VNode) {
    removeClass(el)
  }
}

export default SkeletonDirective
