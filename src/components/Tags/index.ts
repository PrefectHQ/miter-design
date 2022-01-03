import Tags from './Tags.vue'

import { App } from 'vue'

Tags.install = (app: App) => {
    app.component('Tags', Tags)
    app.component(Tags.name, Tags)
}

export default Tags
