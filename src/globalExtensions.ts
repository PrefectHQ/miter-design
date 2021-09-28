import { Breakpoints } from '@/plugins/Breakpoints/Breakpoints'
import { Toast } from '@/plugins/Toast/Toast'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $toast: Toast
    $breakpoints: Breakpoints
  }
}
