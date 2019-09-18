const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const fs = require('fs')

function getEntry(dir) {
  const names = fs.readdirSync(dir)
  const result = {}
  names.forEach(f => {
    let name = f.replace(/\.test\.js$/, '')
    result[name] = './test/' + f
  })
  return result
}

module.exports = {
  mode: 'production',
  entry: getEntry('./test/'),

  output: {
    filename: '[name].test.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    }
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
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
    new VueLoaderPlugin(),
    new CleanWebpackPlugin()
  ]
}
