import { App } from 'vue'
import Avatar from './Avatar.vue'

Avatar.install = (app: App) => {
  app.component(Avatar.name, Avatar)
}

export default Avatar
