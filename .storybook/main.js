module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials', // This is still using webpack which is causing this build to fail
    '@storybook/addon-a11y'
  ],
  core: {
    builder: 'storybook-builder-vite'
  },
  async viteFinal(config, { configType }) {
    config.resolve.alias['@'] = '/src'
    return config
  }
}
