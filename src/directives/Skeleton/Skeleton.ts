// Is this the correct way to apply this style? I'm trying to avoid a global import since that seems inappropriate
import '@/styles/components/skeleton-loader.scss'
import { BindingMetadata } from '@vue/compiler-core'

const applySkeletonClass = (el: Element) => {
  el.classList.add('skeleton-loader')
  el.disabled = true
}

const removeSkeletonClass = (el: Element) => {
  el.classList.remove('skeleton-loader')
  el.disabled = false
}

export default {
  mounted(el: Element, binding: BindingMetadata) {
    if (binding.value) applySkeletonClass(el)
  },
  updated(el: Element, binding: BindingMetadata) {
    // If the component updates and we haven't already applied/removed the
    // skeleton effect, apply or remove it now
    if (binding.value && !binding.oldValue) applySkeletonClass(el)
    if (!binding.value && binding.oldValue) removeSkeletonClass(el)
  },
  unmounted(el: Element) {
    removeSkeletonClass(el)
  }
}
