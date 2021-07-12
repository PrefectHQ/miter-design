import { DefineComponent, Plugin } from 'vue'

declare const MiterDesign: Exclude<Plugin['install'], undefined>
export default MiterDesign

export const MiterDesignSample: DefineComponent<{}, {}, any>
