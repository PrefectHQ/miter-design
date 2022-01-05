import { Breakpoints } from '@/plugins/Breakpoints'
import { showToast } from '@/plugins/Toast'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $toast: typeof showToast
    $breakpoints: Breakpoints
  }
}
