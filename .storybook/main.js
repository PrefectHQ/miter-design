module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-addon-designs'
  ],
  core: {
    builder: 'storybook-builder-vite'
  },
  async viteFinal(config, { configType }) {
    config.resolve.alias['@'] = '/src'
    return config
  }
}
