const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },

  plugins: [
    // 复制html到dist目录下
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: "index.html"
    }),

    // vue-loader需要用的插件
    new VueLoaderPlugin(),

    // 热更新需要的插件
    // new Webpack.HotModuleReplacementPlugin(),
    // new Webpack.NamedModulesPlugin(),
  ]
}
