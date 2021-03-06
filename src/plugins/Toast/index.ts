import { App, createApp, reactive, Plugin } from 'vue'
import ToastContainer from '@/components/Toast/ToastContainer.vue'

type ToastType = 'default' | 'success' | 'error'

type Toast = ToastOptions & {
  id: number,
  dismiss: () => void
}

type ToastOptions = {
  message: string,
  type?: ToastType,
  timeout?: number
  dismissable?: boolean
}

type ToastPluginOptions = {
  mountPoint?: Element | string
}

function createDefaultMountElement():Element {
  const element = document.createElement('div')
  element.id = 'miter-toast-app'
  document.body.appendChild(element)

  return element
}

function tryQuerySelector(query:string): Element {
  const element = document.querySelector(query)
   
  if (!element) {
      throw new Error(
        "Toast plugin wasn't provided a valid mount point. Make sure the mount point exists in the DOM or pass nothing to create one automatically."
      )
  }

  return element
}

function getMountElement(mountPoint: Element | string | undefined): Element {
if(!mountPoint){
  return createDefaultMountElement()
}

  if(typeof mountPoint === 'string'){
    return tryQuerySelector(mountPoint)
  }

  return mountPoint
}

let toastId = 0
const queue: Toast[] = reactive([])

function getToastId(): number {
  return toastId++
}

function hideToast(id: number): void{
  const index = queue.findIndex(toast => toast.id === id)

  if (index > -1) {
    queue.splice(index, 1)
  }
}

function showToast(options: ToastOptions): Toast
function showToast(message: string): Toast
function showToast(message: string, type: ToastType): Toast
function showToast(optionsOrMessage: ToastOptions | string, type: ToastType = 'default'): Toast {
  const id = getToastId()

  const options = typeof optionsOrMessage === 'string'
    ? { message: optionsOrMessage, type }
    : optionsOrMessage

  const toast: Toast = { 
    id, 
    dismiss: () => hideToast(id), 
    ...options
  }

  queue.unshift(toast)

  return toast
}

const ToastPlugin: Plugin = {
  install: (app: App, options: ToastPluginOptions = {}) => {
    const element = getMountElement(options.mountPoint)
    
    createApp(ToastContainer).mount(element)

    app.config.globalProperties.$toast = showToast
  }
}

export type { Toast, ToastType, ToastOptions, ToastPluginOptions }
export { queue, showToast, hideToast }
export default ToastPlugin