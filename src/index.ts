/* Components */
import Avatar from './components/Avatar'
import Button from './components/Button'
import Card from './components/Card'
import Checkbox from './components/Checkbox'
import Code from './components/Code'
import Datepicker from './components/DatePicker'
import Input from './components/Input'
import Loader from './components/Loader'
import NumberInput from './components/NumberInput'
import Popover from './components/Popover'
import Popup from './components/Popup'
import Radio from './components/Radio'
import Select from './components/Select'
import Slider from './components/Slider'
import Tabs from './components/Tabs'
import Tag from './components/Tag'
import TagGroup from './components/TagGroup'
import Tags from './components/Tags'
import TextArea from './components/TextArea'
import Toast from './components/Toast'
import Toggle from './components/Toggle'
import Tooltip from './components/Tooltip'
import TimePicker from './components/TimePicker'
import DataTable from './components/DataTable'
import Panel from './components/Panels'

/* Directives */
import SkeletonDirective from './directives/Skeleton/Skeleton'
import TooltipDirective from './directives/Tooltip/Tooltip'

/* Plugins */
import ToastPlugin from './plugins/Toast'
import { PanelPlugin } from './plugins/Panel'

import './styles/main.scss'
import { App } from 'vue'

const components = {
  Avatar,
  Button,
  Card,
  Checkbox,
  Code,
  Datepicker,
  Input,
  Loader,
  NumberInput,
  Popover,
  Popup,
  Radio,
  Select,
  Slider,
  Tabs,
  Tag,
  TagGroup,
  Tags,
  TextArea,
  Toast,
  Toggle,
  Tooltip,
  TimePicker,
  DataTable,
  Panel
}

const directives = {
  skeleton: SkeletonDirective,
  tooltip: TooltipDirective
}

const plugins = {
  toast: ToastPlugin,
  panel: PanelPlugin
}

function install(app: App) {
  for (const component in components) {
    // @ts-expect-error
    if (components[component].install) {
      // @ts-expect-error
      components[component].install(app)
    } else {
      // @ts-expect-error
      app.component(components[component].name, components[component])
    }
  }

  for (const directive in directives) {
    // @ts-expect-error
    app.directive(directive, directives[directive])
  }

  for (const plugin in plugins) {
    // @ts-expect-error
    app.use(plugins[plugin])
  }
}

export default { install }

export { showToast } from './plugins/Toast'
export { showPanel, panelQueue, closePanel, exitPanel} from './plugins/Panel'

export { default as Avatar } from './components/Avatar'
export { default as Button } from './components/Button'
export { default as Card } from './components/Card'
export { default as Code } from './components/Code'
export { default as Checkbox } from './components/Checkbox'
export { default as DatePicker } from './components/DatePicker'
export { default as Input } from './components/Input'
export { default as Loader } from './components/Loader'
export { default as NumberInput } from './components/NumberInput'
export { default as Popover } from './components/Popover'
export { default as Popup } from './components/Popup'
export { default as Radio } from './components/Radio'
export { default as Select } from './components/Select'
export { default as Slider } from './components/Slider'
export { default as Tabs } from './components/Tabs'
export { default as Tag } from './components/Tag'
export { default as TagGroup } from './components/TagGroup'
export { default as Tags } from './components/Tags'
export { default as TextArea } from './components/TextArea'
export { default as Toast } from './components/Toast'
export { default as Toggle } from './components/Toggle'
export { default as Tooltip } from './components/Tooltip'
export { default as TimePicker } from './components/TimePicker'
export { default as DataTable } from './components/DataTable'
