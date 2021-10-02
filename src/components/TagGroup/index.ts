import TagGroup from './TagGroup.vue'

import { App } from 'vue'

TagGroup.install = (app: App) => {
  app.component(TagGroup.name, TagGroup)
}

export default TagGroup
