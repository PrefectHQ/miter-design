import { Component, createApp, Plugin, reactive } from 'vue'
import PanelContainer from '@/components/Panels/PanelContainer.vue'

// any because its a generic constructor
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InstanceOfComponent = Component & { new (...args: any): any }

type PanelQueueItem = {
  component: InstanceOfComponent,
  props: Record<string, unknown>,
}

export const queue: PanelQueueItem[] = reactive([])

export function showPanel<T extends InstanceOfComponent>(component: T, props: InstanceType<T>['$props']): void {
  queue.push({
    component,
    props,
  })
}

function createMountElement(): Element {
  const element = document.createElement('div')
  element.id = 'miter-panels-app'
  document.body.appendChild(element)

  return element
}

export const PanelPlugin: Plugin = {
  install: () => {
    const element = createMountElement()

    createApp(PanelContainer).mount(element)
  },
}