import type { Config } from '@jest/types'

// Temporary workaround re: https://github.com/vuejs/vue-cli/issues/1879
process.env.VUE_CLI_BABEL_TARGET_NODE = 'true'
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = 'true'

const config: Config.InitialOptions = {
  maxWorkers: null,
  rootDir: null,
  automock: false,
  timers: 'fake',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!src/main.js',
    '!src/router.js'
  ],
  coverageDirectory: 'tests/__coverage__',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|scss|less)$': '<rootDir>/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  roots: ['src', 'tests'],
  setupFiles: ['jest-localstorage-mock', 'jest-fetch-mock', 'jest-canvas-mock'],
  setupFilesAfterEnv: ['<rootDir>/tests/jestSetup.js'],
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/src/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/'
}

export default config
