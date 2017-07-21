let path = require('path');
let webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    `webpack-dev-server/client?http://0.0.0.0:8080`,
    path.join(__dirname, './src/index.tsx')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    alias: {
      'react': 'inferno-compat',
      'react-dom': 'inferno-compat'
    },
    extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true }
          }
        ]
      }
    ]
  }
};
