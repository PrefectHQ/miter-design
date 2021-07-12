// module.exports = {
//   presets: ['@vue/cli-plugin-babel/preset'],
//   plugins: [
//     '@babel/plugin-proposal-nullish-coalescing-operator',
//     '@babel/plugin-proposal-optional-chaining'
//   ]
// }

const devPresets = ['@vue/babel-preset-app']
const buildPresets = [['@babel/preset-env', {}], '@babel/preset-typescript']

module.exports = {
  presets: process.env.NODE_ENV === 'development' ? devPresets : buildPresets
}

module.exports = function (api) {
  api.cache(true)

  const presets =
    process.env.NODE_ENV === 'development' ? devPresets : buildPresets
  const plugins = [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ]

  return {
    presets,
    plugins
  }
}
