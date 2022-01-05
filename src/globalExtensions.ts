import { Breakpoints } from '@/plugins/Breakpoints/Breakpoints'
import { showToast } from '@/plugins/Toast/Toast'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $toast: typeof showToast
    $breakpoints: Breakpoints
  }
}
