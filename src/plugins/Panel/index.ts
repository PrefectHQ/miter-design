import { App, Component, createVNode, InjectionKey, markRaw, Plugin, reactive, render } from 'vue'
import PanelContainer from '@/components/Panels/PanelContainer.vue'

// any because its a generic constructor
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InstanceOfComponent = Component & { new (...args: any): any }

type PanelQueueItem = {
  component: InstanceOfComponent,
  props: Record<string, unknown>,
}

export const panelQueue: PanelQueueItem[] = reactive([])

export function closePanel(): void {
  panelQueue.pop()
}

export function exitPanel(): void {
  panelQueue.splice(0)
}

export function showPanel<T extends InstanceOfComponent>(component: T, props: InstanceType<T>['$props']): void {
  panelQueue.push({
    component: markRaw(component),
    props,
  })
}

export const showPanelKey: InjectionKey<typeof showPanel> = Symbol()

function createMountElement(): Element {
  const element = document.createElement('div')
  element.id = 'miter-panels-app'
  document.body.appendChild(element)

  return element
}

export const PanelPlugin: Plugin = {
  install: (app: App) => {
    const element = createMountElement()
    const vNode = createVNode(PanelContainer)
    vNode.appContext = app._context

    render(vNode, element)
  },
}