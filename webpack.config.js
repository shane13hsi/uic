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
    /*alias: {
      'react': 'inferno-compat',
      'react-dom': 'inferno-compat'
     },*/
    extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.tsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      /**
       * 在这里引入 manifest 文件
       */
      manifest: require('./dist/vendor-manifest.json')
    })
  ],
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
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};
