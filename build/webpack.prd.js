const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  plugins:[
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify('prd'),
    }),
  ]
});
