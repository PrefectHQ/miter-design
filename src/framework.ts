// Types
import type { App } from 'vue'
import type { Directive, Component, Plugin } from 'vue'

export interface MiterOptions {
  components?: Record<string, Component>
  directives?: Record<string, Directive>
  plugins?: Record<string, Plugin>
}

export const createMiter = (
  options: MiterOptions = {}
): Record<string, unknown> => {
  const install = (app: App): void => {
    const { components = {}, directives = {}, plugins = {} } = options

    for (const key in directives) {
      const directive = directives[key]

      app.directive(key, directive)
    }

    for (const key in components) {
      const component = components[key]

      app.component(key, component)
    }

    for (const key in plugins) {
      const plugin = plugins[key]

      app.use(plugin)
    }
  }

  return { install }
}

export default createMiter
