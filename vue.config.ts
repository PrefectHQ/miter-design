import HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Miter Design Library'
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
    },
    plugins: [new HtmlWebpackPlugin()]
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
