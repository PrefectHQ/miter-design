import type { Config } from '@jest/types'

process.env.VUE_CLI_BABEL_TARGET_NODE = true as unknown as string
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true as unknown as string

// Sync object
const config: Config.InitialOptions = {
  maxWorkers: 1,
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  rootDir: '.',
  transform: {
    '^.+\\.js$': ['babel-jest', { cwd: undefined }],
    '^.+\\.tsx?$': ['ts-jest', { config: { cwd: undefined } }], // process `*.ts` files with ts-jest
    '.*\\.(vue)$': ['vue-jest', { config: { cwd: undefined } }] // process `*.vue` files with vue-jest
  },
  testURL: 'http://localhost/',
  verbose: true
}

export default config
