import TextArea from './TextArea.vue'

import { App } from 'vue'

TextArea.install = (app: App) => {
  app.component(TextArea.name, TextArea)
}

export default TextArea
