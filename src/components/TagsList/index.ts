import TagsList from './TagsList.vue'

import { App } from 'vue'

TagsList.install = (app: App) => {
    app.component(TagsList.name, TagsList)
}

export default TagsList
