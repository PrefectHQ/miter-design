import Tag from './Tag.vue'

import { App } from 'vue'

Tag.install = (app: App) => {
  app.component(Tag.name, Tag)
}

export default Tag
