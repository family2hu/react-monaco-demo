const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8888,
    // disableHostCheck:true,
    // https: true,
    contentBase: path.resolve(__dirname, '../dist'),
    proxy: {
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify('dev'),
    }),
  ],
});
