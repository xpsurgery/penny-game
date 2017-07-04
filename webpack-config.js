var path = require('path')
var WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {

  entry: [
    'babel-polyfill',
    './src'
  ],

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {

    preLoaders: [
      { test: /\.js$/, loader: "eslint-loader", include: __dirname }
    ],

    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: [path.resolve(__dirname, "node_modules")] },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: "file" },
      {
        test: /\.(jpe?g|gif|png)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },

  plugins: [
    new WebpackNotifierPlugin({
      excludeWarnings: false,
      alwaysNotify: true
    })
  ],

  eslint: {
    failOnError: true
  }
}
