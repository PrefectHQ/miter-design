module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Prefect Design Library'
      return args
    })
  },
  configureWebpack: {
    devtool: 'source-map',
    devServer: {
      clientLogLevel: 'info',
      watchOptions: {
        poll: true
      },
      contentBase: './src',
      hot: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @use "@/styles/main.scss";
        `
      }
    }
  }
}
