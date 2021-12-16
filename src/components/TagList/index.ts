import TagList from './TagList.vue'

import { App } from 'vue'

TagList.install = (app: App) => {
    app.component(TagList.name, TagList)
}

export default TagList
